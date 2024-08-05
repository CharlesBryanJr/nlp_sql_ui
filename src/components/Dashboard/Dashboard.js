const React = require('react');
const { Link } = require('react-router-dom');
const { Typography } = require('@material-ui/core');
const useStyles = require('./styles.js');

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

module.exports = Dashboard;