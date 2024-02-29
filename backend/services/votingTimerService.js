const WebSocket = require('ws');
const Plan = require('../models/create-plan');

class VotingTimerService {
  constructor(webSocketServer) {
    this.webSocketServer = webSocketServer;
    this.timer = null;
    this.duration = 0; 
    this.sessionActive = true;
    this.reset();
  }

  reset() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.duration = 0;
    this.sessionActive = true;  
  }

  startTimer(duration) {
    if (!this.sessionActive) {
      console.log('Session is ended.');
      return;
    }
    this.duration = duration;
    this.timer = setInterval(() => this.tick(), 1000);
    this.sessionActive = true;
  }

  tick() {
		// Decrement the duration and broadcast the time left:
    this.duration -= 1;
    this.broadcastTimeLeft();
		// If the duration is less than or equal to 0, end the timer:
    if (this.duration <= 0) {
      this.endTimer();
    }
  }

  broadcastTimeLeft() {
		// Broadcast the time left to all connected clients:
    const message = { type: 'time-left', duration: this.duration };
    this.webSocketServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
    });
  }

  async endTimer(planCode) {
    clearInterval(this.timer);
    this.timer = null;
    this.broadcastEndOfVoting();
    this.sessionActive = false;

    // Update the plan in the database to reflect that the voting has ended:
    try {
      await Plan.updateOne({ roomId: planCode }, { isActive: false });
    } catch (error) {
      console.error('Error updating plan session status:', error);
    }
  }

  broadcastEndOfVoting() {
    // Broadcast a message to all connected clients that the voting has ended:
		const message = { type: 'end-voting' };
    this.webSocketServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

	isTimerRunning() {
		// Return true if the timer is running, false otherwise:
		return !!this.timer;
	}

  isSessionActive() {
    return this.sessionActive;
  }
}

module.exports = VotingTimerService;
