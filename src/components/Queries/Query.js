const React = require('react');
const { useState } = require('react');
const { 
  TextField, 
  Button, 
  Checkbox, 
  Paper, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Grid,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link
} = require('@material-ui/core');
const ExpandMoreIcon = require('@material-ui/icons/ExpandMore').default;
const { makeStyles } = require('@material-ui/core/styles');
const { useDispatch } = require('react-redux');
const { create_query } = require('../../actions/Queries');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#424242',
    color: '#fff',
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  input: {
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    flex: 1,
  },
  stateInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  manageAgent: {
    backgroundColor: '#616161',
    color: '#fff',
  },
  formControl: {
    minWidth: 120,
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiSelect-icon': {
      color: '#fff',
    },
  },
  urlLink: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));

const initialState = {
  query: "write a SQL query calculates the total number of COVID-19 tests conducted in each state and then list these states in descending order based on the volume of tests, starting with the state that has conducted the most tests.",
  database: "covid-19",
  review_define_objective: false,
  review_before_generate: false,
  review_after_generate: false,
  review_after_reflect: false,
  research_critique: false,
  detailed: false,
  lastNode: null,
  nextNode: null,
  thread: { configurable: { thread_id: "1" } },
  draftRev: 0,
  count: "",
  writer_result: null,
  presigned_url: null,
  history: []
};

const Query = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    try {
      const result = await dispatch(create_query({ ...state, action }));
      setState(prev => ({
        ...prev,
        query: result.query || prev.query,
        database: result.database || prev.database,
        review_define_objective: result.review_define_objective ?? prev.review_define_objective,
        review_before_generate: result.review_before_generate ?? prev.review_before_generate,
        review_after_generate: result.review_after_generate ?? prev.review_after_generate,
        review_after_reflect: result.review_after_reflect ?? prev.review_after_reflect,
        research_critique: result.research_critique ?? prev.research_critique,
        Detailed: result.detailed ?? prev.detailed,
        lastNode: result.lastNode ?? prev.lastNode,
        nextNode: result.nextNode ?? prev.nextNode,
        thread: {
          ...prev.thread,
          ...(result.thread || {}),
        },
        draftRev: result.draftRev ?? prev.draftRev,
        count: result.count !== '' ? Number(result.count) : prev.count,
        writer_result: result.writer_result ?? prev.writer_result,
        presigned_url: result.presigned_url ?? prev.presigned_url,
        history: [...prev.history, { query: prev.query, response: result }],
      }));
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  };

  const renderStateInfo = () => {
    const infoItems = ['lastNode', 'nextNode', 'draftRev', 'count'];
    return infoItems.map(item => (
      <div key={item}>
        <Typography variant="caption">{item}</Typography>
        <Typography variant="body2">{state[item]}</Typography>
      </div>
    ));
  };

  // eslint-disable-next-line no-unused-vars
  const [is_interrupt_complete, set_is_interrupt_complete] = useState(false); // State variable to control visibility

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" className={classes.title}>Database</Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="database"
        value={state.database}
        // onChange={handleChange}
        className={classes.input}
      />

      <Typography variant="h6" className={classes.title}>Natural Language SQL Query</Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="query"
        value={state.query}
        onChange={handleChange}
        className={classes.input}
      />

      <div className={classes.buttonGroup}>
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={(e) => handleSubmit(e, 'generate')}
        >
          GENERATE Query
        </Button>
        <Button 
          variant="contained" 
          className={classes.button}
          onClick={(e) => handleSubmit(e, 'continue')}
        >
          CONTINUE Query
        </Button>
      </div>

      <div className={classes.stateInfo}>
        {renderStateInfo()}
        <div>
          <Typography variant="caption">Thread</Typography>
          <Typography variant="body2">
            {state.thread?.configurable?.thread_id || 'No Thread'}
          </Typography>
        </div>
      </div>

      <Accordion className={classes.manageAgent}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">MANAGE AGENT</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {is_interrupt_complete && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Interrupt After State</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup row>
                    {['review_define_objective', 'review_before_generate', 'review_after_generate', 'review_after_reflect', 'research_critique'].map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            checked={state[item]}
                            onChange={handleChange}
                            name={item}
                            color="primary"
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel>Writer Result</InputLabel>
                <Select
                  value={state.writer_result || ""}
                  onChange={handleChange}
                  name="writer_result"
                  label="Writer Result"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {state.writer_result && <MenuItem value={state.writer_result}>{state.writer_result}</MenuItem>}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel>Writer Explanation</InputLabel>
                <Select
                  value={state.reflect || ""}
                  onChange={handleChange}
                  name="writer_explanation"
                  label="Writer Explanation"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {state.reflect && <MenuItem value={state.reflect}>{state.reflect}</MenuItem>}
                </Select>
              </FormControl>
            </Grid>
            {state.presigned_url && (
              <Grid item xs={12}>
                <Link
                  className={classes.urlLink}
                  href={state.presigned_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here to download a CSV of the results
                </Link>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

module.exports = Query;