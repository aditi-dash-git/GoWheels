import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import InfoModal from "./InfoModal";

const Footer = () => {
  const { setShowModal } = useAppContext();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b"
        >
          <div>
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              src={assets.logo}
              alt="logo"
              className="h-8 md:h-9"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-80 mt-3"
            >
              Premium car rental service with a wide selection of luxury and
              everyday vehicles for all your driving needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3 mt-6"
            >
              <a href="#"><img src={assets.facebook_logo} alt="" className="w-5 h-5" /></a>
              <a href="#"><img src={assets.instagram_logo} alt="" className="w-5 h-5" /></a>
              <a href="#"><img src={assets.twitter_logo} alt="" className="w-5 h-5" /></a>
              <a href="#"><img src={assets.gmail_logo} alt="" className="w-5 h-5" /></a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-between w-1/2 gap-8"
          >
            {/* Quick Links */}
            <div>
              <h2 className="text-base font-medium text-gray-800 uppercase">
                Quick Links
              </h2>
              <ul className="mt-3 flex flex-col gap-1.5">
                <li><a href="#">Home</a></li>
                <li><a href="/cars">Browse Cars</a></li>
                <li><a href="#">List Your Car</a></li>
                <li>
                  <button
                    onClick={() => setShowModal("about")}
                    className="text-left hover:text-blue-600"
                  >
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h2 className="text-base font-medium text-gray-800 uppercase">
                Resources
              </h2>
              <ul className="mt-3 flex flex-col gap-1.5">
                <li>
                  <button
                    onClick={() => setShowModal("help")}
                    className="text-left hover:text-blue-600"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowModal("terms")}
                    className="text-left hover:text-blue-600"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowModal("privacy")}
                    className="text-left hover:text-blue-600"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowModal("insurance")}
                    className="text-left hover:text-blue-600"
                  >
                    Insurance
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-base font-medium text-gray-800 uppercase">
                Contact
              </h2>
              <ul className="mt-3 flex flex-col gap-1.5">
                <li>📍 Unit-1, Bhubaneswar, Odisha – 751001</li>
                {/* <li></li> */}
                <li>📞 +91 9125849569</li>
                <li>✉️ gowheels@outlook.com</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
        >
          <p>© {new Date().getFullYear()} GoWheels. All rights reserved.</p>
          <ul className="flex items-center gap-4">
            <li><a href="#">Privacy</a></li>
            <li>|</li>
            <li><a href="#">Terms</a></li>
            <li>|</li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Shared modal for About, Help, Terms, etc. */}
      <InfoModal />
    </>
  );
};

export default Footer;
