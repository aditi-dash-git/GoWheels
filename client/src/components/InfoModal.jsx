import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";

const MODAL_CONTENT = {
  about: {
    title: "About Us",
    content:
      "GoWheels is Odisha’s premier car rental service, committed to making travel convenient, comfortable, and affordable. Whether you are a tourist exploring the beauty of Odisha or a local needing reliable transport, our wide range of vehicles, flexible rental plans, and customer-first approach make us your trusted travel companion.",
  },
  help: {
    title: "Help Center",
    content:
      "For any assistance, reach out to our support team at gowheels@outlook.com or call 1800-010-220.",
  },
  terms: {
    title: "Terms of Service",
    content:
      "By accessing and using GoWheels, you agree to our terms and conditions, which govern rental policies, driver requirements, payment obligations, and cancellation or refund policies. Please read them carefully to ensure a smooth rental experience.",
  },
  privacy: {
    title: "Privacy Policy",
    content:
      "Your privacy matters to us. GoWheels collects and processes your personal information securely, only for service delivery purposes. We do not sell or misuse your data and comply with applicable data protection laws of India.",
  },
  insurance: {
    title: "Insurance Info",
    content:
      "All GoWheels vehicles come with standard insurance coverage. For added peace of mind, customers can opt for extended damage protection or personal accident cover during checkout. Details are available in the rental agreement.",
  },
};

const InfoModal = () => {
  const { showModal, setShowModal } = useAppContext();

  const handleClose = () => setShowModal(null);

  const data = MODAL_CONTENT[showModal];
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="bg-white p-6 md:p-8 rounded-xl shadow-xl w-[90%] max-w-lg text-center"
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100vh", opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {data.title}
          </h2>
          <p className="text-gray-600 text-sm mb-6">{data.content}</p>
          <button
            onClick={handleClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InfoModal;
