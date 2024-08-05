import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getLoad, deleteLoad } from '../../../actions/Loads';
import useStyles from './styles';

const Load = ({ load, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleLoadDetails = () => {
    dispatch(getLoad(load._id, history));
    history.push(`/loads/${load._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setCurrentId(load._id);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={handleLoadDetails}
      >
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={handleEdit}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="small" />
          </Button>
        </div>
        <CardContent className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            ExternalLoadKey: {load.ExternalLoadKey}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            ExternalPayeeKey: {load.ExternalPayeeKey}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            LineItemsAmount: {load.LineItems[0].Amount}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            DueDate: {load.DueDate}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteLoad(load._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Load;