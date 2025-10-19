// routes/otpRoutes.js
import express from "express";
import sgMail from "@sendgrid/mail";

const router = express.Router();
let generatedOTP = null;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ✅ Send OTP
router.post("/send", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email required");

  generatedOTP = Math.floor(100000 + Math.random() * 900000);

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: "Your OTP Code",
    text: `Your OTP is ${generatedOTP}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("SendGrid error:", err);
  if (err.response) console.error(err.response.body);
  res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
});

// ✅ Verify OTP
router.post("/verify", (req, res) => {
  const { otp } = req.body;

  if (parseInt(otp) === generatedOTP) {
    generatedOTP = null; // 🔐 Invalidate OTP after successful verification
    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

export default router;
