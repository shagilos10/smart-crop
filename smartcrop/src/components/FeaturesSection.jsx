import React from "react";
import { GiFarmer } from "react-icons/gi";
import CountUp from "react-countup";

const FeaturesSection = () => {
  const features = [
    { title: "Farmer", number: 100 },
    { title: "Sponsers", number: 250 },
    { title: "User", number: 500 },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 w-screen place-items-center gap-6 px-10 pb-20">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white items-center justify-center grid grid-cols-2 p-2  border-2 border-lime-500 rounded-lg max-w-56 shadow-md text-center"
        >
          <div className="relative">
            <div className="h-14 w-14 border-4 rounded-full border-t-lime-300 border-b-lime-300 transition-transform duration-500 animate-loading border-l-transparent border-r-transparent"></div>
            <GiFarmer color="lime" size={40} className="absolute top-2 left-2" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-600">
              <CountUp
                start={0}
                end={feature.number}
                duration={2} // Duration of the counting animation
                separator=","
              />
              + {feature.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturesSection;