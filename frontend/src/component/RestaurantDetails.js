import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// clipboard-copy
import copy from "clipboard-copy";
// Custom Components
import VotingDetailsDialog from "./VotingDetailsDialog";
import MemberDetailsDialog from "./MemberDetailsDialog";
import ViewPollsDialog from "./ViewPollsDialog";
import GoogleMapEmbed from "./GoogleMapEmbed";
import VotingSessionTimer from "./VotingSessionTimer";
import EndVoteButton from "./EndVoteButton";
// MUI
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Popper from "@mui/material/Popper";
import Fab from "@mui/material/Fab";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Icons
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone";
import PhotoTwoToneIcon from "@mui/icons-material/PhotoTwoTone";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYelp } from "@fortawesome/free-brands-svg-icons";

// Hooks
import useWebSocket from "../hooks/useWebSocket";

// theme to override the MUI Dialog component
const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          background: "none",
        },
      },
    },
  },
  // create palette for the theme
  palette: {
    primary: {
      main: "#3492C7",
    },
    disabled: {
      main: "#BDBDBD",
    },
    emerald: {
      main: "#299F75",
    },
    rouge: {
      main: "#C73434",
    },
    mustard: {
      main: "#C79E34",
    },
  },
});

const RestaurantDetails = () => {
  const [copyFeedback, setCopyFeedback] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [planDetails, setPlanDetails] = useState({});
  const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isPollsDialogOpen, setIsPollsDialogOpen] = useState(false);
  const [positiveVote, setPositiveVote] = useState(false);
  const [negativeVote, setNegativeVote] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);

  // Access the code and username parameter from the URL
  const { planCode } = useParams();

  // Event handler for the WebSocket onSessionEnd event:
  const onSessionEnd = useCallback(() => {
    console.log("Voting session ended by the host");
    setSessionActive(false);
    setIsPollsDialogOpen(true);
  }, []);
  // Use the WebSocket hook to get the time left for the voting session:
  const { timeLeft, sendMessage, socket } = useWebSocket(
    "ws://localhost:4200",
    planCode,
    onSessionEnd,
    sessionActive
  );

  // Fetch the plan details from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4200/plan/get-plan?planCode=${planCode}`
        );
        setPlanDetails(res.data);
        setSessionActive(res.data.isActive);
      } catch (error) {
        console.error("Error getting plan details:", error);
      }
    };
    fetchData();
  }, [planCode]);

  // Sending WebSocket message only when plan details are fetched and the WebSocket connection is open:
  useEffect(() => {
    // Check if plan is active before starting the timer
    if (planDetails && Object.keys(planDetails).length && sessionActive) {
      const sendStartTimerMessage = () => {
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
          sendMessage({ action: "start-timer", planCode });
        }
      };
      sendStartTimerMessage();
    }
  }, [planDetails, sendMessage, socket, planCode, sessionActive]);

  useEffect(() => {
    // When session ends, show the modal:
    if (!sessionActive) {
      setIsPollsDialogOpen(true);
    } else {
      setIsPollsDialogOpen(false);
    }
  }, [sessionActive]);

  // Handle timer end:
  const onTimerEnd = useCallback(() => {
    console.log("Timer ended on the client side");
    setSessionActive(false);
    setIsPollsDialogOpen(true);
  }, []);

  const endVotingSession = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      sendMessage({ action: "end-timer", planCode: planCode });
      console.log("Sent end-timer message to server");
      setIsPollsDialogOpen(true);
    }
  };

  // React to changes in timeLeft to determine if the timer has ended
  useEffect(() => {
    if (timeLeft === 0) {
      onTimerEnd();
    }
  }, [timeLeft, onTimerEnd]);

  // Get the members of the plan
  const members = planDetails.participants;
  // Get the the current user's username who joined the session from local storage
  const userName = localStorage.getItem("userName");
  // Determine if the user is the host
  const isHost = planDetails.hostName === userName;
  // Use the currentRestaurantIndex to display the corresponding restaurant
  const restaurant = planDetails.restaurants
    ? planDetails.restaurants[currentRestaurantIndex]
    : 0;

  // Event handler for positive votes using useEffect
  useEffect(() => {
    const handleVoteClick = async (voteType) => {
      const voterName = userName || planDetails.hostName;
      console.log(
        "Vote:",
        voteType,
        "by user:",
        voterName,
        "for restaurant:",
        restaurant.name,
        "with id:",
        restaurant._id,
        "in plan:",
        planCode
      );
      // Send the vote to the server
      await axios
        .post(`http://localhost:4200/plan/vote-restaurant`, {
          planCode,
          userName: voterName,
          restaurantId: restaurant._id,
          voteType,
        })
        .then((res) => {
          console.log("Vote response:", res.data);
          setPlanDetails(res.data.planDetails);
        })
        .catch((error) => {
          console.error("Error voting:", error);
          if (
            error.response &&
            error.response.status === 400 &&
            error.response.data.error ===
              "User has already voted for this restaurant"
          ) {
            setAlertMessage("You have already voted for this restaurant");
            setShowAlert(true);
          } else {
            setAlertMessage("Error occurred while submitting your vote.");
            setShowAlert(true);
          }
        });
    };
    if (positiveVote) {
      setPositiveVote(false);
      handleVoteClick("positive");
    }
    if (negativeVote) {
      setNegativeVote(false);
      handleVoteClick("negative");
    }
  }, [
    positiveVote,
    negativeVote,
    restaurant.positiveVoteCount,
    restaurant.memberVotes,
    planCode,
    userName,
    restaurant._id,
    restaurant.name,
    planDetails.hostName,
  ]);

  // View Directions button
  const handleDirectionsClick = () => {
    window.open(
      `https://www.google.com/maps/dir//${restaurant.name},${restaurant.address}`,
      "_blank"
    );
  };

  // Create a new Date object from the date and time strings
  const eventDate = new Date(`${planDetails.dateOfEvent}`);

  // Format the date and time
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get the number of positive votes for the current restaurant
  const positiveVoteCount = planDetails.restaurants
    ? planDetails.restaurants[currentRestaurantIndex].positiveVoteCount
    : 0;

  // Filter memberVotes to return only positive votes
  const filterPositiveVotes = planDetails.restaurants
    ? planDetails.restaurants[currentRestaurantIndex].memberVotes.filter(
        (memberVote) => memberVote.voteType === "positive"
      )
    : [];

  // Get the usernames of the members who voted positively
  const getPositiveVoters = filterPositiveVotes.map(
    (memberVote) => memberVote.username
  );
  // console.log("positive voters:", getPositiveVoters);

  // Event handlers for the arrow buttons
  const handleNextClick = () => {
    setCurrentRestaurantIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % planDetails.restaurants.length;
      return nextIndex;
    });
    // Clear the alert message:
    setShowAlert(false);
    setAlertMessage("");
  };

  const handlePrevClick = () => {
    setCurrentRestaurantIndex((prevIndex) => {
      const nextIndex =
        (prevIndex - 1 + planDetails.restaurants.length) %
        planDetails.restaurants.length;
      return nextIndex;
    });
    // Clear the alert message:
    setShowAlert(false);
    setAlertMessage("");
  };

  // copy handler
  const handleCopyClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    try {
      // Attempt to copy the code to the clipboard
      copy(planCode);
      setCopyFeedback("Copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      setCopyFeedback("Error copying to clipboard");
    }
    // Clear the feedback after a short delay
    setTimeout(() => {
      setCopyFeedback("");
    }, 1500);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join the Party",
          text: `Join the party with code: ${planCode}`,
          url: window.open(`http://localhost:3000/join-plan/${planCode}`),
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert(`Share the code: ${planCode}`);
      console.log("Web Share API not supported");
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ m: "0 auto", p: 0 }}>
      <ThemeProvider theme={theme}>
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 0,
            pb: 6,
          }}
        >
          {/* Details about the event */}
          <Box
            sx={{
              m: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{ fontSize: "18px", color: "#333" }}
              >
                <strong>{planDetails.planName}</strong> hosted by{" "}
                {planDetails.hostName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#777" }}
              >
                {/* Display the formatted date and time  */}
                {formattedDate} @ {planDetails.timeOfEvent}
              </Typography>
            </Box>
            {/* Adjust Selections */}
            <Button>
              <TuneRoundedIcon
                sx={{
                  bgcolor: "#153A50",
                  color: "#85BDDD",
                  p: 1.75,
                  ml: 2,
                  borderRadius: "50%",
                  boxShadow:
                    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                }}
              />
            </Button>
          </Box>
          <Divider sx={{ width: "100%", m: 0 }} />
          {/* Share box */}
          <Box sx={{ m: 2, display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{ width: "50%", display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: "18px", color: "#333" }}
              >
                <strong>Invite Your Friends!</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "16px", color: "#777" }}
              >
                Copy & Share Your Code
              </Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                mx: "auto",
              }}
            >
              {/* Yellow code box - copies to clipboard on click */}
              <Button
                sx={{
                  backgroundColor: "#E9D8AE",
                  color: "#333",
                  border: "2px dashed #666",
                  borderRadius: "8px",
                  padding: "8px",
                  alignItems: "center",
                  width: "fit-content",
                  height: "fit-content",
                  fontWeight: 600,
                  fontSize: "16px",
                  boxShadow:
                    "0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.1),0px 1px 10px 0px rgba(0,0,0,0.12)",
                }}
                onClick={handleCopyClick}
                type="button"
                aria-describedby={id}
              >
                {planCode}
              </Button>
              {copyFeedback && (
                <Popper id={id} open={open} anchorEl={anchorEl} placement="top">
                  <Box
                    sx={{
                      border: 1,
                      p: 1,
                      mb: 1,
                      bgcolor: "background.paper",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "12px", color: "black" }}
                    >
                      {copyFeedback}
                    </Typography>
                  </Box>
                </Popper>
              )}
              {/* Share button */}
              <Button
                variant="outlined"
                sx={{
                  border: "2px solid #85BDDD",
                  borderRadius: "8px",
                  padding: "8px",
                  alignItems: "center",
                  height: "fit-content",
                  fontWeight: 600,
                  fontSize: "16px",
                  boxShadow:
                    "0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.1),0px 1px 10px 0px rgba(0,0,0,0.12)",
                }}
                onClick={handleShareClick}
              >
                Share
              </Button>
            </Box>
          </Box>
          <Divider sx={{ width: "100%", m: 0 }} />
          {/* Timer */}
          <VotingSessionTimer
            timeLeft={timeLeft}
            sessionActive={sessionActive}
          />
          <Divider sx={{ width: "100%", m: 0 }} />
          {/* Restaurant details */}
          <Card
            key={currentRestaurantIndex}
            sx={{
              m: "0 auto",
              p: 0,
              justifyContent: "center",
              width: "100%",
              position: "relative",
              borderRadius: 0,
            }}
          >
            <CardContent
              sx={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(34, 34, 34, 0.357292) 65.1%, rgba(208, 208, 208, 0) 100%)",
                position: "absolute",
                width: "100%",
                p: 2,
                boxSizing: "border-box",
              }}
            >
              <Box sx={{ p: 0 }}>
                <Typography
                  variant="body1"
                  sx={{ color: "#fff", fontSize: "0.9rem" }}
                >
                  {currentRestaurantIndex + 1}/
                  {planDetails.restaurants
                    ? planDetails.restaurants.length
                    : planDetails.numberOfResults}{" "}
                  Restaurants
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontWeight: 600, maxWidth: "88%" }}
                >
                  {restaurant.name}
                </Typography>
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  <Rating
                    readOnly
                    name="restaurant-rating"
                    value={restaurant.rating ? restaurant.rating : 0}
                    precision={0.1}
                    sx={{ verticalAlign: "bottom", mr: 1 }}
                  />
                  {restaurant.rating} ({restaurant.reviewCount} Reviews)
                </Typography>
              </Box>
            </CardContent>
            {/* Floating Action Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                left: "90%",
                right: "7%",
                top: "1%",
                bottom: "45%",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              {/* See Likes */}
              <VotingDetailsDialog
                positiveVoteCount={positiveVoteCount}
                getPositiveVoters={getPositiveVoters}
              />
              {/* See Members */}
              <MemberDetailsDialog members={members} />
              {/* See More Photos */}
              <Fab sx={{ backgroundColor: "#fff" }} size="medium">
                <PhotoTwoToneIcon sx={{ color: "#2A759F", fontSize: 35 }} />
              </Fab>
            </Box>
            {/* </ThemeProvider> */}
            <CardMedia
              component="img"
              height="400px"
              width="100%"
              resize="cover"
              image={restaurant.photos ? restaurant.photos[0].url : ""}
              alt={restaurant.name}
              padding="0"
              position="absolute"
            />
            {/* Restaurant details */}
            <CardContent
              sx={{
                background:
                  "linear-gradient(180deg, rgba(208, 208, 208, 0) 0%, rgba(34, 34, 34, 0.357292) 34.9%, rgba(0, 0, 0, 0.7) 100%)",
                position: "absolute",
                width: "100%",
                p: 2,
                top: "77%",
                bottom: "0%",
                boxSizing: "border-box",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    {restaurant.price} •{" "}
                    {restaurant.categories
                      ? restaurant.categories.join(", ")
                      : ""}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    {restaurant.distanceFromUser}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  {restaurant.address}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          {/* Restaurant Navigation & Voting */}
          {/* Voting Alert */}
          {showAlert && (
            <Alert severity="warning" onClose={() => setShowAlert(false)}>
              {alertMessage}
            </Alert>
          )}
          <Box
            sx={{
              m: "1rem auto",
              display: "flex",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                m: 0,
                position: "absolute",
                right: "80%",
              }}
            >
              <Button onClick={() => handlePrevClick()}>
                <KeyboardDoubleArrowLeftIcon
                  sx={{ color: "#C79E34", fontSize: 40 }}
                />
              </Button>
            </Box>
            {/* Voting Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                m: "auto 6rem",
                p: 0,
              }}
            >
              <IconButton
                onClick={() => setNegativeVote(true)}
                disabled={sessionActive ? false : true}
                variant="outlined"
                color="rouge"
                sx={{
                  border: "3px solid #9E2A2A",
                  borderRadius: "50%",
                  p: 1,
                  mr: 1,
                  boxShadow:
                    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                }}
              >
                <ThumbDownTwoToneIcon
                  sx={{
                    fontSize: 40,
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => setPositiveVote(true)}
                disabled={sessionActive ? false : true}
                variant="outlined"
                color="emerald"
                sx={{
                  border: "3px solid #299F75",
                  borderRadius: "50%",
                  p: 1,
                  ml: 1,
                  boxShadow:
                    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                }}
              >
                <ThumbUpTwoToneIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                m: 0,
                position: "absolute",
                left: "80%",
              }}
            >
              <Button onClick={() => handleNextClick()}>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "#C79E34", fontSize: 40 }}
                />
              </Button>
            </Box>
          </Box>
          <Divider sx={{ width: "100%", m: 0 }} />
          {/* Details */}
          <Box sx={{ pt: 2, mx: 2, alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, px: 1 }}>
              Details
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                href={restaurant.yelpRestaurantUrl}
                target="_blank"
                sx={{
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "16px",
                  border: "2px solid black",
                  p: 1.5,
                  m: 1,
                  width: "50%",
                  fontWeight: 600,
                  textTransform: "none",
                }}
                startIcon={<FontAwesomeIcon icon={faYelp} color="#c73434" />}
              >
                Yelp
              </Button>
              <Button
                variant="outlined"
                href={restaurant.yelpRestaurantUrl}
                target="_blank"
                sx={{
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "16px",
                  border: "2px solid black",
                  p: 1.5,
                  m: 1,
                  width: "50%",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                <RestaurantRoundedIcon
                  sx={{ mr: 1, textDecoration: "none", color: "#222" }}
                />{" "}
                Menu
              </Button>
            </Box>
            {/* View Directions Button - to be decided on */}
            <Box sx={{ display: "flex" }}>
              <Button
                onClick={handleDirectionsClick}
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
                <LocationOnSharpIcon
                  sx={{ mr: 1, textDecoration: "none", color: "#3492C7" }}
                />
                View Directions
              </Button>
            </Box>
            {/* Map */}
            <GoogleMapEmbed googleEmbedMapUrl={restaurant.googleEmbedMapUrl} />
            {/* View Polls */}
            <Box sx={{ display: "flex" }}>
              <Button
                onClick={() => setIsPollsDialogOpen(true)}
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
                View Poll Results
              </Button>
              <ViewPollsDialog
                isOpen={isPollsDialogOpen}
                onClose={() => setIsPollsDialogOpen(false)}
                sessionActive={sessionActive}
                isHost={isHost}
              />
              {isHost && sessionActive && (
                <EndVoteButton endVotingSession={endVotingSession} />
              )}
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Container>
  );
};
export default RestaurantDetails;
