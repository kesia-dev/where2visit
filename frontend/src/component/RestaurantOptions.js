import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCuisine, addPrice, addRating } from "../features/userOptions/optionsSlice";
import { Box, Button, Grid, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

import "../styling/RestaurantOptions.css";

const RestaurantOptions = () => {

  const dispatch = useDispatch();

  const options = {
    cuisine: ["No preference", "French", "Italian", "Chinese", "Thai", "Greek", "Mexican", "Japanese", "Indian", "American"],
    // dietaryRestrictions: ["Keto", "Vegan", "Paleo", "Kosher", "Vegetarian", "Gluten Free"],
    priceRange: ["< $50", "$100 - $150", "$50 - $100", "$150+"],
    rating: ["Any star rating", "4+", "3+", "5"]
  };

  const states = {
    cuisine: useSelector(state => state.options.cuisine),
    price: useSelector(state => state.options.priceRange),
    rating: useSelector(state => state.options.rating),
  };

  console.log(states);

  const renderButtons = (items, category) => {
    const stateKeys = {
      "Cuisine": "cuisine",
      "Price Range (per person)": "price",
      "Rating (Optional)": "rating",
    };

    const handleClick = (value) => {
      switch (category) {
        case "Cuisine":
          dispatch(addCuisine(value));
          break;
        case "Price Range (per person)":
          // Mapping price range labels to corresponding values
          let priceValue;
          switch (value) {
            case "< $50":
              priceValue = 1;
              break;
            case "$50 - $100":
              priceValue = 2;
              break;
            case "$100 - $150":
              priceValue = 3;
              break;
            case "$150+":
              priceValue = 4;
              break;
            default:
              break;
          }
          dispatch(addPrice(priceValue));
          break;
        case "Rating (Optional)":
          // Mapping rating labels to corresponding values
          let ratingValue;
          switch (value) {
            case "Any star rating":
              ratingValue = null;
              break;
            case "3+":
              ratingValue = 3;
              break;
            case "4+":
              ratingValue = 4;
              break;
            case "5":
              ratingValue = 5;
              break;
            default:
              break;
          }
          dispatch(addRating(ratingValue));
          break;
        default:
          break;
      }
    };

    return items.map((item, index) => {
      const key = stateKeys[category];
      let isAdded;

      // Check if the saved value corresponds to the current item
      switch (category) {
        case "Price Range (per person)":
          // Map the saved rating value to labels and compare
          switch (states[key]) {
            case 1:
              isAdded = item === "< $50";
              break;
            case 2:
              isAdded = item === "$50 - $100";
              break;
            case 3:
              isAdded = item === "$100 - $150";
              break;
            case 4:
              isAdded = item === "$150+";
              break;
            default:
              isAdded = false;
              break;
          }
          break;
        case "Rating (Optional)":
          // Map the saved rating value to labels and compare
          switch (states[key]) {
            case null:
              isAdded = item === "Any star rating";
              break;
            case 3:
              isAdded = item === "3+";
              break;
            case 4:
              isAdded = item === "4+";
              break;
            case 5:
              isAdded = item === "5";
              break;
            default:
              isAdded = false;
              break;
          }
          break;
        default:
          // For the "Cuisine" category, check if the item is included in the saved array
          isAdded = Array.isArray(states[key]) ? states[key].includes(item) : states[key] === item;
          break;
      }

      return (
        <Button
          key={index}
          variant="outlined"
          style={{
            backgroundColor: isAdded ? '#153a50' : '#aed3e9',
            color: isAdded ? '#aed3e9' : '#153a50'
          }}
          sx={{
            marginTop: 2,
            borderRadius: '10px',
            textTransform: 'none',
            width: '180px',
            height: '53px'
          }}
          onClick={() => handleClick(item)}
        >         
          {category === "Rating (Optional)" && item !== "Any star rating" && <StarIcon />} 
          {item}
        </Button>
      );
    });
  };

  //Render buttons in two columns
  const renderTwoColumns = (items, category) => {
    const halfLength = Math.ceil(items.length / 2);
    const firstColumn = items.slice(0, halfLength);
    const secondColumn = items.slice(halfLength);

    return (
      <>
        <Grid item xs={6}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {renderButtons(firstColumn, category)}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {renderButtons(secondColumn, category)}
          </div>
        </Grid>
      </>
    );
  };

  const renderCategory = (title, items) => {
    return (
      <>
        <Grid item xs={12}>
          <Typography
            variant="p"
            color="text.secondary"
            align="left"
            fontFamily={'Inter'}
            fontWeight={400}
            fontSize={'16px'}
            lineHeight={'21px'}
            letterSpacing={'-0.32px'}
            sx={{
              color: 'black'
            }}
          > {title}
          </Typography>
        </Grid>

        {renderTwoColumns(items, title)}
      </>
    );
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center" >
      <Grid container spacing={2}>
        {renderCategory("Cuisine", options.cuisine)}
        {/* {renderCategory("Dietary Restrictions (Optional)", options.dietaryRestrictions)} */}
        {renderCategory("Price Range (per person)", options.priceRange)}
        {renderCategory("Rating (Optional)", options.rating)}
      </Grid>
    </Box>
  );
};

export default RestaurantOptions;