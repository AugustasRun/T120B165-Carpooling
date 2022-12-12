import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Modal.css";
import { Button } from "react-bootstrap";

const style = {
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default function InfoModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} className="modal-button">
        About the system
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Why us?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            <b>Register your dispatch center</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            When you create an account with us you can register dispatch center and register drivers.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            <b>Drivers</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Drivers can create routes which they took and track their worklog
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            <b>Administratoros</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            If any problem occurs feel free to contact us and we will fix them for you
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
