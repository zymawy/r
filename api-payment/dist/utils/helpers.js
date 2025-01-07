"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = void 0;
const roles = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
};
const hasPermission = (role, action) => {
    if (!Object.keys(roles).includes(role)) {
        return false; // Role is invalid
    }
    return roles[role]?.includes(action) ?? false;
};
exports.hasPermission = hasPermission;
