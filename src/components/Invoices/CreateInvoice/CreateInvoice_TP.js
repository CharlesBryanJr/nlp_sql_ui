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
    "ExternalInvoiceKey": "",
    "ExternalPayeeKey": "",
    "ExternalLoadKey": "",
    "InvoiceImportedStatusId": 0,
    "InvoiceNo": "",
    "ReferenceNo": "",
    "GrossAmount": 0,
    "PayorAdjustmentAmount": 0,
    "NetAmount": 0,
    "DueDate": "",
    "ApprovedDate": "",
    "StatusNote": "",
    "LineItems": [
      {
        "Amount": null,
        "Description": ""
      },
      {
        "Amount": null,
        "Description": ""
      }
    ],
    "AdditionalData": [
      {
        "Field": "",
        "Value": "",
        "Type": null
      },
      {
        "Field": "",
        "Value": "",
        "Type": null
      }
    ]
  };  
  

  const [invoiceData, setInvoiceData] = useState(empty_invoiceData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(invoiceData);
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
  
        if (nestedProperties[0] === "LineItems") {
          const itemIndex = parseInt(nestedProperties[1]);
          if (!currentLevel[nestedProperties[0]]) {
            currentLevel[nestedProperties[0]] = [];
          }
          currentLevel[nestedProperties[0]][itemIndex] = {
            ...currentLevel[nestedProperties[0]][itemIndex],
            [nestedProperties[2]]: value,
          };
        } else {
          currentLevel[nestedProperties[nestedProperties.length - 1]] = value;
        }
  
        return { ...updatedData };
      });
    } else {
      setInvoiceData((prevInvoiceData) => {
        return { ...prevInvoiceData, [name]: value };
      });
    }
  };  

  const generateRandomString = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = Math.floor(Math.random() * 10) + 1;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const generateRandomBoolean = () => {
    return Math.random() < 0.5;
  };

  const generateRandomNumber = (base = 0, min = 1, max = 100) => {
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    return base + randomValue;
  };  

  const generateRandomLineItems = (length) => {
    const lineItems = [];
    for (let i = 0; i < length; i++) {
      lineItems.push({
        Amount: generateRandomNumber(0, 1000),
        Description: generateRandomString(),
      });
    }
    return lineItems;
  };  

  const generateRandomAdditionalData = (length) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push({
        Field: generateRandomString(),
        Value: generateRandomString(),
        Type: 1,
      });
    }
    return arr;
  };

  const generateCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  const generateFutureDate = (startDate_str, daysToAdd) => {
    const startDate = new Date(startDate_str);
    const futureDate = new Date(startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    const year = futureDate.getFullYear();
    const month = futureDate.getMonth() + 1;
    const day = futureDate.getDate();
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };  
  
  const generateRandomObject = () => {
    const obj = {
      "ExternalPayeeKey": generateRandomString()
    }
    return obj;
  };

  const generateRandomData = (empty_InvoiceData) => {
    const randomInvoiceData = {};
    for (const key in empty_InvoiceData) {
      if (empty_InvoiceData.hasOwnProperty(key)) {
        if (key === 'InvoiceImportedStatusId') {
          randomInvoiceData[key] = generateRandomNumber(0, 1, 3);
        } else if (key === 'GrossAmount') {
          randomInvoiceData[key] = generateRandomNumber(1000, 4000);
        } else if (key === 'PayorAdjustmentAmount') {
          randomInvoiceData[key] = generateRandomNumber(1, 500);
        } else if (key === 'NetAmount') {
          randomInvoiceData[key] = randomInvoiceData['GrossAmount'] + randomInvoiceData['PayorAdjustmentAmount']
        } else if (key === 'ApprovedDate') {
          randomInvoiceData[key] = generateCurrentDate();
        } else if (key === 'DueDate') {
          const startDate = generateCurrentDate();
          const daysToAdd = 30;
          randomInvoiceData[key] = generateFutureDate(startDate, daysToAdd);
        } else if (typeof empty_InvoiceData[key] === 'string') {
          randomInvoiceData[key] = generateRandomString();
        } else if (typeof empty_InvoiceData[key] === 'boolean') {
          randomInvoiceData[key] = generateRandomBoolean();
        } else if (typeof empty_InvoiceData[key] === 'number') {
          randomInvoiceData[key] = generateRandomNumber();
        } else if (Array.isArray(empty_InvoiceData[key])) {
          if (key === "LineItems") {
            const length = generateRandomNumber(1, 3);
            randomInvoiceData[key] = generateRandomLineItems(length);
          } else if (key === "AdditionalData") {
            const length = generateRandomNumber(1, 3);
            randomInvoiceData[key] = generateRandomAdditionalData(length);
          }
        } else if (typeof empty_InvoiceData[key] === 'object') {
          randomInvoiceData[key] = generateRandomObject();
        }
      }
    }
    return randomInvoiceData;
  };

  const handleGenerateRandomData = (e) => {
    e.preventDefault();
    const randomInvoiceData = generateRandomData(empty_invoiceData);
    setInvoiceData(randomInvoiceData);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
      <Button 
        variant="contained" 
        color="primary" 
        type="submit" 
        className={classes.button} 
        onClick={handleGenerateRandomData}
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
          name="StatusNote"
          label="StatusNote"
          value={invoiceData.StatusNote || ''}
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
      <Button name="submitBtn" type="submit" className={classes.button} variant="contained" color="primary">
        Create Invoice
      </Button>
    </form>
  );
};

export default CreateInvoice;