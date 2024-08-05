import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, MenuItem } from "@material-ui/core";
import useStyles from "./styles";
import { createLoad } from "../../../actions/Loads";

const CreateLoad = ({ setCurrentId }) => {
  // const { loads, isLoading } = useSelector((state) => state.loads);
  const classes = useStyles();
  const dispatch = useDispatch();

  const empty_LoadData = {
    "ExternalLoadKey": "",
    "ExternalPayeeKey": "",
    "LoadStatusId": 0,
    "ReferenceNo": "",
    "PickupDate": "",
    "OriginName": "",
    "OriginAddress1": "",
    "OriginAddress2": "",
    "OriginCity": "",
    "OriginState": "",
    "OriginPostalCode": "",
    "OriginCountry": "",
    "DeliveryDate": "",
    "DestinationConsignee": "",
    "DestinationAddress1": "",
    "DestinationAddress2": "",
    "DestinationCity": "",
    "DestinationState": "",
    "DestinationPostalCode": "",
    "DestinationCountry": "",
    "Distance": 0,
    "DistanceUnits": 0,
    "TotalWeight": 0,
    "WeightUnitTypeId": 0,
    "EquipmentType": 0,
    "Volume": 0,
    "VolumeUnits": 0,
    "LoadDescription": "",
    "LTLFlag": false,
    "AssignedTractorNumber": "",
    "AssignedTrailerNumber": "",
    "LineItems": [
      {
        "ChargeTypeId": 0,
        "Description": "",
        "Amount": 0
      },
    ],
    "AdditionalData": [
      {
        "Field": "",
        "Value": "",
        "Type": 0
      },
    ],
    "Stops": [
      {
        "Consignee": "",
        "Sequence": "",
        "Address1": "",
        "Address2": "",
        "City": "",
        "State": "",
        "PostalCode": "",
        "Country": "",
        "StopDeliveryDate": ""
      }
    ]
  };  

  const [loadData, setLoadData] = useState(empty_LoadData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLoad(loadData));
    setLoadData((prevLoadData) => {
      return { ...empty_LoadData };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nestedProperties = name.split('.');
  
    if (nestedProperties.length > 1) {
      setLoadData((prevLoadData) => {
        const updatedData = { ...prevLoadData };
        let currentLevel = updatedData;
        for (let i = 0; i < nestedProperties.length - 1; i++) {
          const nestedProperty = nestedProperties[i];
  
          if (!currentLevel[nestedProperty]) {
            currentLevel[nestedProperty] = Array.isArray(prevLoadData[nestedProperty]) ? [] : {};
          }
          currentLevel = currentLevel[nestedProperty];
        }
        currentLevel[nestedProperties[nestedProperties.length - 1]] = value;
        return { ...updatedData };
      });
    } else {
      setLoadData((prevLoadData) => {
        return { ...prevLoadData, [name]: value };
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

  const generateRandomLineItems = (length) => {
    const lineItems = [];
    for (let i = 0; i < length; i++) {
      lineItems.push({
        ChargeTypeId: generateRandomNumber(1, 4),
        Description: generateRandomString(),
        Amount: generateRandomNumber(0, 1000)
      });
    }
    return lineItems;
  };

  const generateRandomAdditionalData = (length) => {
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

  const generateRandomDate = () => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + generateRandomNumber(1, 60) * 24 * 60 * 60 * 1000);
    const year = futureDate.getFullYear();
    const month = futureDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = futureDate.getDate();
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };  

  const generateRandomStops = (length) => {
    const stops = [];
    for (let i = 0; i < length; i++) {
      stops.push({
        Consignee: generateRandomString(),
        Sequence: generateRandomString(),
        Address1: generateRandomString(),
        Address2: generateRandomString(),
        City: generateRandomString(),
        State: generateRandomString(),
        PostalCode: generateRandomString(),
        Country: generateRandomString(),
        StopDeliveryDate: generateRandomDate() // Generate a random date string
      });
    }
    return stops;
  };
  

  const generateRandomObject = () => {
    const obj = {
      "ExternalPayeeKey": generateRandomString()
    }
    return obj;
  };

  const generateRandomData = (empty_LoadData) => {
    const randomLoadData = {};
  
    for (const key in empty_LoadData) {
      if (empty_LoadData.hasOwnProperty(key)) {
        if (key === "PickupDate" || key === "DeliveryDate") {
          randomLoadData[key] = generateRandomDate();
        } else if (key === "LoadStatusId") {
          randomLoadData[key] = generateRandomNumber(1, 6)
        } else if (key === "DistanceUnits" || key === "WeightUnitTypeId" || key === "VolumeUnits") {
          randomLoadData[key] = generateRandomNumber(1, 2)
        } else if (key === "EquipmentType" || key === "WeightUnitTypeId") {
          randomLoadData[key] = generateRandomNumber(1, 4)
        } else if (typeof empty_LoadData[key] === 'string') {
          randomLoadData[key] = generateRandomString();
        } else if (typeof empty_LoadData[key] === 'boolean') {
          randomLoadData[key] = generateRandomBoolean();
        } else if (typeof empty_LoadData[key] === 'number') {
          randomLoadData[key] = generateRandomNumber();
        } else if (Array.isArray(empty_LoadData[key])) {
          if (key === "LineItems") {
            const length = generateRandomNumber(1, 3);
            randomLoadData[key] = generateRandomLineItems(length);
          } else if (key === "AdditionalData") {
            const length = generateRandomNumber(1, 3);
            randomLoadData[key] = generateRandomAdditionalData(length);
          } else if (key == "Stops"){
            const length = generateRandomNumber(1, 3);
            randomLoadData[key] = generateRandomStops(length);
          }
        } else if (typeof empty_LoadData[key] === 'object') {
          randomLoadData[key] = generateRandomObject();
        }
      }
    }
    return randomLoadData;
  };

  const handleGenerateRandomData = (e) => {
    e.preventDefault();
    const randomLoadData = generateRandomData(empty_LoadData);
    setLoadData(randomLoadData);
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
        Generate Random Load Data
      </Button>
      <br />
      <TextField
        name="ExternalLoadKey"
        label="ExternalLoadKey"
        value={loadData.ExternalLoadKey || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="ExternalPayeeKey"
        label="ExternalPayeeKey"
        value={loadData.ExternalPayeeKey || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LoadStatusId"
        label="LoadStatusId"
        value={loadData.LoadStatusId || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="ReferenceNo"
        label="ReferenceNo"
        value={loadData.ReferenceNo || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="PickupDate"
        label="PickupDate"
        value={loadData.PickupDate || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginName"
        label="OriginName"
        value={loadData.OriginName || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginAddress1"
        label="OriginAddress1"
        value={loadData.OriginAddress1 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginAddress2"
        label="OriginAddress2"
        value={loadData.OriginAddress2 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginCity"
        label="OriginCity"
        value={loadData.OriginCity || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginState"
        label="OriginState"
        value={loadData.OriginState || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginPostalCode"
        label="OriginPostalCode"
        value={loadData.OriginPostalCode || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="OriginCountry"
        label="OriginCountry"
        value={loadData.OriginCountry || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DeliveryDate"
        label="DeliveryDate"
        value={loadData.DeliveryDate || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationConsignee"
        label="DestinationConsignee"
        value={loadData.DestinationConsignee || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationAddress1"
        label="DestinationAddress1"
        value={loadData.DestinationAddress1 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationAddress2"
        label="DestinationAddress2"
        value={loadData.DestinationAddress2 || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationCity"
        label="DestinationCity"
        value={loadData.DestinationCity || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationState"
        label="DestinationState"
        value={loadData.DestinationState || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationPostalCode"
        label="DestinationPostalCode"
        value={loadData.DestinationPostalCode || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DestinationCountry"
        label="DestinationCountry"
        value={loadData.DestinationCountry || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="Distance"
        label="Distance"
        value={loadData.Distance || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="DistanceUnits"
        label="DistanceUnits"
        value={loadData.DistanceUnits || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="TotalWeight"
        label="TotalWeight"
        value={loadData.TotalWeight || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="WeightUnitTypeId"
        label="WeightUnitTypeId"
        value={loadData.WeightUnitTypeId || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="EquipmentType"
        label="EquipmentType"
        value={loadData.EquipmentType || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="Volume"
        label="Volume"
        value={loadData.Volume || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="VolumeUnits"
        label="VolumeUnits"
        value={loadData.VolumeUnits || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LoadDescription"
        label="LoadDescription"
        value={loadData.LoadDescription || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="LTLFlag"
        label="LTLFlag"
        value={loadData.LTLFlag || false}
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
        name="AssignedTractorNumber"
        label="AssignedTractorNumber"
        value={loadData.AssignedTractorNumber || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        name="AssignedTrailerNumber"
        label="AssignedTrailerNumber"
        value={loadData.AssignedTrailerNumber || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      {loadData.LineItems && loadData.LineItems.map((item, index) => (
        <React.Fragment key={`lineItem-${index}`}>
          <TextField
            name={`LineItems[${index}].ChargeTypeId`}
            label={`Line Item ${index + 1} - Charge Type Id`}
            value={item.ChargeTypeId}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            className={classes.textField}
          />
          <TextField
            name={`LineItems[${index}].Description`}
            label={`Line Item ${index + 1} - Description`}
            value={item.Description}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            className={classes.textField}
          />
          <TextField
            name={`LineItems[${index}].Amount`}
            label={`Line Item ${index + 1} - Amount`}
            value={item.Amount}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            className={classes.textField}
          />
        </React.Fragment>
      ))}

      {loadData.AdditionalData && loadData.AdditionalData.map((data, index) => (
        <React.Fragment key={`additionalData-${index}`}>
          <TextField
            name={`AdditionalData[${index}].Field`}
            label={`Additional Data ${index + 1} - Field`}
            value={data.Field}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            className={classes.textField}
          />
          <TextField
            name={`AdditionalData[${index}].Value`}
            label={`Additional Data ${index + 1} - Value`}
            value={data.Value}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            className={classes.textField}
          />
          <TextField
            name={`AdditionalData[${index}].Type`}
            label={`Additional Data ${index + 1} - Type`}
            value={data.Type}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            className={classes.textField}
          />
        </React.Fragment>
      ))}
      <Button name="submitBtn" type="submit" className={classes.button} variant="contained" color="primary">
        Create Load
      </Button>
    </form>
  );
};

export default CreateLoad;
