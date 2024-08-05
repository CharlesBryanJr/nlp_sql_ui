import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import { createCarrier } from '../../../actions/Carriers';

const CreateCarrier = ({ setCurrentId }) => {
  // const { carriers, isLoading } = useSelector((state) => state.carriers);
  const classes = useStyles();
  const dispatch = useDispatch();

  const empty_carrierData = {
    "ExternalPayeeKey": "",
    "CompanyName": "",
    "MCNumber": "",
    "DOTNumber": "",
    "Scac": "",
    "Addr1": "",
    "Addr2": "",
    "City": "",
    "State": "",
    "PostalCode": "",
    "Country": "",
    "PrimaryContact": "",
    "PhoneNumber": "",
    "PrimaryEmail": "",
    "RemitName": "",
    "RemitAddr1": "",
    "RemitAddr2": "",
    "RemitCity": "",
    "RemitState": "",
    "RemitPostalCode": "",
    "RemitCountry": "",
    "DefaultPayoutTermCode": "",
    "DisablePayee": false,
    "FaxNumber": "",
    "IsQuickPayAllowed": false,
    "AdditionalData": [
      {
        "Field": "",
        "Value": "",
        "Type": 0
      }
    ],
    "StatusNote": ""
  };  
  
  const [carrierData, setCarrierData] = useState(empty_carrierData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(carrierData);
    dispatch(createCarrier(carrierData));
    setCarrierData((prevCarrierData) => {
      return { ...empty_carrierData };
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nestedProperties = name.split('.');
    if (nestedProperties.length > 1) {
      setCarrierData((prevCarrierData) => {
        const updatedData = { ...prevCarrierData };
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
      setCarrierData((prevCarrierData) => {
        return { ...prevCarrierData, [name]: value };
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

  const generateRandomNumber = (min = 1, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomArrayData = (length) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push({
        "Field": generateRandomString(),
        "Value": generateRandomString(),
        "Type": generateRandomNumber(0, 2)
      });
    }
    return arr;
  };

  const generateRandomObject = () => {
    const obj = {
      "ExternalPayeeKey": generateRandomString()
    }
    return obj;
  };

  const generateRandomData = (empty_carrierData) => {
    const randomCarrierData = {};
  
    for (const key in empty_carrierData) {
      if (empty_carrierData.hasOwnProperty(key)) {
        if (key === "DefaultPayoutTermCode") {
          randomCarrierData[key] = "SP";
        }
        else if (typeof empty_carrierData[key] === 'string') {
          randomCarrierData[key] = generateRandomString();
        } else if (typeof empty_carrierData[key] === 'boolean') {
          randomCarrierData[key] = generateRandomBoolean();
        } else if (typeof empty_carrierData[key] === 'number') {
          randomCarrierData[key] = generateRandomNumber();
        } else if (Array.isArray(empty_carrierData[key])) {
          if (key === "AdditionalData") {
            const length = generateRandomNumber(1, 3);
            randomCarrierData[key] = generateRandomArrayData(length);
          } else {
            randomCarrierData[key] = generateRandomString();
          }
        } else if (typeof empty_carrierData[key] === 'object') {
          randomCarrierData[key] = generateRandomObject();
        }
      }
    }
    return randomCarrierData;
  };

  const handleGenerateRandomData = (e) => {
    e.preventDefault();
    const randomCarrierData = generateRandomData(empty_carrierData);
    setCarrierData(randomCarrierData);
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
        Generate Random Carrier Data
      </Button>
      <br/>
      <TextField
        name="ExternalPayeeKey"
        label="ExternalPayeeKey"
        value={carrierData.ExternalPayeeKey || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="CompanyName"
        label="CompanyName"
        value={carrierData.CompanyName || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="MCNumber"
        label="MCNumber"
        value={carrierData.MCNumber || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DOTNumber"
        label="DOTNumber"
        value={carrierData.DOTNumber || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="Scac"
        label="Scac"
        value={carrierData.Scac || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="Addr1"
        label="Addr1"
        value={carrierData.Addr1 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="Addr2"
        label="Addr2"
        value={carrierData.Addr2 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="City"
        label="City"
        value={carrierData.City || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="State"
        label="State"
        value={carrierData.State || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="PostalCode"
        label="PostalCode"
        value={carrierData.PostalCode || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="Country"
        label="Country"
        value={carrierData.Country || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="PrimaryContact"
        label="PrimaryContact"
        value={carrierData.PrimaryContact || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="PhoneNumber"
        label="PhoneNumber"
        value={carrierData.PhoneNumber || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="PrimaryEmail"
        label="PrimaryEmail"
        value={carrierData.PrimaryEmail || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="RemitName"
        label="RemitName"
        value={carrierData.RemitName || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="RemitAddr1"
        label="RemitAddr1"
        value={carrierData.RemitAddr1 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="RemitAddr2"
        label="RemitAddr2"
        value={carrierData.RemitAddr2 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="RemitCity"
        label="RemitCity"
        value={carrierData.RemitCity || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="RemitState"
        label="RemitState"
        value={carrierData.RemitState || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="RemitPostalCode"
        label="RemitPostalCode"
        value={carrierData.RemitPostalCode || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="RemitCountry"
        label="RemitCountry"
        value={carrierData.RemitCountry || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DefaultPayoutTermCode"
        label="DefaultPayoutTermCode"
        value={carrierData.DefaultPayoutTermCode || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DisablePayee"
        label="DisablePayee"
        value={carrierData.DisablePayee || false}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        select
        className={classes.textField}
      >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </TextField>
      <TextField
        name="FaxNumber"
        label="FaxNumber"
        value={carrierData.FaxNumber || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="IsQuickPayAllowed"
        label="QuickPay Allowed"
        value={carrierData.IsQuickPayAllowed || 'false'}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        select
        className={classes.textField}
      >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </TextField>
      <TextField
        name="AdditionalData[0].Field"
        label="AdditionalData[0].Field"
        value={carrierData.AdditionalData[0].Field || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="AdditionalData[0].Value"
        label="AdditionalData[0].Value"
        value={carrierData.AdditionalData[0].Value || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="AdditionalData[0].Type"
        label="AdditionalData[0].Type"
        value={carrierData.AdditionalData[0].Type || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="StatusNote"
        label="StatusNote"
        value={carrierData.StatusNote || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <Button name="submitBtn" type="submit" className={classes.button} variant="contained" color="primary">
        Create Carrier
      </Button>
    </form>
  );
};

export default CreateCarrier;