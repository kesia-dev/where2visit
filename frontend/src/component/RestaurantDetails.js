import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import VotingDetailsDialog from "./VotingDetailsDialog";
import MemberDetailsDialog from "./MemberDetailsDialog";
import GoogleMapEmbed from "./GoogleMapEmbed";
import copy from "clipboard-copy";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Popper from "@mui/material/Popper";
import Fab from "@mui/material/Fab";
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
import { set } from "mongoose";

const RestaurantDetails = () => {
  const [copyFeedback, setCopyFeedback] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [planDetails, setPlanDetails] = useState({});
  const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);
  const [voteType, setVoteType] = useState(null);

  // Access the code and username parameter from the URL
  const { planCode, userName } = useParams();

  // Fetch the plan details from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4200/plan/get-plan?planCode=${planCode}`
        );
        setPlanDetails(res.data);
        console.log("Plan details:", res.data);
      } catch (error) {
        console.error("Error getting plan details:", error);
      }
    };
    fetchData();
  }, [planCode]);

//   console.log("Restaurants:", planDetails.restaurants);
  const members = planDetails.participants;
//   console.log("Members:", members);

  // Use the currentRestaurantIndex to display the corresponding restaurant
  const restaurant = planDetails.restaurants
    ? planDetails.restaurants[currentRestaurantIndex]
    : 0;

  // Event handler for voting
  const handleVoteClick = async () => {
      console.log(
        "Vote:",
        voteType,
        "for restaurant:",
        restaurant._id,
        "by user:",
        userName
      );
    setVoteType(voteType);

    // Send the vote to the server
     await axios
      .post(`http://localhost:4200/plan/vote-restaurant?planCode=${planCode}`, {
        roomId: planCode,
        username: userName,
        restaurantId: restaurant._id,
        voteType: voteType,
      })
      .then((res) => {
        console.log("Vote response:", res.data);
      })
     .catch((error) => {
        console.error("Error voting:", error);
      });
  };

  // Create a new Date object from the date and time strings
  const eventDate = new Date(`${planDetails.dateOfEvent}`);
  const eventTime = new Date(
    `${planDetails.dateOfEvent}T${planDetails.timeOfEvent}`
  );

  // Format the date and time
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = eventTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  console.log("date:", planDetails.dateOfEvent);
  console.log("time:", planDetails.timeOfEvent);
  console.log("formatted date:", formattedDate);
  console.log("formatted time:", formattedTime);

  // Get the number of positive votes for the current restaurant
  const positiveVoteCount = restaurant.positiveVoteCount
    ? restaurant.positiveVoteCount
    : 0;
  console.log("vote count:", positiveVoteCount);

  //   Event handlers for the arrow buttons
  const handleNextClick = () => {
    setCurrentRestaurantIndex(
      (prevIndex) => (prevIndex + 1) % planDetails.restaurants.length
    );
  };

  const handlePrevClick = () => {
    setCurrentRestaurantIndex(
      (prevIndex) =>
        (prevIndex - 1 + planDetails.restaurants.length) %
        planDetails.restaurants.length
    );
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
          url: window.location.href,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert(`Share the code: ${planCode}`);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ m: "0 auto", mt: 0.0115, p: 0 }}
    >
      <Paper
        elevation={3}
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
              {formattedDate} @ {formattedTime}
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
          <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
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
                "linear-gradient(-180deg, rgba(0,0,0,0.6) 0%, rgba(255,255,255,0.1) 115%)",
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
                {currentRestaurantIndex + 1}/{planDetails.numberOfResults}{" "}
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
            <VotingDetailsDialog positiveVoteCount={positiveVoteCount} />
            {/* See Members */}
            <MemberDetailsDialog members={members} />
            {/* See More Photos */}
            <Fab sx={{ backgroundColor: "#fff" }} size="medium">
              <PhotoTwoToneIcon sx={{ color: "#2A759F", fontSize: 35 }} />
            </Fab>
          </Box>
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
                "linear-gradient(-180deg, rgba(255,255,255,0.15) -5%, rgba(0,0,0,0.6) 100%)",
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
        {/* Vote Navigation */}
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
            <Button onClick={handlePrevClick}>
              <KeyboardDoubleArrowLeftIcon
                sx={{ color: "#C79E34", fontSize: 40 }}
              />
            </Button>
          </Box>
          {/* Like/Dislike Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              m: "auto 6rem",
              p: 0,
            }}
          >
            <Button
              voteType="negative"
              onClick={() => handleVoteClick("negative")}
              variant="outlined"
              sx={{
                border: "3px solid #9E2A2A",
                borderRadius: "50%",
                p: 1,
                mr: 1,
                boxShadow:
                  "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
              }}
            >
              <ThumbDownTwoToneIcon sx={{ color: "#9E2A2A", fontSize: 40 }} />
            </Button>
            <Button
              voteType="positive"
              onClick={() => handleVoteClick("positive")}
              variant="outlined"
              sx={{
                border: "3px solid #299F75",
                borderRadius: "50%",
                p: 1,
                ml: 1,
                boxShadow:
                  "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
              }}
            >
              <ThumbUpTwoToneIcon sx={{ color: "#299F75", fontSize: 40 }} />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              m: 0,
              position: "absolute",
              left: "80%",
            }}
          >
            <Button onClick={handleNextClick}>
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
          {/* <Box sx={{ display: "flex" }}>
            <Button
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
          </Box> */}
          {/* Map */}
          <GoogleMapEmbed googleEmbedMapUrl={restaurant.googleEmbedMapUrl} />
          {/* <Card
            sx={{
              justifyContent: "center",
              alignItems: "center",
              m: 1,
              p: 0,
              borderRadius: "16px",
              border: "2px solid black",
              boxSizing: "content-box",
            }}
          >
            <CardMedia
              component="iframe"
              src={restaurant.googleStaticMapUrl}
              alt="Map"
              width="100%"
              height="170px"
            />
          </Card> */}
        </Box>
      </Paper>
    </Container>
  );
};
export default RestaurantDetails;
