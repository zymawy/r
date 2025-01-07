"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const rbacMiddleware_1 = require("../middlewares/rbacMiddleware");
const router = (0, express_1.Router)();
router.post('/process', (0, rbacMiddleware_1.authorize)('user', 'write'), paymentController_1.handlePayment);
exports.default = router;
