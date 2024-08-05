import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import { createCarrier } from '../../../actions/Carriers';

const CreateCarrier = ({ setCurrentId }) => {
  // const { carriers, isLoading } = useSelector((state) => state.carriers);
  const classes = useStyles();
  const dispatch = useDispatch();

  const populated_carrierData = {
    "name": "",
    "active": true,
    "tms_id": "",
    "held": false,
    "quickpay_allowed": false,
    "days_to_pay": 30,
    "alternate_id": "",
    "dba_name": "",
    "primary_contact": "",
    "payment_strategy": "",
    "status_note": "",
    "division": "",
    "category": '',
    "default_payout_term_code": "",
    "assigned_factor_id": "",
    "ein": "",
    "mc_numbers": [ "" ],
    "dot_numbers": [ "" ],
    "scacs": [ "" ],
    "labels": [ "" ],
    "contact_emails": [ "" ],
    "phone_numbers": [ "" ],
    "fax_numbers": [ "" ],
    "additional_data": [
        {
            "field": "",
            "value": "",
            "type": 0
        }
    ],
    "company_address": {
      "name": "",
      "line_1": "",
      "line_2": '',
      "city": "",
      "state": "",
      "postal_code": "",
      "country": ""
    },
    "remit_address": {
        "name": "",
        "line_1": "",
        "line_2": '',
        "city": "",
        "state": "",
        "postal_code": "",
        "country": ""
    },
  };

  const empty_carrierData = {
    "name": "Charles Carrier",
    "active": true,
    "tms_id": "1",
    "held": false,
    "quickpay_allowed": false,
    "days_to_pay": 30,
    "alternate_id": "ABC124s498",
    "dba_name": "Carrier & Co.",
    "primary_contact": 'Charles Bryan',
    "payment_strategy": "T-Check",
    "status_note": "This carrier is in good standing",
    "division": "USD",
    "category": 'Group A',
    "default_payout_term_code": "SP30",
    "assigned_factor_id": "86f189e2-e90f-4426-b2f0-03fe49dfb9e7",
    "ein": "462483250",
    "mc_numbers": [
      "MC1",
      "MC2"
    ],
    "dot_numbers": [
      "DOT1",
      "DOT2"
    ],
    "scacs": [
        "SCAC1",
        "SCAC2"
    ],
    "labels": [
      "New Client"
    ],
    "contact_emails": [
        "carrier@example.com"
    ],
    "phone_numbers": [
        "9998887777"
    ],
    "fax_numbers": [
        "6665554444"
    ],
    "additional_data": [
        {
            "field": "PRO",
            "value": "PRO123",
            "type": 0
        }
    ],
    "company_address": {
      "name": "Carrier Name",
      "line_1": "1200 Main Street",
      "line_2": '001',
      "city": "Dallas",
      "state": "TX",
      "postal_code": "76000",
      "country": "USA"
    },
    "remit_address": {
        "name": "Factor Name",
        "line_1": "1201 Factor Street",
        "line_2": '001',
        "city": "Dallas",
        "state": "TX",
        "postal_code": "76001",
        "country": "USA"
    },
  };

  const [carrierData, setCarrierData] = useState(empty_carrierData);

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const generateRandomData = (empty_carrierData) => {
    const randomCarrierData = {};
    
    for (const key in empty_carrierData) {
      if (empty_carrierData.hasOwnProperty(key)) {
        if (typeof empty_carrierData[key] === 'string') {
          randomCarrierData[key] = generateRandomString();
        } else if (typeof empty_carrierData[key] === 'boolean') {
          randomCarrierData[key] = generateRandomBoolean();
        } else if (typeof empty_carrierData[key] === 'number') {
          randomCarrierData[key] = generateRandomNumber();
        } else if (Array.isArray(empty_carrierData[key])) {
          randomCarrierData[key] = generateRandomArray();
        } else if (typeof empty_carrierData[key] === 'object') {
          randomCarrierData[key] = generateRandomObject();
        }
      }
    }
    console.log(randomCarrierData);
    setCarrierData(randomCarrierData);
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
        Generate Random Carrier Data
      </Button>
      <br/>
      <TextField
        name="name"
        label="Name"
        value={carrierData.name || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="active"
        label="Active"
        value={carrierData.active || true}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        select
        className={classes.textField}
        >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </TextField>
      <TextField
        name="tms_id"
        label="TMS ID"
        value={carrierData.tms_id || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="held"
        label="Held"
        value={carrierData.held || false}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        select
        className={classes.textField}
        >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </TextField>
      <TextField
        name="quickpay_allowed"
        label="QuickPay Allowed"
        value={carrierData.held || false}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        select
        className={classes.textField}
      >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </TextField>
      <TextField
        name="days_to_pay"
        label="Days to Pay"
        value={carrierData.days_to_pay || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="alternate_id"
        label="Alternate ID"
        value={carrierData.alternate_id || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="dba_name"
        label="DBA Name"
        value={carrierData.dba_name || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="primary_contact"
        label="Primary Contact"
        value={carrierData.primary_contact || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="payment_strategy"
        label="Payment Strategy"
        value={carrierData.payment_strategy || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="status_note"
        label="Status Note"
        value={carrierData.status_note || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="division"
        label="Division"
        value={carrierData.division || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="category"
        label="Category"
        value={carrierData.category || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="default_payout_term_code"
        label="Default Payout Term Code"
        value={carrierData.default_payout_term_code || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="assigned_factor_id"
        label="Assigned Factor ID"
        value={carrierData.assigned_factor_id || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="ein"
        label="EIN"
        value={carrierData.ein || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="mc_numbers"
        label="MC Numbers"
        value={carrierData.mc_numbers || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="dot_numbers"
        label="DOT Numbers"
        value={carrierData.dot_numbers || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="scacs"
        label="SCACs"
        value={carrierData.scacs || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="labels"
        label="Labels"
        value={carrierData.labels || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="contact_emails"
        label="Contact Emails"
        value={carrierData.contact_emails || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="phone_numbers"
        label="Phone Numbers"
        value={carrierData.phone_numbers || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="fax_numbers"
        label="Fax Numbers"
        value={carrierData.fax_numbers || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="company_address.name"
        label="Company Address Name"
        value={carrierData.company_address && carrierData.company_address.name ? carrierData.company_address.name : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="company_address.line_1"
        label="Company Address Line 1"
        value={carrierData.company_address && carrierData.company_address.line_1 ? carrierData.company_address.line_1 : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="company_address.line_2"
        label="Company Address Line 2"
        value={carrierData.company_address && carrierData.company_address.line_2 ? carrierData.company_address.line_2 : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="company_address.city"
        label="Company Address City"
        value={carrierData.company_address && carrierData.company_address.city ? carrierData.company_address.city : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="company_address.state"
        label="Company Address State"
        value={carrierData.company_address && carrierData.company_address.state ? carrierData.company_address.state : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="company_address.postal_code"
        label="Company Address Postal Code"
        value={carrierData.company_address && carrierData.company_address.postal_code ? carrierData.company_address.postal_code : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="remit_address.name"
        label="Remit Address Name"
        value={ carrierData.remit_address && carrierData.remit_address.name ? carrierData.remit_address.name : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="remit_address.line_1"
        label="Remit Address Line 1"
        value={ carrierData.remit_address && carrierData.remit_address.line_1 ? carrierData.remit_address.line_1 : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="remit_address.line_2"
        label="Remit Address Line 2"
        value={ carrierData.remit_address && carrierData.remit_address.line_2 ? carrierData.remit_address.line_2 : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="remit_address.city"
        label="Remit Address City"
        value={ carrierData.remit_address && carrierData.remit_address.city ? carrierData.remit_address.city : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="remit_address.state"
        label="Remit Address State"
        value={ carrierData.remit_address && carrierData.remit_address.state ? carrierData.remit_address.state : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="remit_address.postal_code"
        label="Remit Address Postal Code"
        value={ carrierData.remit_address && carrierData.remit_address.postal_code ? carrierData.remit_address.postal_code : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="additional_data"
        label="Additional Data Field"
        value={(carrierData.additional_data && carrierData.additional_data.length > 0) ? carrierData.additional_data[0]?.field || '' : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="additional_data"
        label="Additional Data Value"
        value={(carrierData.additional_data && carrierData.additional_data.length > 0) ? carrierData.additional_data[0]?.value || '' : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="additional_data"
        label="Additional Data Type"
        value={(carrierData.additional_data && carrierData.additional_data.length > 0) ? carrierData.additional_data[0]?.type || 0 : ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <Button variant="contained" color="primary" type="submit" className={classes.button}>
        Create Carrier
      </Button>
    </form>
  );
};

export default CreateCarrier;