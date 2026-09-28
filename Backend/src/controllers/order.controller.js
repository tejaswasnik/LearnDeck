import Razorpay from "razorpay";
import crypto from "crypto";
import config from "../config/config.js";
import orderModel from "../models/order.model.js";
import courseModel from "../models/course.model.js";
import userModel from "../models/user.model.js";

const razorpay = new Razorpay({
    key_id: config.razorpayKeyId,
    key_secret: config.razorpayKeySecret,
});

export async function createOrderController(req, res) {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (!course.isPublished) {
            return res.status(400).json({
                success: false,
                message: "This course is not available for purchase",
            });
        }


        if (course.enrolledStudents.includes(userId)) {
            return res.status(409).json({
                success: false,
                message: "You are already enrolled in this course",
            });
        }

        if (course.price.amount === 0) {
            course.enrolledStudents.push(userId);
            await course.save();

            await userModel.findByIdAndUpdate(userId, {
                $addToSet: { enrolledCourses: courseId },
            });

            return res.status(200).json({
                success: true,
                message: "Enrolled successfully (free course)",
                free: true,
            });
        }


        const currencyStr = (course.price.currency || "INR").toUpperCase();
        const validCurrency = currencyStr.length >= 3 ? currencyStr.substring(0, 3) : "INR";

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(course.price.amount * 100),
            currency: validCurrency,
            receipt: `rcpt_${courseId.toString().slice(-6)}_${Date.now()}`,
            notes: {
                courseId: courseId.toString(),
                userId: userId.toString(),
            },
        });

        await orderModel.create({
            userId,
            courseId,
            razorpayOrderId: razorpayOrder.id,
            amount: course.price.amount,
            currency: validCurrency,
            status: "created",
        });


        return res.status(201).json({
            success: true,
            order: {
                id: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
            },
            key: config.razorpayKeyId,
            course: {
                title: course.courseTitle,
                thumbnail: course.courseThumbnail,
            },
        });
    } catch (error) {
        console.error("Create order error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create order",
        });
    }
}

export async function verifyPaymentController(req, res) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing payment verification data",
            });
        }

        const expectedSignature = crypto
            .createHmac("sha256", config.razorpayKeySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed — invalid signature",
            });
        }

        const order = await orderModel.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (order.status === "paid") {
            return res.status(200).json({
                success: true,
                message: "Payment already verified",
            });
        }

        order.razorpayPaymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;
        order.status = "paid";
        await order.save();

        // 3. Enroll the student
        await courseModel.findByIdAndUpdate(order.courseId, {
            $addToSet: { enrolledStudents: order.userId },
        });

        await userModel.findByIdAndUpdate(order.userId, {
            $addToSet: { enrolledCourses: order.courseId },
        });

        return res.status(200).json({
            success: true,
            message: "Payment verified and enrolled successfully",
        });
    } catch (error) {
        console.error("Verify payment error:", error);
        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
        });
    }
}


export async function webhookController(req, res) {
    try {
        const webhookSecret = config.razorpayKeySecret;
        const receivedSignature = req.headers["x-razorpay-signature"];

        const expectedSignature = crypto
            .createHmac("sha256", webhookSecret)
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (expectedSignature !== receivedSignature) {
            console.error("Webhook signature mismatch");
            return res.status(400).json({ success: false });
        }

        const event = req.body.event;
        const payment = req.body.payload?.payment?.entity;

        if (event === "payment.captured" && payment) {
            const order = await orderModel.findOne({
                razorpayOrderId: payment.order_id,
            });

            if (order && order.status !== "paid") {
                order.razorpayPaymentId = payment.id;
                order.status = "paid";
                await order.save();

                await courseModel.findByIdAndUpdate(order.courseId, {
                    $addToSet: { enrolledStudents: order.userId },
                });

                await userModel.findByIdAndUpdate(order.userId, {
                    $addToSet: { enrolledCourses: order.courseId },
                });
            }
        }

        // Always respond 200 to Razorpay so it doesn't retry
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return res.status(500).json({ success: false });
    }
}