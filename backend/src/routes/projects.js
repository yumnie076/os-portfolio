"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Project_1 = __importDefault(require("../models/Project"));
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = (0, express_1.Router)();
router.get('/', rateLimiter_1.apiLimiter, async (req, res) => {
    try {
        const projects = await Project_1.default.find().sort({ createdAt: -1 });
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});
router.get('/:id', rateLimiter_1.apiLimiter, async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (!project)
            return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});
exports.default = router;
//# sourceMappingURL=projects.js.map