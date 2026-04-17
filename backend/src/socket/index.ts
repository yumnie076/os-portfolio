import { Server, Socket } from 'socket.io';
import Visitor from '../models/Visitor';

export const setupSocket = (io: Server) => {
  let activeVisitors = 0;

  io.on('connection', async (socket: Socket) => {
    console.log('Visitor connected:', socket.id);
    activeVisitors++;
    
    // Broadcast visitor count
    io.emit('visitor-count', activeVisitors);

    // Track visitor in DB
    try {
      await Visitor.create({ socketId: socket.id, firstSeen: new Date(), lastSeen: new Date(), pageViews: 1 });
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }

    // Handle new reaction
    socket.on('new-reaction', (data) => {
      // data: { projectId, emoji }
      // Broadcast to all other clients
      socket.broadcast.emit('reaction-added', { ...data, visitorId: socket.id });
    });

    socket.on('disconnect', async () => {
      console.log('Visitor disconnected:', socket.id);
      activeVisitors--;
      io.emit('visitor-count', activeVisitors);

      try {
        await Visitor.findOneAndUpdate({ socketId: socket.id }, { lastSeen: new Date() });
      } catch (error) {
        console.error('Error updating visitor last seen:', error);
      }
    });
  });
};
