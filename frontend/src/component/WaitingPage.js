import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";


export default function WaitingPage() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ m: "0 auto", mt: 0.0115, p: 0 }}
    >
      <Paper
        sx={{
          backgroundColor: "#E9D8AE",
          p: 3,
          height: "100vh",
        }}
      >
        <Box
          sx={{ justifyContent: "center", textAlign: "center", mt: "160px" }}
        >
          <Typography variant="h4" gutterBottom>
            Voting still in session!
          </Typography>
          <Typography variant="h6">
            Please wait a moment for everyone to finish voting.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "100px" }}>
          <CircularProgress size={60} thickness={6} sx={{ color: "#C79E34" }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "80px" }}>
            <ThumbUpTwoToneIcon sx={{ color: "#2A759F", fontSize: 50 }} />
        </Box>
      </Paper>
    </Container>
  );
}
