import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  term: "",
  planName: "",
  hostName: "",
  dateOfEvent: 0,
  timeOfEvent: 0,
  location: {
    latitude: 0,
    longitute: 0
  },
  radius: 0,
  cuisine: [],
  rating: 0,
  priceRange: "",
  numberOfResults: 0,
  numberOfMatches: 0
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    addTerm: (state, action) => {
      state.term = action.payload;
    },
    addPlanName: (state, action) => {
      state.planName = action.payload;
    },
    addHostName: (state, action) => {
      state.hostName = action.payload;
    },
    addDate: (state, action) => {
      state.dateOfEvent = action.payload;
    },
    addTime: (state, action) => {
      state.timeOfEvent = action.payload;
    },
    addLocation: (state, action) => {
      state.location = action.payload;
    },
    addRadius: (state, action) => {
      state.radius = action.payload;
    },
    addCuisine: (state, action) => {
      state.cuisine = [action.payload];
    },
    addRating: (state, action) => {
      state.rating = action.payload;
    },
    addPrice: (state, action) => {
      state.priceRange = action.payload;
    },
    addNumberOfResults: (state, action) => {
      state.numberOfResults = action.payload;
    },
    addNumberOfMatches: (state, action) => {
      state.numberOfMatches = action.payload;
    },

  }
});

export const {
  addTerm,
  addPlanName,
  addHostName,
  addDate,
  addTime,
  addLocation,
  addRadius,
  addCuisine,
  addRating,
  addPrice,
  addNumberOfResults,
  addNumberOfMatches
} = optionsSlice.actions;

export default optionsSlice.reducer;