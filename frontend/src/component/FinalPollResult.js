import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// Custom Components
import GoogleMapEmbed from "./GoogleMapEmbed";
import ResultLinearProgress from "./ResultLinearProgress";
// MUI
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Icons
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import PhotoTwoToneIcon from "@mui/icons-material/PhotoTwoTone";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYelp } from "@fortawesome/free-brands-svg-icons";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
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
  const [planDetails, setPlanDetails] = useState({});
  const [orderedRestaurants, setOrderedRestaurants] = useState([]);

  // Access the 'code' parameter from the URL
  const { planCode } = useParams();

  // Fetch the plan details from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://http://89.116.187.139:4200/plan/get-plan?planCode=${planCode}`
        );
        console.log("Plan details:", res.data);
        setPlanDetails(res.data);
      } catch (error) {
        console.error("Error getting plan details:", error);
      }
    };
    if (planCode) {
      fetchData();
    }
  }, [planCode]);

  // Sort the restaurants by the number of positive votes
  useEffect(() => {
    if (planDetails.restaurants) {
      planDetails.restaurants.sort((a, b) => {
        return b.positiveVoteCount - a.positiveVoteCount;
      });
    }
    setOrderedRestaurants(planDetails.restaurants);
    setCurrentRestaurantIndex(0);
  }, [planDetails]);

  // Use the currentRestaurantIndex to display the corresponding restaurant
  const restaurant = planDetails.restaurants
    ? planDetails.restaurants[currentRestaurantIndex]
    : 0;

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

  // Share the plan details
  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "The results are in!",
          text: `Looks like the majority has chosen ${restaurant.name}! The plan is set for ${planDetails.formattedDate} @ ${planDetails.timeOfEvent}.`,
          url: window.location.href,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert(`Share the code: ${planCode}`);
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ m: "0 auto", p: 0, mt: 0.5 }}>
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
              m: "1rem",
              justifyContent: "left",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "baseline",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: "22px",
                  color: "#333",
                  fontWeight: 700,
                  lineHeight: "28px",
                  letterSpacing: "0.35px",
                }}
              >
                {planDetails.planName}&nbsp;
              </Typography>
              <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "21px",
                    letterSpacing: "-0.32px",
                  }}
                  gutterBottom
                >
                  hosted by {planDetails.hostName}
                </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "21px",
                letterSpacing: "-0.32px",
              }}
            >
              {/* Display the formatted date and time  */}
              {formattedDate} @ {planDetails.timeOfEvent}
            </Typography>
          </Box>
          <Divider sx={{ width: "100%", m: 0 }} />
          {/* Share box */}
          <Box
            sx={{
              px: 2,
              py: 1.25,
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
              variant="h3"
              sx={{
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "25px",
                letterSpacing: "0.38px",
                color: "#153A50",
                m: 0,
                p: 0,
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

          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "25px",
                letterSpacing: "0.38px",
              }}
              gutterBottom
            >
              Looks like the majority has chosen...
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "34px",
                lineHeight: "41px",
                letterSpacing: "0.37px",
              }}
            >
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
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(34, 34, 34, 0.357292) 65.1%, rgba(208, 208, 208, 0) 100%)",
                position: "absolute",
                width: "100%",
                p: 2,
                boxSizing: "border-box",
              }}
            >
              <Box sx={{ p: 0 }}>
                <Typography
                  variant="h1"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "28px",
                    lineHeight: "34px",
                    letterSpacing: "0.36px",
                    m: 0,
                    p: 0,
                    pr: "48px",
                  }}
                >
                  {restaurant.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fff",
                    fontWeight: 400,
                    fontSize: "15px",
                    lineHeight: "20px",
                    letterSpacing: "-0.24px",
                  }}
                >
                  <Rating
                    name="restaurant-rating"
                    value={restaurant.rating ? restaurant.rating : 0}
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
                    pb: 0.4,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#fff",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "13px",
                      letterSpacing: "0.07px",
                    }}
                    gutterBottom
                  >
                    {restaurant.price} •{" "}
                    {restaurant.categories
                      ? restaurant.categories.join(", ")
                      : ""}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#fff",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "13px",
                      letterSpacing: "0.07px",
                    }}
                    gutterBottom
                  >
                    {restaurant.distanceFromUser}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fff",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "13px",
                    letterSpacing: "0.07px",
                  }}
                >
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
          </Box>
          <Box sx={{ mx: 2, mt: 0.5, alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: -1, px: 1 }}>
              Results
            </Typography>
            <List component="ol" marker="decimal">
              {planDetails.restaurants &&
                planDetails.restaurants
                  .slice(0, planDetails.numberOfMatches)
                  .map((restaurant, index) => (
                    <ListItem key={index}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          width: "95%",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ py: 1, m: 0, fontWeight: 600, width: "95%" }}
                        >
                          {"  "}
                          {restaurant.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#777",
                            py: 1,
                            m: 0,
                            textAnchor: "end",
                            textAlign: "right",
                            display: "flex",
                            fontSize: 16,
                            alignItems: "center",
                          }}
                        >
                          {restaurant.positiveVoteCount}{" "}
                          <ThumbUpTwoToneIcon
                            sx={{
                              mx: 0.75,
                              color: "#299F75",
                              fontSize: 16,
                            }}
                          />
                        </Typography>
                        <Typography
                          sx={{
                            color: "#777",
                            py: 1,
                            m: 0,
                            textAnchor: "end",
                            textAlign: "right",
                            display: "flex",
                            fontSize: 16,
                            alignItems: "center",
                          }}
                        >
                          {restaurant.negativeVoteCount}{" "}
                          <ThumbDownTwoToneIcon
                            sx={{
                              ml: 0.75,
                              color: "#9E2A2A",
                              fontSize: 16,
                            }}
                          />
                        </Typography>
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <ResultLinearProgress
                          key={index}
                          positiveVoteCount={restaurant.positiveVoteCount}
                          totalVoteCount={restaurant.totalVoteCount}
                        />
                      </Box>
                    </ListItem>
                  ))}
            </List>
          </Box>
        </Paper>
      </ThemeProvider>
    </Container>
  );
};
export default FinalPollResult;
