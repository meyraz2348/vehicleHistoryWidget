import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { format } from "date-fns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Stack, TextField } from "@mui/material";
const FromToDatePickers = (props) => {
  const [fromDate, setFromDate] = React.useState(
    format(new Date(), "dd-MM-yyy")
  );
  const [toDate, setToDate] = React.useState(format(new Date(), "dd-MM-yyy"));

  useEffect(() => {
    props.onEnteredDates({
      toDate: toDate,
      fromDate: fromDate,
    });
  }, [fromDate, toDate]);
  const ToDateChangeHandler = (newToDate, dateString) => {
    setToDate(newToDate.format("YYYY-MM-DD"), dateString);
  };
  const fromDateChangeHandler = (newFromDate, dateString) => {
    setFromDate(newFromDate.format("YYYY-MM-DD"), dateString);
  };
  const FromDatePick = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="from"
        inputFormat="MM/DD/YYYY"
        value={fromDate}
        onChange={fromDateChangeHandler}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );

  const ToDatePick = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="to"
        inputFormat="MM/DD/YYYY"
        value={toDate}
        onChange={ToDateChangeHandler}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {FromDatePick}
        <Divider sx={{ height: 60, m: 0.5 }} orientation="vertical" />
        {ToDatePick}
      </Stack>
    </Box>
  );
};

export default FromToDatePickers;
{
  /* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */
}
{
  /* <FromToDatePickers onEnteredDates={dateSearchHandler} /> */
}
