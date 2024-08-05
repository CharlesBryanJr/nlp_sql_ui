import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import useStyles from './styles.js';

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.dashboardContainer}>
      <Typography variant="h4" className={classes.heading}>
        Dashboard
      </Typography>
      <div className={classes.itemContainer}>
        <div className={classes.item}>
          <Typography variant="h6">Query</Typography>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Link to="/Query" className={classes.link}>
                Athena Query
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;