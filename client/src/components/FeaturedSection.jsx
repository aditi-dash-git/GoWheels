import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const FeaturedSection = () => {
  const navigate = useNavigate();

  const { cars } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}>
        <Title
          title="Featured Vehicles"
          subtitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 sm:gris-cols-2 lg:grid-cols-3 gap-8 mt-18"
      >
        {
          cars.slice(0, 6).map((car) => (
            <motion.div
              initial={{ opacity: 0,scale:0.95}}
              whileInView={{ opacity: 1,scale:1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              key={car._id}
            >
              <CarCard car={car} />
            </motion.div>
          ))
          //slice(0,6) is used to display maximum 6 car data in the home page
        }
      </motion.div>

      <motion.button
         initial={{opacity:0, y:20}}
    whileInView={{opacity:1, y:0}}
    transition={{duration: 0.4, delay: 0.6 }}

        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer "
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
      >
        {/* after coming to this page we need to scroll the page to the top */}
        Explore all cars <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>

      {/* when this button is clicked it ll display a new page where all the cars are displayed */}
    </motion.div>
  );
};

export default FeaturedSection;
