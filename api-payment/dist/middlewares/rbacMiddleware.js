"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const helpers_1 = require("../utils/helpers");
const authorize = (role, action) => (req, res, next) => {
    const userRole = req.user?.role;
    // Check if userRole exists and is valid
    if (!userRole || !(0, helpers_1.hasPermission)(userRole, action)) {
        res.status(403).send('Access Denied');
        return;
    }
    next();
};
exports.authorize = authorize;
