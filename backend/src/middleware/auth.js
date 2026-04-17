"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token expired or invalid' });
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json({ error: 'Authorization header missing' });
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth.js.map