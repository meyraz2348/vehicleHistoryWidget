import {
  Box,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Stack,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const VehicleOnBench = (props) => {
  const [benchStartDate, setBenchStartDate] = useState();
  const [benchEndDate, setBenchEndDate] = useState();
  const [vehicleStatus, setVehicleStatus] = useState("");
  const benchEndDateChangeHandler = (newToDate, dateString) => {
    setBenchEndDate(newToDate.format("YYYY-MM-DD"), dateString);
  };
  const benchStartDateChangeHandler = (newFromDate, dateString) => {
    setBenchStartDate(newFromDate.format("YYYY-MM-DD"), dateString);
  };
  const vehicleStatusChangeHandler = (event) => {
    setVehicleStatus((status) => event.target.value);
  };
  const isEmpty = (value) => value.trim() === "";
  const regoRef = useRef("");
  const notesRef = useRef("");
  let formIsValid = false;
  let allVehicles = [];
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const rego = regoRef.current.value;
    const notes = notesRef.current.value;
    const regoIsValid = !isEmpty(rego);
    const notesIsValid = !isEmpty(notes);
    const startDateIsValid = !isEmpty(benchStartDate);
    const endDateIsValid = !isEmpty(benchEndDate);
    const vehicleStatusIsValid = !isEmpty(vehicleStatus);
    formIsValid =
      regoIsValid &&
      notesIsValid &&
      startDateIsValid &&
      endDateIsValid &&
      vehicleStatusIsValid;
    if (!formIsValid) {
      return;
    }
    allVehicles.push({
      rego: rego,
      driverName: "Vikram Gupta",
      notes: notes,
      benchStartDate: benchStartDate,
      benchEndDate: benchEndDate,
      vehiclesStatus: vehicleStatus,
    });
    console.log(allVehicles);
    regoRef.current.value = "";
    notesRef.current.value = "";
    setBenchEndDate("");
    setBenchStartDate("");
    setVehicleStatus("");
    props.closeChildModalHandler();
  };

  const BenchStartDateComponent = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="start"
        inputFormat="DD/MM/YYYY"
        value={benchStartDate}
        onChange={benchStartDateChangeHandler}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );

  const BenchEndDateComponent = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="end"
        inputFormat="DD/MM/YYYY"
        value={benchEndDate}
        onChange={benchEndDateChangeHandler}
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
      <MenuItem value={"Mechanic"}>Mechanic</MenuItem>
      <MenuItem value={"Vikram Gupta"}>Garage</MenuItem>
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
        <Button variant="outlined" onClick={props.openChildModalHandler}>
          LogBenchEntry
        </Button>
        <Modal
          hideBackdrop
          open={props.openChildModalHandler}
          onClose={props.closeChildModalHandler}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <TextField id="outlined-error" inputRef={regoRef} label="rego" />
            <TextField
              id="outlined-error"
              defaultValue={"Vikram Gupta"}
              label="driverName"
            />
            {BenchStartDateComponent}
            {BenchEndDateComponent}
            <FormControl sx={{ m: 1, minWidth: 251 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              {Status}
              <TextField id="outlined-error" inputRef={notesRef} label="note" />
            </FormControl>
            <Button
              onClick={formSubmitHandler}
              variant="contained"
              size="medium"
              style={{ margin: "1rem" }}
            >
              Insert
            </Button>
          </Box>
        </Modal>
      </Stack>
    </Box>
  );
};
export default VehicleOnBench;
