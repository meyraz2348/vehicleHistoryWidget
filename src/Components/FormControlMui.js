import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, Button, TextField, FormGroup } from "@mui/material";
import { useRef } from "react";
import { format } from "date-fns";
import FromToDatePickers from "./FromToDatePickers";
const FormControlMui = (props) => {
  const searchRef = useRef(null);
  const [userSearch, setUserSearch] = useState("");
  const [enteredFromDate, setEnteredFromDate] = useState(
    format(new Date(), "dd-MM-yyy")
  );
  const [enteredToDate, setEnteredToDate] = useState(
    format(new Date(), "dd-MM-yyy")
  );
  useEffect(() => {
    props.onEnteredRego({
      rego: userSearch,
      newFromDate: enteredFromDate,
      newToDate: enteredToDate,
    });

    // searchRef.current.value = "";
  }, [userSearch, enteredFromDate, enteredToDate]);
  const formControlHandler = (event) => {
    event.preventDefault();
    setUserSearch((userSearch) => searchRef.current.value);
    searchRef.current.value = "";
  };
  const dateSearchHandler = (newDate) => {
    setEnteredFromDate(newDate.fromDate);
    setEnteredToDate(newDate.toDate);
    // searchRef.current.value = "";
  };
  return (
    <Paper
      sx={{
        p: "2px 4px",
        width: 900,
      }}
      elevation={3}
    >
      <FormControl
        component="form"
        style={{ display: "flex", alignItems: "center" }}
      >
        <FormGroup
          row={true}
          style={{
            // display: "flex-end",

            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            id="outlined-basic"
            label="rego"
            placeholder="search rego"
            variant="outlined"
            style={{
              margin: "2rem",
              minWidth: "60",
            }}
            inputRef={searchRef}
          />
          <Button
            variant="contained"
            style={{
              margin: "2rem",
              marginLeft: "1rem",
            }}
            onClick={formControlHandler}
          >
            search
          </Button>
        </FormGroup>
      </FormControl>
    </Paper>
  );
};

export default FormControlMui;
