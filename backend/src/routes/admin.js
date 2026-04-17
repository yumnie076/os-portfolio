"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = (0, express_1.Router)();
router.post('/login', rateLimiter_1.strictLimiter, (req, res) => {
    const { password } = req.body;
    // Simplistic auth for initial setup
    if (password === process.env.ADMIN_PASSWORD) {
        const token = jsonwebtoken_1.default.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '15m' });
        res.json({ token });
    }
    else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map