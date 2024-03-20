const express = require('express');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();
const connectToDatabase = require('./config/db');
const authRouter = require('./routes/authRoute');
const getPlanById = require('./routes/getPlanByIdRoute');
const restaurants = require('./routes/googleMapsApiRoute');
const restaurantsSearchFromYelp = require('./routes/yelpSearchApiRoute');
const voteRestaurant = require('./routes/votingRoute');
const VotingTimerService = require('./services/votingTimerService');

const app = express();
const cors = require('cors');
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3000','http://where2visit.com/']
};
app.use(cors(corsOptions))
const port = process.env.PORT || 3000;
// Create HTTP server:
const server = http.createServer(app);
// Add WebSocket support:
const wss = new WebSocket.Server({ server });
// Instantiate VotingTimerService with the web socket server:
const votingTimerService = new VotingTimerService(wss);
// Routes utilizing the VotingTimerService:
const joinPlan = require('./routes/joinPlanRoute')(votingTimerService);
const createPlan = require('./routes/createPlanRoute')(votingTimerService);

// Handle WebSocket connections:
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      if (!parsedMessage.action) {
        console.error('Received a message without an action type:', parsedMessage);
        return;
      }
      // Determine the action to take based on the message type:
      switch (parsedMessage.action) {
        case 'start-timer':
          // Start the timer only if it's not already running:
          if (!votingTimerService.isTimerRunning(parsedMessage.planCode)) {
            votingTimerService.startTimer(parsedMessage.planCode, parsedMessage.duration || 3600 );
          }
          break;
        case 'end-timer':
          // Eventually to End the timer,once login and registration is settled, validation that the sender is the host can be included in the logic below:
          votingTimerService.endTimer(parsedMessage.planCode);
          break;
          default:
            console.log('Received an unknown action type in the ws server:', parsedMessage);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

connectToDatabase();

// API routes
app.use('/auth', authRouter);
app.use('/plan', createPlan);
app.use('/plan', getPlanById);
app.use('/plan', voteRestaurant);
app.use('/plan', joinPlan);
app.use('/maps', restaurants);
app.use('/yelp', restaurantsSearchFromYelp);

// Start the server to ensure both HTTP and WebSocket requests are handled:
server.listen(port, () => {
  console.log(`Server is running on port # ${port}`);
});