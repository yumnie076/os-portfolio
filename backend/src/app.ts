import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { setupSocket } from './socket';

// Route imports
import projectRoutes from './routes/projects';
import reactionRoutes from './routes/reactions';
import chatRoutes from './routes/chat';
import visitorRoutes from './routes/visitors';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/reactions', reactionRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/admin', adminRoutes);

// Socket setup
setupSocket(io);

// Database connection & Server start
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/os-portfolio';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
