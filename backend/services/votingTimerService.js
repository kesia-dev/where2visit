const WebSocket = require('ws');
const Plan = require('../models/create-plan');

class VotingTimerService {
  constructor(webSocketServer) {
    this.webSocketServer = webSocketServer;
    this.timer = null;
    this.duration = 0; 
    this.sessionActive = true;
    // Store the session data for each plan:
    this.sessions = {};
  }

  // Ensures session data exists for a given planCode:
  ensureSession(planCode) {
    if (!this.sessions[planCode]) {
      console.log('Initializing session for plan:', planCode);
      this.sessions[planCode] = {
        timer: null,
        duration: 0,
        sessionActive: true
      };
    }
  }

  reset(planCode) {
    // Ensure session exists before resetting:
    this.ensureSession(planCode);
    let session = this.sessions[planCode];
    if (session.timer) {
      clearInterval(session.timer);
      session.timer = null;
    }
    session.duration = 0;
    session.sessionActive = true;  
  }

  startTimer(planCode, duration) {
    this.ensureSession(planCode);
    let session = this.sessions[planCode];
    session.duration = duration;
    session.timer = setInterval(() => this.tick(planCode), 1000);
    session.sessionActive = true;
  }

  tick(planCode) {
    let session = this.sessions[planCode];
    if (!session.sessionActive) {
      console.log('Skipping tick for inactive session:', planCode);
      return;
    }
		// Decrement the duration and broadcast the time left:
    session.duration -= 1;
		// If the duration is less than or equal to 0, end the timer:
    if (session.duration <= 0) {
      this.endTimer(planCode);
    } else {
      this.broadcastTimeLeft(planCode);
    }
  }

  broadcastTimeLeft(planCode) {
    let session = this.sessions[planCode];
		// Broadcast the time left to all connected clients (potential future feature):
    const message = { type: 'time-left', duration: session.duration, planCode };
    this.webSocketServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
    });
  }

  async endTimer(planCode) {
    console.log('Attempting to end the timer for plan:', planCode);
    let session = this.sessions[planCode];
    if (!session) {
      console.log(`No session found for planCode: ${planCode} to end timer.`);
    }
    
    console.log('Ending timer for plan:', planCode);
    clearInterval(session.timer);
    session.timer = null;
    session.sessionActive = false;
    this.broadcastEndOfVoting(planCode);
  
    try {
      await Plan.updateOne({ roomId: planCode }, { isActive: false });
      console.log(`Timer and session ended for planCode: ${planCode}`);
    } catch (error) {
      console.error('Error updating plan session status in database:', error);
    }
  } 
  

  broadcastEndOfVoting(planCode) {
    let session = this.sessions[planCode];
    // Broadcast a message to all connected clients that the voting has ended (potential future feature):
		const message = { type: 'end-voting', planCode };
    this.webSocketServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

	isTimerRunning(planCode) {
    this.ensureSession(planCode);
		// Return true if the timer is running, false otherwise:
		return !!this.sessions[planCode].timer;
	}

  isSessionActive(planCode) {
    this.ensureSession(planCode);
    return this.sessions[planCode].sessionActive;
  }
}

module.exports = VotingTimerService;
