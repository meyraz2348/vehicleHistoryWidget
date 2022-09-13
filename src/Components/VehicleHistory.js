import React, { useState } from "react";
import { Typography, Container, Stack } from "@mui/material";
import DataGridMui from "./DataGridMui";
import FormControlMui from "./FormControlMui";
import classes from "./VehicleHistory.module.css";
const VehicleHistory = (props) => {
  const [enteredRego, setEnteredRego] = useState(null);
  const [enteredFromDate, setEnteredFromDate] = useState(null);
  const [enteredToDate, setEnteredToDate] = useState(null);
  const regoSearchHandler = (userInput) => {
    setEnteredRego(userInput.rego);
    setEnteredFromDate(userInput.newFromDate);
    setEnteredToDate(userInput.newToDate);
  };

  return (
    <Typography component={"div"}>
      <Container>
        <Stack spacing={2} direction="row" className={classes.MuiStack}>
          <FormControlMui
            onEnteredRego={regoSearchHandler}
            onEnteredDates={{ enteredFromDate, enteredToDate }}
          />
        </Stack>
        <DataGridMui
          searchValue={enteredRego}
          enteredDates={{ enteredFromDate, enteredToDate }}
        />
      </Container>
    </Typography>
  );
};

export default VehicleHistory;
