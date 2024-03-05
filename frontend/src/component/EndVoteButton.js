import React from 'react';
import Button from "@mui/material/Button";

const EndVoteButton = ({ endVotingSession }) => {
	
	return (
		<Button
      onClick={endVotingSession}
      variant="outlined"
      sx={{
        textDecoration: "none",
        color: "#333",
        borderRadius: "16px",
        border: "2px solid black",
        p: 1.5,
        m: 1,
        width: "100%",
        textTransform: "none",
        fontWeight: 600,
      }}
    >
      End Voting Session
    </Button>
	);
}

export default EndVoteButton;