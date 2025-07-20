import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OtpVerification = ({ email, name, password, onSuccess }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      const { data } = await axios.post("/api/otp/verify", {
        email,
        otp,
      });

      if (data.success) {
        const res = await axios.post("/api/user/register", {
          name,
          email,
          password,
        });

        if (res.data.success) {
          toast.success("Account created!");
          onSuccess(res.data.token);
        } else {
          toast.error(res.data.message);
        }
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
      <div
        className="bg-white rounded-lg shadow-md p-6 w-80 sm:w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Verify OTP</h2>
        <input
          className="border border-gray-300 rounded w-full p-2 mb-4 outline-primary"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md"
          onClick={handleVerify}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
