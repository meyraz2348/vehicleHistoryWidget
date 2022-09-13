import * as React from "react";
import { Box, Fade, Backdrop, Modal, Button, Stack } from "@mui/material";
import InputForm from "./InputForm";
import { set } from "date-fns";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 440,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NewVehicleLogModal = () => {
  const [open, setOpen] = React.useState(false);
  const [benchHandle, setBenchHandle] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleBenchOpen = () => {
    setBenchHandle(true);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setBenchHandle(false);
  };
  return (
    <div>
      <Stack spacing={3} direction="row">
        <Button onClick={handleOpen} variant="contained">
          Add New Vechile Log
        </Button>
        <Button onClick={handleBenchOpen} variant="contained">
          Add New Bench Log
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <InputForm onInsertButton={handleClose} isBenchOpen={benchHandle} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default NewVehicleLogModal;
