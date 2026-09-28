import { useState } from "react";
import { createOrder, verifyPayment } from "../service/payment.api.js";

const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuyCourse = async (courseId, user, onSuccess) => {
    try {
      setIsProcessing(true);

      // 1. Create order on backend
      const data = await createOrder(courseId);

      // Handle free course enrollment (no Razorpay needed)
      if (data.free) {
        onSuccess?.();
        return;
      }

      // 2. Open Razorpay checkout modal
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "LearnDeck",
        description: data.course.title,
        image: data.course.thumbnail || "/favicon.png",
        order_id: data.order.id,
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#7ED321",
        },
        handler: async function (response) {
          // 3. Verify payment on backend
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            onSuccess?.();
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert(
              "Payment verification failed. Contact support if money was deducted.",
            );
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert(error?.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return {
    handleBuyCourse,
    isProcessing,
  };
};

export default usePayment;
