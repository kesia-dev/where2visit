import * as React from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from '@mui/material/DialogContentText';
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function ViewPollsDialog({ isOpen }) {

  // Access the code and username parameter from the URL
  const { planCode } = useParams();

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        fullWidth
        disableEscapeKeyDown
      >
        <DialogTitle
          sx={{
            justifyContent: "center",
            display: "flex",
            p: 1.5,
            pt: 0,
            m: 2,
            fontWeight: 600,
            fontSize: "1.75rem",
          }}
        >
          {"Thank You For Voting"}
        </DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: "0 auto",
            p: 0,
          }}
        >
            <LocationOnSharpIcon sx={{ color: "#2A759F", fontSize: 40, border: "none" }} />
        </Box>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Let's see what your friends have voted for!
            </DialogContentText>

        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            component={Link} to={`/final-poll/${planCode}`}
            sx={{
              justifyContent: "center",
              display: "flex",
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: "16px",
              backgroundColor: "#2A759F",
              boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.1),0px 1px 10px 0px rgba(0,0,0,0.12)",
              m: 2,
              mt: 0,
              p: 1,
            }}
            fullWidth
          >
            View Polls
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
