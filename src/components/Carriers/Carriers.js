import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

import Carrier from './Carrier/Carrier';
import useStyles from './styles';

import { fetchCarriers } from '../../api/index';

const Carriers = ({ setCurrentId }) => {
  const [carriers, setCarriers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetchCarriers();
        const fetchedCarriers = response.data;

        if (isMounted) {
          setCarriers(fetchedCarriers);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching carriers:', error);
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(carriers.data)) {
      console.log(carriers.data.length);
      console.log(carriers);
    }
  }, [carriers]);

  if (isLoading) return <CircularProgress />;

  if (!Array.isArray(carriers.data) || carriers.data.length === 0) {
    return 'No carriers';
  }

  return (
    <div>
      <h1>Carriers</h1>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {carriers.data.map((carrier) => (
          <Grid key={carrier._id} item xs={12} sm={12} md={6} lg={3}>
            <Carrier carrier={carrier} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};  

export default Carriers;