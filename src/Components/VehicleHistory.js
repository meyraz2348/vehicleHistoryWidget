import React, { useState } from "react";
import classes from "./VehicleHistory.module.css";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Stack from "@mui/material/Stack";
import DataGridMui from "./DataGridMui";
import FormControlMui from "./FormControlMui";
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
{
  /* <TextField id="outlined-basic" label="rego" variant="outlined" />
          <Button
            variant="contained"
            // value={searchRef}
            onClick={regoSearchHandler}
          >
            search
          </Button> */
}
