import express from "express";
import {
    createOrderController,
    verifyPaymentController,
    webhookController,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", authMiddleware, createOrderController);
paymentRouter.post("/verify", authMiddleware, verifyPaymentController);

paymentRouter.post("/webhook", webhookController);

export default paymentRouter;