"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const socket_io_1 = require("socket.io");
const Visitor_1 = __importDefault(require("../models/Visitor"));
const setupSocket = (io) => {
    let activeVisitors = 0;
    io.on('connection', async (socket) => {
        console.log('Visitor connected:', socket.id);
        activeVisitors++;
        // Broadcast visitor count
        io.emit('visitor-count', activeVisitors);
        // Track visitor in DB
        try {
            await Visitor_1.default.create({ socketId: socket.id, firstSeen: new Date(), lastSeen: new Date(), pageViews: 1 });
        }
        catch (error) {
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
                await Visitor_1.default.findOneAndUpdate({ socketId: socket.id }, { lastSeen: new Date() });
            }
            catch (error) {
                console.error('Error updating visitor last seen:', error);
            }
        });
    });
};
exports.setupSocket = setupSocket;
//# sourceMappingURL=index.js.map