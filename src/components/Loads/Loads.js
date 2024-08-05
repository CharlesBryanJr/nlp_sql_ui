import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

import Load from './Load/Load';
import useStyles from './styles';

import { fetchLoads } from '../../api/index';

const Loads = ({ setCurrentId }) => {
  const [loads, setLoads] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetchLoads();
        const fetchedLoads = response.data;

        if (isMounted) {
          setLoads(fetchedLoads);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching loads:', error);
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(loads.data)) {
      console.log(loads.data.length);
      console.log(loads);
    }
  }, [loads]);

  if (isLoading) return <CircularProgress />;

  if (!Array.isArray(loads.data) || loads.data.length === 0) {
    return 'No loads';
  }

  return (
    <div>
      <h1>Loads</h1>
      <br/>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {loads.data.map((load) => (
          <Grid key={load._id} item xs={12} sm={12} md={6} lg={3}>
            <Load load={load} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Loads;