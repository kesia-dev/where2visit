import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCuisine, addPrice, addRating } from "../features/userOptions/optionsSlice";
import { Box, Button, Grid, Typography } from "@mui/material";

import "../styling/RestaurantOptions.css";

const RestaurantOptions = () => {

  const dispatch = useDispatch();

  const options = {
    cuisine: ["No preference", "French", "Italian", "Chinese", "Thai", "Greek", "Mexican", "Japanese", "Indian", "American"],
    // dietaryRestrictions: ["Keto", "Vegan", "Paleo", "Kosher", "Vegetarian", "Gluten Free"],
    priceRange: ["< $50", "$50 - $100", "$100 - $150", "$150+"],
    rating: ["Any star rating", "⭐3+", "⭐4+", "⭐5"]
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

    //Add state according to category
    const handleClick = (value) => {
      switch (category) {
        case "Cuisine":
          dispatch(addCuisine(value));
          break;
        case "Price Range (per person)":
          dispatch(addPrice(value));
          break;
        case "Rating (Optional)":
          dispatch(addRating(value));
          break;
        default:
          break;
      }
    };

    return items.map((item, index) => {

      const key = stateKeys[category];
      const isAdded = Array.isArray(states[key]) ? states[key].includes(item) : states[key] === item;

      return (
        <Button
          key={index}
          variant="outlined"
          style={{
            backgroundColor: isAdded ? '#153a50' : '#aed3e9',
            color: isAdded ? '#aed3e9' : '#153a50',
            border: 'none'
          }}
          sx={{
            marginTop: 2,
            borderRadius: '10px',
            textTransform: 'none',
            maxWidth: '40vw',
            minHeight: '5vh'
          }}
          onClick={() => handleClick(item)}
        >
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
          > {title}:
          </Typography>
        </Grid>

        {renderTwoColumns(items, title)}
      </>
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" >
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