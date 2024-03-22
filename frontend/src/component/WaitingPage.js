import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import { useNavigate, useParams } from "react-router-dom";
import useWebSocket from "../hooks/useWebSocket";

export default function WaitingPage() {
  const navigate = useNavigate();
  const { planCode } = useParams();
  const { sessionActive } = useWebSocket("wss://89.116.187.139", planCode, null, true);

  // If the session is no longer active (time is up or ended by host), redirect to the final poll results page:
  useEffect(() => {
    if (!sessionActive) {
      navigate(`/final-poll/${planCode}`);
    }
  }, [sessionActive, planCode, navigate]);

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
          height: "100vh"
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', textAlign: "center", mt: "160px" }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'inter', fontWeight: 700, fontSize: '28px', lineHeight: '34px', letterSpacing: '0.36px'}}>
            { sessionActive ? "Voting still in session!" : "Session has ended!" }
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'inter', fontWeight: 400, fontSize: '16px', lineHeight: '21px', letterSpacing: '-0.32px', alignItems: 'center', width: '203px' }}>
          {sessionActive
              ? "Please wait a moment for everyone to finish voting."
              : "Redirecting to the final poll results..."}
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
