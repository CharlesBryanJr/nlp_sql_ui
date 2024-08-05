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
    tms_id: "12345",
    load_id: "LOAD001",
    carrier_tms_id: "6789",
    canonical_status: "delivered",
    total_charges: {
      carrier_amount: "500.00",
      customer_amount: "1000.00",
      currency: "USD",
    },
    remaining_charges: {
      carrier_amount: "250.00",
      currency: "USD",
    },
    distance: {
      amount: "100.25",
      units: "cubic_feet",
    },
    quantity: 3,
    status: "active",
    tms_created_at: "2023-06-30T12:00:00Z",
    tms_updated_at: "2023-07-01T09:30:00Z",
    target_ship_start: "2023-07-05T08:00:00Z",
    target_ship_end: "2023-07-05T12:00:00Z",
    actual_shipped_at: "2023-07-05T09:30:00Z",
    target_delivery_start: "2023-07-06T08:00:00Z",
    target_delivery_end: "2023-07-06T12:00:00Z",
    actual_delivered_at: "2023-07-06T10:00:00Z",
    origin_address: {
      name: "Origin Warehouse",
      line_1: "123 Main St",
      line_2: "Suite 100",
      city: "Dallas",
      state: "TX",
      postal_code: "75000",
      country_code: "USA",
    },
    destination_address: {
      name: "Destination Warehouse",
      line_1: "456 Elm St",
      line_2: "",
      city: "Houston",
      state: "TX",
      postal_code: "77000",
      country_code: "USA",
    },
    picks: [
      {
        tms_id: "PICK001",
        shipment_tms_ids: ["SHIP001", "SHIP002"],
        address: {
          name: "Pickup Location 1",
          line_1: "789 Oak St",
          line_2: "",
          city: "Austin",
          state: "TX",
          postal_code: "76000",
          country_code: "USA",
        },
      },
      {
        tms_id: "PICK002",
        shipment_tms_ids: ["SHIP003"],
        address: {
          name: "Pickup Location 2",
          line_1: "987 Pine St",
          line_2: "",
          city: "San Antonio",
          state: "TX",
          postal_code: "77000",
          country_code: "USA",
        },
      },
    ],
    drops: [
      {
        tms_id: "DROP001",
        shipment_tms_ids: ["SHIP001", "SHIP002"],
        address: {
          name: "Drop-off Location 1",
          line_1: "789 Oak St",
          line_2: "",
          city: "Austin",
          state: "TX",
          postal_code: "76000",
          country_code: "USA",
        },
      },
      {
        tms_id: "DROP002",
        shipment_tms_ids: ["SHIP003"],
        address: {
          name: "Drop-off Location 2",
          line_1: "987 Pine St",
          line_2: "",
          city: "San Antonio",
          state: "TX",
          postal_code: "77000",
          country_code: "USA",
        },
      },
    ],
    require_pod: true,
    require_weight_ticket: false,
    require_customer_rate_confirmation: true,
    require_originals: false,
    pro_number: "PRO123",
    brokered: true,
    mode: "LTL",
    freight_class: "50",
    memo: "Special instructions",
    delivery_number: "DEL123",
    ppe: "Safety gloves and goggles required",
    quote_number: "QUOTE001",
    load_note: "Additional load notes",
    payables_note: "Additional payables notes",
    quickpay: false,
    days_to_pay: 30,
    office: "Dallas",
    sales_rep: "John Smith",
    business_unit: "BU123",
    priority: "High",
    blind: false,
    shipped_items: [
      {
        tms_id: "ITEM001",
        description: "Box of Books",
        class_name: "92.5",
        item_type: "General",
        nmfc: "12345",
        hazardous_material: false,
        quantity: "10",
        weight: [
          {
            amount: "100",
            units: "pounds",
          },
        ],
        width: "12.5",
        height: "10",
        length: "15",
      },
    ],
    shipments: [
      {
        tms_id: "SHIP001",
        shipment_id: "SHIP001",
      },
      {
        tms_id: "SHIP002",
        shipment_id: "SHIP002",
      },
      {
        tms_id: "SHIP003",
        shipment_id: "SHIP003",
      },
    ],
    weight: [
      {
        amount: "300",
        units: "pounds",
      },
    ],
    equipment_type: "Flatbed",
    volume: [
      {
        amount: "200",
        units: "cubic_feet",
      },
    ],
    load_description: "Load description",
    is_ltl: true,
    assigned_tractor_number: "TRUCK001",
    assigned_trailer_number: "TRAILER001",
    division: "Division 1",
    references: [
      {
        name: "Reference 1",
        value: "Value 1",
        type: "integration_detail",
      },
      {
        name: "Reference 2",
        value: "Value 2",
        type: "broker_visible_detail",
      },
    ],
    network_submission: [
      {
        document_requirements: [
          {
            document_requirements: [
              "invoice",
              "rate_confirmation",
              "bill_of_lading",
              "lumper",
              "other",
            ],
          },
        ],
      },
    ],
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
    setLoadData((prevLoadData) => {
      return { ...prevLoadData, [name]: value };
    });
  };

  const generateRandomData = () => {
    const randomLoadData = {};

    for (const key in empty_LoadData) {
      if (empty_LoadData.hasOwnProperty(key)) {
        if (typeof empty_LoadData[key] === "string") {
          randomLoadData[key] = generateRandomString();
        } else if (typeof empty_LoadData[key] === "boolean") {
          randomLoadData[key] = generateRandomBoolean();
        } else if (typeof empty_LoadData[key] === "number") {
          randomLoadData[key] = generateRandomNumber();
        } else if (Array.isArray(empty_LoadData[key])) {
          randomLoadData[key] = generateRandomArray(empty_LoadData[key]);
        } else if (typeof empty_LoadData[key] === "object") {
          randomLoadData[key] = generateRandomObject(empty_LoadData[key]);
        }
      }
    }
    setLoadData(randomLoadData);
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
        Generate Random Load Data
      </Button>
      <br />
      <TextField
        key="tms_id"
        name="tms_id"
        label="tms_id"
        value={empty_LoadData.tms_id || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="load_id"
        name="load_id"
        label="load_id"
        value={empty_LoadData.load_id || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="carrier_tms_id"
        name="carrier_tms_id"
        label="carrier_tms_id"
        value={empty_LoadData.carrier_tms_id || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="canonical_status"
        name="canonical_status"
        label="canonical_status"
        value={empty_LoadData.canonical_status || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="total_charges.carrier_amount"
        name="total_charges.carrier_amount"
        label="total_charges.carrier_amount"
        value={empty_LoadData.total_charges?.carrier_amount || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="total_charges.customer_amount"
        name="total_charges.customer_amount"
        label="total_charges.customer_amount"
        value={empty_LoadData.total_charges?.customer_amount || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="total_charges.currency"
        name="total_charges.currency"
        label="total_charges.currency"
        value={empty_LoadData.total_charges?.currency || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="remaining_charges.carrier_amount"
        name="remaining_charges.carrier_amount"
        label="remaining_charges.carrier_amount"
        value={empty_LoadData.remaining_charges?.carrier_amount || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="remaining_charges.currency"
        name="remaining_charges.currency"
        label="remaining_charges.currency"
        value={empty_LoadData.remaining_charges?.currency || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="distance.amount"
        name="distance.amount"
        label="distance.amount"
        value={empty_LoadData.distance?.amount || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="distance.units"
        name="distance.units"
        label="distance.units"
        value={empty_LoadData.distance?.units || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="quantity"
        name="quantity"
        label="quantity"
        value={empty_LoadData.quantity || 1}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="status"
        name="status"
        label="status"
        value={empty_LoadData.status || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="tms_created_at"
        name="tms_created_at"
        label="tms_created_at"
        value={empty_LoadData.tms_created_at || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="tms_updated_at"
        name="tms_updated_at"
        label="tms_updated_at"
        value={empty_LoadData.tms_updated_at || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="target_ship_start"
        name="target_ship_start"
        label="target_ship_start"
        value={empty_LoadData.target_ship_start || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="target_ship_end"
        name="target_ship_end"
        label="target_ship_end"
        value={empty_LoadData.target_ship_end || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="actual_shipped_at"
        name="actual_shipped_at"
        label="actual_shipped_at"
        value={empty_LoadData.actual_shipped_at || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="target_delivery_start"
        name="target_delivery_start"
        label="target_delivery_start"
        value={empty_LoadData.target_delivery_start || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="target_delivery_end"
        name="target_delivery_end"
        label="target_delivery_end"
        value={empty_LoadData.target_delivery_end || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="actual_delivered_at"
        name="actual_delivered_at"
        label="actual_delivered_at"
        value={empty_LoadData.actual_delivered_at || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="origin_address.name"
        name="origin_address.name"
        label="origin_address.name"
        value={empty_LoadData.origin_address?.name || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="origin_address.line_1"
        name="origin_address.line_1"
        label="origin_address.line_1"
        value={empty_LoadData.origin_address?.line_1 || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="origin_address.line_2"
        name="origin_address.line_2"
        label="origin_address.line_2"
        value={empty_LoadData.origin_address?.line_2 || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="origin_address.country_code"
        name="origin_address.country_code"
        label="origin_address.country_code"
        value={empty_LoadData.origin_address?.country_code || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="destination_address.name"
        name="destination_address.name"
        label="destination_address.name"
        value={empty_LoadData.destination_address?.name || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="destination_address.line_1"
        name="destination_address.line_1"
        label="destination_address.line_1"
        value={empty_LoadData.destination_address?.line_1 || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="destination_address.line_2"
        name="destination_address.line_2"
        label="destination_address.line_2"
        value={empty_LoadData.destination_address?.line_2 || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="destination_address.country_code"
        name="destination_address.country_code"
        label="destination_address.country_code"
        value={empty_LoadData.destination_address?.country_code || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="picks[0].tms_id"
        name="picks[0].tms_id"
        label="picks[0].tms_id"
        value={empty_LoadData.picks?.[0]?.tms_id || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="picks[0].shipment_tms_ids[0]"
        name="picks[0].shipment_tms_ids[0]"
        label="picks[0].shipment_tms_ids[0]"
        value={empty_LoadData.picks?.[0]?.shipment_tms_ids?.[0] || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="picks[0].address.name"
        name="picks[0].address.name"
        label="picks[0].address.name"
        value={empty_LoadData.picks?.[0]?.address.name || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
    <TextField
        key="picks[0].address.line_1"
        name="picks[0].address.line_1"
        label="picks[0].address.line_1"
        value={empty_LoadData.picks?.[0]?.address.line_1 || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
    <TextField
        key="picks[0].address.line_2"
        name="picks[0].address.line_2"
        label="picks[0].address.line_2"
        value={empty_LoadData.picks?.[0]?.address.line_2 || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
    <TextField
        key="picks[0].address.city"
        name="picks[0].address.city"
        label="picks[0].address.city"
        value={empty_LoadData.picks?.[0]?.address.city || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
    <TextField
        key="picks[0].address.state"
        name="picks[0].address.state"
        label="picks[0].address.state"
        value={empty_LoadData.picks?.[0]?.address.state || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="picks[0].address.postal_code"
        name="picks[0].address.postal_code"
        label="picks[0].address.postal_code"
        value={empty_LoadData.picks?.[0]?.address.postal_code || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="picks[0].address.country_code"
        name="picks[0].address.country_code"
        label="picks[0].address.country_code"
        value={empty_LoadData.picks?.[0]?.address.country_code || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="drops[0].tms_id"
        name="drops[0].tms_id"
        label="drops[0].tms_id"
        value={empty_LoadData.drops?.[0]?.tms_id || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
    <TextField
        key="drops[0].shipment_tms_ids[0]"
        name="drops[0].shipment_tms_ids[0]"
        label="drops[0].shipment_tms_ids[0]"
        value={empty_LoadData.drops?.[0]?.shipment_tms_ids?.[0] || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="drops[0].address.name"
        name="drops[0].address.name"
        label="drops[0].address.name"
        value={empty_LoadData.drops?.[0]?.address.name || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="drops[0].address.line_1"
        name="drops[0].address.line_1"
        label="drops[0].address.line_1"
        value={empty_LoadData.drops?.[0]?.address.line_1 || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="drops[0].address.line_2"
        name="drops[0].address.line_2"
        label="drops[0].address.line_2"
        value={empty_LoadData.drops?.[0]?.address.line_2 || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="drops[0].address.city"
        name="drops[0].address.city"
        label="drops[0].address.city"
        value={empty_LoadData.drops?.[0]?.address.city || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="drops[0].address.state"
        name="drops[0].address.state"
        label="drops[0].address.state"
        value={empty_LoadData.drops?.[0]?.address.state || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="drops[0].address.postal_code"
        name="drops[0].address.postal_code"
        label="drops[0].address.postal_code"
        value={empty_LoadData.drops?.[0]?.address.postal_code || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="drops[0].address.country_code"
        name="drops[0].address.country_code"
        label="drops[0].address.country_code"
        value={empty_LoadData.drops?.[0]?.address.country_code || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
      <TextField
        key="require_pod"
        name="require_pod"
        label="require_pod"
        value={empty_LoadData.require_pod || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
    <TextField
        key="require_weight_ticket"
        name="require_weight_ticket"
        label="require_weight_ticket"
        value={empty_LoadData.require_weight_ticket || true}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        select
        >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
    </TextField>
    <TextField
        key="require_customer_rate_confirmation"
        name="require_customer_rate_confirmation"
        label="require_customer_rate_confirmation"
        value={empty_LoadData.require_customer_rate_confirmation || true}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        select
        >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
    </TextField>
    <TextField
        key="require_originals"
        name="require_originals"
        label="require_originals"
        value={empty_LoadData.require_originals || true}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        select
        >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
    </TextField>
    <TextField
        key="pro_number"
        name="pro_number"
        label="pro_number"
        value={empty_LoadData.pro_number || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="brokered"
        name="brokered"
        label="brokered"
        value={empty_LoadData.brokered || true}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        select
    >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
    </TextField>
      <TextField
        key="mode"
        name="mode"
        label="mode"
        value={empty_LoadData.mode || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="freight_class"
        name="freight_class"
        label="freight_class"
        value={empty_LoadData.freight_class || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
      <TextField
        key="memo"
        name="memo"
        label="memo"
        value={empty_LoadData.memo || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="delivery_number"
        name="delivery_number"
        label="delivery_number"
        value={empty_LoadData.delivery_number || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="ppe"
        name="ppe"
        label="ppe"
        value={empty_LoadData.ppe || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />

      <TextField
        key="quote_number"
        name="quote_number"
        label="quote_number"
        value={empty_LoadData.quote_number || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />

      <TextField
        key="load_note"
        name="load_note"
        label="load_note"
        value={empty_LoadData.load_note || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />

      <TextField
        key="payables_note"
        name="payables_note"
        label="payables_note"
        value={empty_LoadData.payables_note || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
    <TextField
        key="quickpay"
        name="quickpay"
        label="quickpay"
        value={empty_LoadData.quickpay || true}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        select
    >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
    </TextField>
    <TextField
        key="days_to_pay"
        name="days_to_pay"
        label="days_to_pay"
        value={empty_LoadData.days_to_pay || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="office"
        name="office"
        label="office"
        value={empty_LoadData.office || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
      <TextField
        key="sales_rep"
        name="sales_rep"
        label="sales_rep"
        value={empty_LoadData.sales_rep || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="business_unit"
        name="business_unit"
        label="business_unit"
        value={empty_LoadData.business_unit || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="priority"
        name="priority"
        label="priority"
        value={empty_LoadData.priority || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
    <TextField
        key="blind"
        name="blind"
        label="blind"
        value={empty_LoadData.blind || true}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        select
    >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
    </TextField>
    <TextField
        key="shipped_items[0].tms_id"
        name="shipped_items[0].tms_id"
        label="shipped_items[0].tms_id"
        value={empty_LoadData.shipped_items?.[0]?.tms_id || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].description"
        name="shipped_items[0].description"
        label="shipped_items[0].description"
        value={empty_LoadData.shipped_items?.[0]?.description || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].class_name"
        name="shipped_items[0].class_name"
        label="shipped_items[0].class_name"
        value={empty_LoadData.shipped_items?.[0]?.class_name || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].item_type"
        name="shipped_items[0].item_type"
        label="shipped_items[0].item_type"
        value={empty_LoadData.shipped_items?.[0]?.item_type || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].nmfc"
        name="shipped_items[0].nmfc"
        label="shipped_items[0].nmfc"
        value={empty_LoadData.shipped_items?.[0]?.nmfc || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].hazardous_material"
        name="shipped_items[0].hazardous_material"
        label="shipped_items[0].hazardous_material"
        value={empty_LoadData.shipped_items?.[0]?.hazardous_material || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].quantity"
        name="shipped_items[0].quantity"
        label="shipped_items[0].quantity"
        value={empty_LoadData.shipped_items?.[0]?.quantity || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].weight[0].amount"
        name="shipped_items[0].weight[0].amount"
        label="shipped_items[0].weight[0].amount"
        value={empty_LoadData.shipped_items?.[0]?.weight?.[0]?.amount || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].weight[0].units"
        name="shipped_items[0].weight[0].units"
        label="shipped_items[0].weight[0].units"
        value={empty_LoadData.shipped_items?.[0]?.weight?.[0]?.units || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].width"
        name="shipped_items[0].width"
        label="shipped_items[0].width"
        value={empty_LoadData.shipped_items?.[0]?.width || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].height"
        name="shipped_items[0].height"
        label="shipped_items[0].height"
        value={empty_LoadData.shipped_items?.[0]?.height || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
        <TextField
        key="shipped_items[0].length"
        name="shipped_items[0].length"
        label="shipped_items[0].length"
        value={empty_LoadData.shipped_items?.[0]?.length || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        />
    <TextField
        key="shipments[0].tms_id"
        name="shipments[0].tms_id"
        label="shipments[0].tms_id"
        value={empty_LoadData.shipments?.[0]?.tms_id || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="shipments[0].shipment_id"
        name="shipments[0].shipment_id"
        label="shipments[0].shipment_id"
        value={empty_LoadData.shipments?.[0]?.shipment_id || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="weight[0].amount"
        name="weight[0].amount"
        label="weight[0].amount"
        value={empty_LoadData.weight?.[0]?.amount || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="weight[0].units"
        name="weight[0].units"
        label="weight[0].units"
        value={empty_LoadData.weight?.[0]?.units || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="equipment_type"
        name="equipment_type"
        label="equipment_type"
        value={empty_LoadData.equipment_type || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="volume[0].amount"
        name="volume[0].amount"
        label="volume[0].amount"
        value={empty_LoadData.volume?.[0]?.amount || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="volume[0].units"
        name="volume[0].units"
        label="volume[0].units"
        value={empty_LoadData.volume?.[0]?.units || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="load_description"
        name="load_description"
        label="load_description"
        value={empty_LoadData.load_description || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="is_ltl"
        name="is_ltl"
        label="is_ltl"
        value={empty_LoadData.is_ltl || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="assigned_tractor_number"
        name="assigned_tractor_number"
        label="assigned_tractor_number"
        value={empty_LoadData.assigned_tractor_number || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="assigned_trailer_number"
        name="assigned_trailer_number"
        label="assigned_trailer_number"
        value={empty_LoadData.assigned_trailer_number || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <TextField
        key="division"
        name="division"
        label="division"
        value={empty_LoadData.division || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="references[0].name"
        name="references[0].name"
        label="references[0].name"
        value={empty_LoadData.references?.[0]?.name || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="references[0].value"
        name="references[0].value"
        label="references[0].value"
        value={empty_LoadData.references?.[0]?.value || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="references[0].type"
        name="references[0].type"
        label="references[0].type"
        value={empty_LoadData.references?.[0]?.type || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
    />
    <TextField
        key="network_submission[0].document_requirements[0].document_requirements[0]"
        name="network_submission[0].document_requirements[0].document_requirements[0]"
        label="network_submission[0].document_requirements[0].document_requirements[0]"
        value={empty_LoadData.network_submission?.[0]?.document_requirements?.[0]?.document_requirements?.[0] || ""}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        multiline
        className={classes.textField}
    />
    <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
    >
        Create Carrier
      </Button>
    </form>
  );
};

export default CreateLoad;
