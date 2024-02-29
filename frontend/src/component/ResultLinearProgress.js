import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function ResultLinearProgress({
  positiveVoteCount,
  totalVoteCount,
}) {
  // Normalize the progress bar value
  const MIN = 0;
  const MAX = totalVoteCount;
  console.log("Positive vote count:", positiveVoteCount);
    console.log("Total vote count:", totalVoteCount);
  const normalize = (value) => ((value - MIN) * 100) / (MAX - MIN);
  const normalizedProgress = normalize(positiveVoteCount);
  console.log("Normalized progress:", normalizedProgress);

  return (
    <React.Fragment>
      <LinearProgress variant="determinate" value={normalizedProgress} />
    </React.Fragment>
  );
}
