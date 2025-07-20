import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Priya Ranjan",
      location: "Bhubaneswar, Odisha",
      image: assets.testimonial_image_1,
      testimonial:
        "Booking with GoWheels was super convenient! The car was in great condition and perfect for my family trip to Puri. Highly recommend!",
    },
    {
      name: "Sourav Das",
      location: "Cuttack, Odisha",
      image: assets.testimonial_image_2,
      testimonial:
        "Excellent service and prompt support. I rented a car for my wedding functions and it was a smooth experience. GoWheels is now my go-to!",
    },
    {
      name: "Ananya Patra",
      location: "Sambalpur, Odisha",
      image: assets.testimonial_image_3,
      testimonial:
        "Very professional and transparent pricing. The car was clean and well-maintained. Great option for traveling across Odisha!",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subtitle="See why people across Odisha trust GoWheels for safe and reliable car rentals."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img src={assets.star_icon} alt="star-icon" key={index} />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
