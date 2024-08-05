import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getCarrier, deleteCarrier } from '../../../actions/Carriers';
import useStyles from './styles';

const Carrier = ({ carrier, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleCarrierDetails = () => {
    dispatch(getCarrier(carrier._id, history));
    history.push(`/carriers/${carrier._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setCurrentId(carrier._id);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={handleCarrierDetails}
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
              Name: {carrier.CompanyName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h2">
              MC: {carrier.MCNumber}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h2">
              Remit: {carrier.RemitName}
            </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteCarrier(carrier._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Carrier;