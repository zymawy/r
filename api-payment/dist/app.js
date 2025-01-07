"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use('/api/payment', paymentRoutes_1.default);
// Error Handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
