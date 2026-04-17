"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Visitor_1 = __importDefault(require("../models/Visitor"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/stats', auth_1.authenticateJWT, async (req, res) => {
    try {
        const totalVisitors = await Visitor_1.default.countDocuments();
        res.json({ totalVisitors });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch visitor stats' });
    }
});
exports.default = router;
//# sourceMappingURL=visitors.js.map