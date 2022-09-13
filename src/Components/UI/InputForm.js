import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import classes from "./InputForm.Module.css";
import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { maxWidth, Stack } from "@mui/system";

const InputForm = (props) => {
  const [contractStartDate, setContractStartDate] = useState();
  const [contractEndDate, setContractEndDate] = useState();
  const [vehicleStatus, setVehicleStatus] = useState("");
  const contractEndDateChangeHandler = (newToDate, dateString) => {
    setContractEndDate(newToDate.format("YYYY-MM-DD"), dateString);
  };
  const contractStartDateChangeHandler = (newFromDate, dateString) => {
    setContractStartDate(newFromDate.format("YYYY-MM-DD"), dateString);
  };
  const vehicleStatusChangeHandler = (event) => {
    setVehicleStatus((status) => event.target.value);
  };
  const isEmpty = (value) => value.trim() === "";
  const regoRef = useRef("");
  const driverNameRef = useRef("");
  let formIsValid = false;
  let allVehicles = [];
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const rego = regoRef.current.value;
    const driverName = driverNameRef.current.value;
    const regoIsValid = !isEmpty(rego);
    const driverNameIsValid = !isEmpty(driverName);
    const startDateIsValid = !isEmpty(contractStartDate);
    const endDateIsValid = !isEmpty(contractEndDate);
    const vehicleStatusIsValid = !isEmpty(vehicleStatus);
    formIsValid =
      regoIsValid &&
      driverNameIsValid &&
      startDateIsValid &&
      endDateIsValid &&
      vehicleStatusIsValid;
    if (!formIsValid) {
      return;
    }
    regoRef.current.value = "";
    driverNameRef.current.value = "";
    setContractEndDate("");
    setContractStartDate("");
    setVehicleStatus("");
    props.onInsertButton();
  };

  const ContractStartDateComponent = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="start"
        inputFormat="DD/MM/YYYY"
        value={contractStartDate}
        onChange={contractStartDateChangeHandler}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );

  const ContractEndDateComponent = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="end"
        inputFormat="DD/MM/YYYY"
        value={contractEndDate}
        onChange={contractEndDateChangeHandler}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
  const Status = (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Status"
      value={vehicleStatus}
      onChange={vehicleStatusChangeHandler}
    >
      <MenuItem value={"ACTIVE"}>Active</MenuItem>
      <MenuItem value={"HOLD"}>Hold</MenuItem>
      <MenuItem value={"ENDED"}>Ended</MenuItem>
    </Select>
  );
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack justifyContent="center" alignItems="center">
        <TextField id="outlined-error" inputRef={regoRef} label="rego" />
        <TextField
          id="outlined-error"
          inputRef={driverNameRef}
          label="driverName"
        />
        {ContractStartDateComponent}
        {ContractEndDateComponent}
        <FormControl sx={{ m: 1, minWidth: 251 }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          {Status}
        </FormControl>
        <Button
          onClick={formSubmitHandler}
          variant="contained"
          size="medium"
          style={{ margin: "1rem" }}
        >
          Insert
        </Button>
      </Stack>
    </Box>
  );
};

export default InputForm;
