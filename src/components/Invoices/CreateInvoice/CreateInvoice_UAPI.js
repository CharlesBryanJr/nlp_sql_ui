import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import { createInvoice } from '../../../actions/Invoices';

const CreateInvoice = ({ setCurrentId }) => {
  // const { invoices, isLoading } = useSelector((state) => state.invoices);
  const classes = useStyles();
  const dispatch = useDispatch();

  const empty_invoiceData = {
    "ExternalInvoiceKey": "a1Z4v000005wL3rEAE",
    "ExternalPayeeKey": "0016g00000NNZLqAAP",
    "ExternalLoadKey": "",
    "InvoiceImportedStatusId": 2,
    "InvoiceNo": "0670441",
    "ReferenceNo": "240141",
    "GrossAmount": 2500,
    "PayorAdjustmentAmount": 0,
    "NetAmount": 2500,
    "DueDate": "2021-04-29",
    "ApprovedDate": "2021-04-01",
    "Term": "SP30",
    "StatusNote": "",
    "Division": "USD",
    "LineItems": [
      {
        "Amount": 1200,
        "Description": "Linehaul"
      },
      {
        "Amount": -150,
        "Description": "Late Delivery"
      }
    ],
    "AdditionalData": [
      {
        "Field": "Load#",
        "Value": "123456",
        "Type": 1
      },
      {
        "Field": "POD#",
        "Value": "888888801",
        "Type": 1
      }
    ]
  };  
  

  const [invoiceData, setInvoiceData] = useState(empty_invoiceData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createInvoice(invoiceData));
    setInvoiceData((prevInvoiceData) => {
      return { ...empty_invoiceData };
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nestedProperties = name.split('.');
    if (nestedProperties.length > 1) {
      setInvoiceData((prevInvoiceData) => {
        const updatedData = { ...prevInvoiceData };
        let currentLevel = updatedData;
        for (let i = 0; i < nestedProperties.length - 1; i++) {
          const nestedProperty = nestedProperties[i];
          if (!currentLevel[nestedProperty]) {
            currentLevel[nestedProperty] = {};
          }
          currentLevel = currentLevel[nestedProperty];
        }
        currentLevel[nestedProperties[nestedProperties.length - 1]] = value;
        return { ...updatedData };
      });
    } else {
      setInvoiceData((prevInvoiceData) => {
        return { ...prevInvoiceData, [name]: value };
      });
    }
  };
  const generateRandomData = (empty_invoiceData) => {
    const randomInvoiceData = {};
  
    for (const key in empty_invoiceData) {
      if (empty_invoiceData.hasOwnProperty(key)) {
        if (typeof empty_invoiceData[key] === 'string') {
          randomInvoiceData[key] = generateRandomString();
        } else if (typeof empty_invoiceData[key] === 'boolean') {
          randomInvoiceData[key] = generateRandomBoolean();
        } else if (typeof empty_invoiceData[key] === 'number') {
          randomInvoiceData[key] = generateRandomNumber();
        } else if (Array.isArray(empty_invoiceData[key])) {
          randomInvoiceData[key] = generateRandomArray();
        } else if (typeof empty_invoiceData[key] === 'object') {
          randomInvoiceData[key] = generateRandomObject();
        }
      }
    }
    setInvoiceData(randomInvoiceData);
  };

  const generateRandomString = () => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = Math.floor(Math.random() * 10) + 1;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const generateRandomBoolean = () => {
    return Math.random() < 0.5;
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const generateRandomArray = () => {
    const length = Math.floor(Math.random() * 5) + 1;
    const array = [];
    for (let i = 0; i < length; i++) {
      array.push(generateRandomString());
    }
    return array;
  };

  const generateRandomObject = () => {
    const obj = {};
    obj.name = generateRandomString();
    obj.line_1 = generateRandomString();
    obj.line_2 = generateRandomString();
    obj.city = generateRandomString();
    obj.state = generateRandomString();
    obj.postal_code = generateRandomString();
    return obj;
  };
  
  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
      <Button 
        variant="contained" 
        color="primary" 
        type="submit" 
        className={classes.button} 
        onClick={generateRandomData}
      >
        Generate Random Invoice Data
      </Button>
      <br/>
      <TextField
        name="ExternalInvoiceKey"
        label="ExternalInvoiceKey"
        value={invoiceData.ExternalInvoiceKey || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="ExternalPayeeKey"
        label="ExternalPayeeKey"
        value={invoiceData.ExternalPayeeKey || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="ExternalLoadKey"
        label="ExternalLoadKey"
        value={invoiceData.ExternalLoadKey || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="InvoiceImportedStatusId"
        label="InvoiceImportedStatusId"
        value={invoiceData.InvoiceImportedStatusId || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="InvoiceNo"
        label="InvoiceNo"
        value={invoiceData.InvoiceNo || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="ReferenceNo"
        label="ReferenceNo"
        value={invoiceData.ReferenceNo || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="GrossAmount"
        label="GrossAmount"
        value={invoiceData.GrossAmount || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="PayorAdjustmentAmount"
        label="PayorAdjustmentAmount"
        value={invoiceData.PayorAdjustmentAmount || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="NetAmount"
        label="NetAmount"
        value={invoiceData.NetAmount || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="DueDate"
        label="DueDate"
        value={invoiceData.DueDate || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="ApprovedDate"
        label="ApprovedDate"
        value={invoiceData.ApprovedDate || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="Term"
        label="Term"
        value={invoiceData.Term || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="StatusNote"
        label="StatusNote"
        value={invoiceData.StatusNote || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="Division"
        label="Division"
        value={invoiceData.Division || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="LineItems[0].Amount"
        label="LineItems[0].Amount"
        value={invoiceData.LineItems[0].Amount || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="LineItems[0].Description"
        label="LineItems[0].Description"
        value={invoiceData.LineItems[0].Description || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="LineItems[1].Amount"
        label="LineItems[1].Amount"
        value={invoiceData.LineItems[1].Amount || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="LineItems[1].Description"
        label="LineItems[1].Description"
        value={invoiceData.LineItems[1].Description || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="AdditionalData[0].Field"
        label="AdditionalData[0].Field"
        value={invoiceData.AdditionalData[0].Field || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="AdditionalData[0].Value"
        label="AdditionalData[0].Value"
        value={invoiceData.AdditionalData[0].Value || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="AdditionalData[0].Type"
        label="AdditionalData[0].Type"
        value={invoiceData.AdditionalData[0].Type || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />

        <TextField
        name="AdditionalData[1].Field"
        label="AdditionalData[1].Field"
        value={invoiceData.AdditionalData[1].Field || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        name="AdditionalData[1].Value"
        label="AdditionalData[1].Value"
        value={invoiceData.AdditionalData[1].Value || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        name="AdditionalData[1].Type"
        label="AdditionalData[1].Type"
        value={invoiceData.AdditionalData[1].Type || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
      <Button variant="contained" color="primary" type="submit" className={classes.button}>
        Create Invoice
      </Button>
    </form>
  );
};

export default CreateInvoice;