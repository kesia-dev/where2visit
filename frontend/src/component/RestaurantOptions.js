import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

import "../styling/RestaurantOptions.css";

const RestaurantOptions = () => {

  const options = {
    cuisine: ["No preference", "French", "Italian", "Chinese", "Thai", "Greek", "Mexican", "Japanese", "Indian", "American"],
    dietaryRestrictions: ["Keto", "Vegan", "Paleo", "Kosher", "Vegetarian", "Gluten Free"],
    priceRange: ["< $50", "$50 - $100", "$100 - $150", "$150+"],
    rating: ["Any star rating", "⭐3+", "⭐4+", "⭐5"]
  };

  const renderButtons = (items) => {
    return items.map((item, index) => (
      <Button
        key={index}
        variant="contained"
        color="primary"
        sx={{
          marginTop: 2,
          borderRadius: '100px',
          textTransform: 'none',
          minWidth: '15vw',
        }}
      >
        {item}
      </Button>
    ));
  };

  const renderTwoColumns = (items) => {
    const halfLength = Math.ceil(items.length / 2);
    const firstColumn = items.slice(0, halfLength);
    const secondColumn = items.slice(halfLength);

    return (
      <>
        <Grid item xs={6}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {renderButtons(firstColumn)}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {renderButtons(secondColumn)}
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

        {renderTwoColumns(items)}
      </>
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" style={{ margin: '15px 100px' }}>
      <Grid container spacing={2}>
        {renderCategory("Cuisine", options.cuisine)}
        {renderCategory("Dietary Restrictions (Optional)", options.dietaryRestrictions)}
        {renderCategory("Price Range (per person)", options.priceRange)}
        {renderCategory("Rating (Optional)", options.rating)}
      </Grid>
    </Box>
  );
};

export default RestaurantOptions;