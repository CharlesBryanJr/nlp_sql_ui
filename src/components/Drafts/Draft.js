import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography } from '@material-ui/core'; // Add these imports
import useStyles from './styles';
import { getDraft } from '../../actions/Drafts';
import { START_LOADING, END_LOADING, FETCH_DRAFT } from '../../constants/actionTypes';
import * as api from '../../api/index';

const Draft = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const empty_draftData = {
    "InvoiceDraftGuid": "",
    "InvoiceDraftId": "",
    "DraftDateTime": "",
    "Amount": "",
    "InvoiceCount": "",
    "Invoices": [
      {
        "PayorTermFee": "",
        "PayeeTermFeesToPayor": "",
        "PayeeTermFeesToTriumph": "",
        "ScheduledDraftDate": "",
        "ActualDraftDate": "",
        "IsEditable": "",
        "IsAmountsEditable": "",
        "InvoiceDraftId": "",
        "InvoiceDraftGuid": "",
        "CurrencyType": "",
        "InvoiceKey": "",
        "InvoiceStatusId": "",
        "InvoiceStatusName": "",
        "PayorCode": "",
        "ExternalPayeeKey": "",
        "PayorCompanyName": "",
        "PayeeCompanyName": "",
        "FactorCompanyName": "",
        "ReferenceNo": "",
        "InvoiceNo": "",
        "IsQuickpay": "",
        "PayoutTermCode": "",
        "GrossAmount": "",
        "AdjustmentAmount": "",
        "TermFeeAmount": "",
        "NetAmount": "",
        "UploadedDate": "",
        "ApprovedDate": "",
        "ScheduledPaymentDate": "",
        "ActualPaidDate": "",
        "PayoutDestination": "",
        "PayoutConfirmationCode": "",
        "PayoutGuid": "",
        "LastModifiedDate": "",
        "IsTermSelectedByPayee": "",
        "ExternalBankAccountKey": "",
        "PayoutTransactionCode": ""
      }
    ],
    "CreditNoteCount": "",
    "CreditNotes": "",
    "CurrencyType": ""
  };

  const [draftData, setDraftData] = useState(empty_draftData);
  const [draftDateFrom, setDraftDateFrom] = useState('2022-08-25');
  const [draftDateTo, setDraftDateTo] = useState('2022-08-27');
  const [invoiceKeys, setInvoiceKeys] = useState([]);
  const [InvoiceKeysArray_length, setInvoiceKeysArray_length] = useState([]);
  const [NetAmounts, setNetAmounts] = useState([]);
  const [DraftAmount, setDraftAmount] = useState([]);
  const [showData, setShowData] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (draftDateFrom && draftDateTo) {
      try {
        dispatch({ type: START_LOADING });
    
        const response = await api.fetchDraft(draftDateFrom, draftDateTo);
  
        const InvoiceDraftCount = response.data.tp_response.data.InvoiceDraftCount;
        const draftsArray = response.data.tp_response.data.InvoiceDrafts;
  
        dispatch({ type: FETCH_DRAFT, payload: draftsArray });
        dispatch({ type: END_LOADING });
  
        const invoiceKeysArray = [];
        let invoiceKeysArray_length = null;
        const netAmountsArray = [];
        let draftAmount = null;
        draftsArray.forEach((draft) => {
          draftAmount = draft.Amount;
          const invoicesArray = draft.Invoices;
          invoiceKeysArray_length = invoicesArray.length
          invoicesArray.forEach((invoice) => {
            invoiceKeysArray.push(invoice.InvoiceKey);
            netAmountsArray.push(invoice.NetAmount);
          });
        });
  
        setDraftAmount(draftAmount);
        setInvoiceKeys(invoiceKeysArray);
        setInvoiceKeysArray_length(invoiceKeysArray_length);
        setNetAmounts(netAmountsArray);
        setShowData(true);
  
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  };  

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
      <Container>
        <h1>Draft Data</h1>
        <br/>
        <Typography variant="h6">Dates must be in the form of YYYY-MM-DD</Typography>
        <TextField
          type="text"
          name="draftDateFrom"
          label="Draft Date From"
          value={draftDateFrom}
          onChange={(e) => setDraftDateFrom(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{
            pattern: "\\d{4}-\\d{2}-\\d{2}",
          }}
          required
        />
        <TextField
          type="text"
          name="draftDateTo"
          label="Draft Date To"
          value={draftDateTo}
          onChange={(e) => setDraftDateTo(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{
            pattern: "\\d{4}-\\d{2}-\\d{2}",
          }}
          required
        />
        {showData && (
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={6}>
              <TextField
                name="DraftAmount"
                label="Draft Amount"
                value={DraftAmount}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        )}
        {showData && (
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={6}>
              <TextField
                name="invoiceKeysArray_length"
                label="Number of Invoices"
                value={InvoiceKeysArray_length}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        )}
        {showData && invoiceKeys.map((invoiceKey, index) => (
          <Grid container spacing={2} key={invoiceKey}>
            <Grid item xs={6}>
              <TextField
                name={`InvoiceKey_${invoiceKey}`}
                label={`Invoice ${index + 1}`}
                value={invoiceKey || ''}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  name={`InvoiceKey_${invoiceKey} Amount`}
                  label={`Invoice ${index + 1} Amount`}
                  value={NetAmounts[index] || ''}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
            </Grid>
          </Grid>
        ))}
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit" className={classes.button}>
          Get Draft
        </Button>
      </Container>
    </form>
  );
};

export default Draft;