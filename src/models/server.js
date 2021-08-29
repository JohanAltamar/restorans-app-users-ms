const express = require('express');
const cors = require('cors');

// Routes
const authoutes = require('../routes/auth.routes');
// Database Connection
const dbConnection = require('../config/database');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.apiVersion = process.env.API_VERSION || 'v1';
    this.appRoutes = {
      auth: `/api/${this.apiVersion}/auth`,
    }

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.appRoutes.auth, authoutes);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
