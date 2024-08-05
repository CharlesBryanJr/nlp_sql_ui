import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

import Invoice from './Invoice/Invoice';
import useStyles from './styles';

import { fetchInvoices } from '../../api/index';

const Invoices = ({ setCurrentId }) => {
  const [invoices, setInvoices] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetchInvoices();
        const fetchedInvoices = response.data;

        if (isMounted) {
          setInvoices(fetchedInvoices);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(invoices.data)) {
      console.log(invoices.data.length);
      console.log(invoices);
    }
  }, [invoices]);

  if (isLoading) return <CircularProgress />;

  if (!Array.isArray(invoices.data) || invoices.data.length === 0) {
    return 'No invoices';
  }

  return (
    <div>
        <h1>Invoices</h1>
        <br/>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {invoices.data.map((invoice) => (
          <Grid key={invoice._id} item xs={12} sm={12} md={6} lg={3}>
            <Invoice invoice={invoice} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Invoices;