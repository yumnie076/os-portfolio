"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("./socket");
// Route imports
const projects_1 = __importDefault(require("./routes/projects"));
const reactions_1 = __importDefault(require("./routes/reactions"));
const chat_1 = __importDefault(require("./routes/chat"));
const visitors_1 = __importDefault(require("./routes/visitors"));
const admin_1 = __importDefault(require("./routes/admin"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express_1.default.json());
// Routes
app.use('/api/projects', projects_1.default);
app.use('/api/reactions', reactions_1.default);
app.use('/api/chat', chat_1.default);
app.use('/api/visitors', visitors_1.default);
app.use('/api/admin', admin_1.default);
// Socket setup
(0, socket_1.setupSocket)(io);
// Database connection & Server start
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/os-portfolio';
mongoose_1.default
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
//# sourceMappingURL=app.js.map