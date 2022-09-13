import { Container, Stack } from "@mui/material";
import VehicleHistory from "./Components/VehicleHistory";
import classes from "./App.module.css";
import { useEffect, useState } from "react";
import InputForm from "./Components/UI/InputForm";
import NewVehicleLogModal from "./Components/UI/NewVehicleLogModal";
const App = () => {
  return (
    /* trying to put app.js clean  */
    <Container>
      <Stack
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <VehicleHistory />
        <NewVehicleLogModal />
      </Stack>
    </Container>
  );
};

export default App;
