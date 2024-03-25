import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Fab from "@mui/material/Fab";
import Badge from "@mui/material/Badge";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import CloseIcon from "@mui/icons-material/Close";

const noVotes = "No votes yet";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function VotingDetailsDialog({  positiveVoteCount, getPositiveVoters }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Fab
        onClick={handleClickOpen}
        sx={{ backgroundColor: "#fff" }}
        size="medium"
      >
        <Badge badgeContent={positiveVoteCount} color="info">
          <ThumbUpTwoToneIcon sx={{ color: "#2A759F", fontSize: 35 }} />
        </Badge>
      </Fab>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        fullWidth
      >
        <Button
          onClick={handleClose}
          sx={{ display: "flex", justifyContent: "right", m: 0, p: 1.5, pb: 0 }}
        >
          <CloseIcon sx={{ color: "#222" }} />
        </Button>
        <DialogTitle
          sx={{
            justifyContent: "center",
            display: "flex",
            p: 1.5,
            pt: 0,
            m: 0,
            fontWeight: 600,
            fontSize: "1.75rem",
          }}
        >
          {"Voted"}
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
          <Button
            variant="outlined"
            sx={{
              border: "3px solid #299F75",
              borderRadius: "50%",
              p: 1,
              m: 0,
              boxShadow:
                "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
            }}
          >
            <ThumbUpTwoToneIcon sx={{ color: "#299F75", fontSize: 40 }} />
          </Button>
        </Box>
        <DialogContent>
          <List dense sx={{ justifyContent: "center", p: 0 }}>
            {getPositiveVoters?.length === 0 && (
              <ListItem sx={{ textAlign: "center", m: "0 auto", p: 0 }} key={0}>
                <ListItemText
                  primary={noVotes}
                  primaryTypographyProps={{
                    fontSize: 16,
                    fontWeight: "medium",
                    letterSpacing: 0.5,
                  }}
                  sx={{ p: 0, m: 0.25 }}
                />
              </ListItem>
            )}

            {getPositiveVoters?.map((member, index) => (
              <ListItem
                key={index}
                sx={{ textAlign: "center", m: "0 auto", p: 0 }}
              >
                <ListItemText
                  primary={member}
                  primaryTypographyProps={{
                    fontSize: 16,
                    fontWeight: "medium",
                    letterSpacing: 0.5,
                  }}
                  sx={{ p: 0, m: 0.25 }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              justifyContent: "center",
              display: "flex",
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: "16px",
              backgroundColor: "#3592C6",
              m: 2,
              mt: 0,
              p: 1,
            }}
            fullWidth
          >
            Continue Voting
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
