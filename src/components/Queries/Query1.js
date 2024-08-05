import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, MenuItem, List, Paper, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import useStyles from './styles';
import { create_query } from '../../actions/Queries';

const Query = ({ setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const empty_query_data = {
    "Detailed": false,
    "database": "covid-19",
    "Query": "write a SQL query calculates the total number of COVID-19 tests conducted in each state and then list these states in descending order based on the volume of tests, starting with the state that has conducted the most tests."
  };  
  
  const [queryData, setQueryData] = useState(empty_query_data);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(create_query(queryData));

      setHistory((prevHistory) => [
        ...prevHistory,
        { query: queryData.Query, response: result }
      ]);

      setQueryData((prevQueryData) => {
        return { ...empty_query_data };
      });
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nestedProperties = name.split('.');
    if (nestedProperties.length > 1) {
      setQueryData((prevQueryData) => {
        const updatedData = { ...prevQueryData };
        let currentLevel = updatedData;
        for (let i = 0; i < nestedProperties.length - 1; i++) {
          const nestedProperty = nestedProperties[i];
          if (!currentLevel[nestedProperty]) {
            currentLevel[nestedProperty] = {};
          }
          currentLevel = currentLevel[nestedProperties[i]];
        }
        currentLevel[nestedProperties[nestedProperties.length - 1]] = value;
        return { ...updatedData };
      });
    } else {
      setQueryData((prevQueryData) => {
        return { ...prevQueryData, [name]: value };
      });
    }
  };

  const formatResponse = (response) => {
    if (typeof response === 'object' && response !== null) {
      return (
        <div>
          {Object.entries(response).map(([key, value]) => (
            <Paper key={key} className={classes.paper} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#000' }}>
              <Typography variant="body2" component="div">
                <strong>{key}:</strong>
              </Typography>
              {key === 'presigned_url' ? (
                <Link href={value} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '5px', color: '#3f51b5' }}>
                  {value}
                </Link>
              ) : (
                <pre style={{ margin: '10px 0', whiteSpace: 'pre-wrap', wordWrap: 'break-word', backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px', color: '#000' }}>
                  {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                </pre>
              )}
            </Paper>
          ))}
        </div>
      );
    }
    return <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: '#000' }}>{JSON.stringify(response, null, 2)}</pre>;
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
        <div style={{ margin: '25px 0' }} />
        <TextField
          name="Detailed"
          label="Detailed"
          value={queryData.Detailed || false}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          select
          className={classes.textField}
        >
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </TextField>
        <div style={{ margin: '25px 0' }} />
        <TextField
          name="database"
          label="Database"
          value={queryData.database || ''}
          onChange={handleChange}
          variant="outlined"
          multiline
          fullWidth
          className={classes.textField}
        />
        <div style={{ margin: '25px 0' }} />
        <TextField
          name="Query"
          label="Query"
          value={queryData.Query || ''}
          onChange={handleChange}
          variant="outlined"
          multiline
          fullWidth
          className={classes.textField}
        />
        <div style={{ margin: '25px 0' }} />
        <Button 
          name="submitBtn" 
          type="submit" 
          className={classes.button} 
          variant="contained" 
          color="primary">
          Submit Query
        </Button>
      </form>
      <List>
        {history.map((item, index) => (
          <Paper key={index} className={classes.paper} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>Query #{index + 1}</Typography>
            <Typography variant="body1" paragraph>
              <strong>Query:</strong> <span className={classes.secondaryText}>{item.query}</span>
            </Typography>
            <Typography variant="h6" gutterBottom>Response:</Typography>
            {formatResponse(item.response)}
          </Paper>
        ))}
    </List>
    </div>
  );  
};

export default Query;