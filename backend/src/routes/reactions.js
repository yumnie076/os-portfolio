"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Reaction_1 = __importDefault(require("../models/Reaction"));
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = (0, express_1.Router)();
router.get('/:projectId', rateLimiter_1.apiLimiter, async (req, res) => {
    try {
        const reactions = await Reaction_1.default.find({ projectId: req.params.projectId });
        res.json(reactions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch reactions' });
    }
});
router.post('/', rateLimiter_1.apiLimiter, async (req, res) => {
    try {
        const { projectId, emoji, visitorId } = req.body;
        const newReaction = await Reaction_1.default.create({ projectId, emoji, visitorId });
        res.status(201).json(newReaction);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create reaction' });
    }
});
exports.default = router;
//# sourceMappingURL=reactions.js.map