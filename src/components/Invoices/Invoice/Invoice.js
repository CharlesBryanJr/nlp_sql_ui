import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { getInvoice, deleteInvoice } from '../../../actions/Invoices';
import useStyles from './styles';

const Invoice = ({ invoice, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleInvoiceDetails = () => {
    dispatch(getInvoice(invoice._id, history));
    history.push(`/invoices/${invoice._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setCurrentId(invoice._id);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={handleInvoiceDetails}
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
            ExternalPayeeKey: {invoice.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            ExternalInvoiceKey: {invoice.ExternalInvoiceKey}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            NetAmount: {invoice.NetAmount}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            DueDate: {invoice.DueDate}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteInvoice(invoice._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Invoice;