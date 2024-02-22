import React, { useState } from "react";
import plan from "../mock-data/plan-MQIJR";
import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LinearProgress from "@mui/material/LinearProgress";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import PhotoTwoToneIcon from "@mui/icons-material/PhotoTwoTone";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYelp } from "@fortawesome/free-brands-svg-icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const poll = {
  up_votes: 5,
  member_count: 9,
  matches: 3,
  voted_members: [
    "John",
    "Jane",
    "Alice",
    "Sam",
    "Tom",
    "John",
    "Jane",
    "Alice",
    "Sam",
  ],
};

const theme = createTheme({
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "#E9D8AE",
          height: "9px",
          borderRadius: "8px",
          p: 0,
          m: 0,
        },
        bar: {
          backgroundColor: "#2A759F",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          listStyle: "decimal inside none",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          display: "list-item",
          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          fontWeight: 600,
        },
      },
    },
  },
});

const FinalPollResult = () => {
  const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);

  // Use the currentRestaurantIndex to display the corresponding restaurant
  const restaurant = plan.restaurants[currentRestaurantIndex];

  // Access the 'code' parameter from the URL
  const { code } = useParams();

  // Create a new Date object from the date and time strings
  const eventDateTime = new Date(`${plan.dateOfEvent}T${plan.timeOfEvent}`);

  // Format the date and time
  const formattedDate = eventDateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = eventDateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Normalize the progress bar value
  const MIN = 0;
  const MAX = poll.member_count;
  const normalize = (value) => ((value - MIN) * 100) / (MAX - MIN);
  const normalizedProgress = normalize(poll.up_votes);

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "The results are in!",
          text: `Looks like the majority has chosen ${restaurant.name}! The plan is set for ${plan.date} @ ${plan.time}.`,
          url: window.location.href,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert(`Share the code: ${code}`);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ m: "0 auto", mt: 0.0115, p: 0 }}
    >
      <Paper
        elevation={5}
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
            m: "1rem auto",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#333" }}>
            <strong>{plan.planName}</strong> hosted by {plan.hostName}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "18px", color: "#777" }}>
            {/* Display the formatted date and time  */}
            {formattedDate} @ {formattedTime}
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", m: 0 }} />
        {/* Share box */}
        <Box
          sx={{
            p: 2,
            backgroundColor: "#E9D8AE",
            boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "space-around",
            display: "flex",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "20px",
              color: "#153A50",
              m: 0,
              p: 0,
              fontWeight: 600,
            }}
          >
            Share the results with friends!
          </Typography>

          <Button
            onClick={handleShareClick}
            sx={{ verticalAlign: "middle", p: 0, m: 0 }}
          >
            <LaunchRoundedIcon
              sx={{
                bgcolor: "#153A50",
                color: "#85BDDD",
                p: 1.75,
                borderRadius: "50%",
                boxShadow:
                  "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
              }}
            />
          </Button>
        </Box>

        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">
            Looks like the majority has chosen...
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {restaurant.name}
          </Typography>
        </Box>
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
              <Typography variant="h4" sx={{ color: "#fff", fontWeight: 600 }}>
                {restaurant.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                <Rating
                  name="restaurant-rating"
                  value={restaurant.rating}
                  precision={0.1}
                  readOnly
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
              bottom: "75%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {/* View Photos */}
            <Fab sx={{ backgroundColor: "#fff" }} size="medium">
              <PhotoTwoToneIcon sx={{ color: "#2A759F", fontSize: 35 }} />
            </Fab>
          </Box>
          <CardMedia
            component="img"
            height="400px"
            width="100%"
            resize="cover"
            image={restaurant.photos[0].url}
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
              top: "80%",
              bottom: "0%",
              boxSizing: "border-box",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  {restaurant.price} • {restaurant.categories.join(", ")}
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
          <Box sx={{ display: "flex" }}>
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
          </Box>
          {/* Map */}
          <Card
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
              component="img"
              image={restaurant.googleStaticMapUrl}
              alt="Map"
              width="100%"
              height="170px"
            />
          </Card>
        </Box>
        <Box sx={{ mx: 2, mt: 0.5, alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: -1, px: 1 }}>
            Results
          </Typography>
          <ThemeProvider theme={theme}>
            <List component="ol" marker="decimal">
              {plan.restaurants
                .slice(0, plan.numberOfMatches)
                .map((restaurant, index) => (
                  <ListItem key={index}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        width: "90%",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ py: 1, m: 0, fontWeight: 600, width: "95%" }}
                      >
                        {restaurant.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#777",
                          py: 1,
                          m: 0,
                          textAnchor: "end",
                          width: "20%",
                        }}
                      >
                        {poll.up_votes} votes
                      </Typography>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={normalizedProgress}
                      />
                    </Box>
                  </ListItem>
                ))}
            </List>
          </ThemeProvider>
        </Box>
      </Paper>
    </Container>
  );
};
export default FinalPollResult;
