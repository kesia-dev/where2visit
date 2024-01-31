const express = require('express');
require('dotenv').config();
const connectToDatabase = require('./config/db');
const authRouter = require('./routes/authRoute');
const createPlan = require('./routes/createPlanRoute');
const getPlanById = require('./routes/getPlanByIdRoute');
const  restaurants = require('./routes/googleMapsApiRoute');

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 3000;


connectToDatabase();

// API routes
app.use('/auth', authRouter);
app.use('/plan', createPlan);
app.use('/plan', getPlanById);
app.use('/maps', restaurants);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port # ${port}`);
});