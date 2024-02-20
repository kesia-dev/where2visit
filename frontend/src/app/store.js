import { configureStore } from '@reduxjs/toolkit'

import optionsReducer from '../features/userOptions/optionsSlice';

export default configureStore({
  reducer: {
    options: optionsReducer
  }
});