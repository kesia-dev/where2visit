const WebSocket = require('ws');

class VotingTimerService {
  constructor(webSocketServer) {
    this.webSocketServer = webSocketServer;
    this.timer = null;
    this.duration = 0; 
  }

  startTimer(duration) {
		// If the timer is already running, clear it:
    this.endTimer();
    this.duration = duration;
    this.timer = setInterval(() => this.tick(), 1000);
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

  endTimer() {
		// Clear the timer and broadcast the end of voting:
    if(this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.broadcastEndOfVoting();
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
}

module.exports = VotingTimerService;
