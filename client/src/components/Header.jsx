import React from "react";
import { motion } from "framer-motion";

function Header() {
  const text = "Tech and Lifestyle";
  const chars = text.split("");
  return (
    <div className="text-center pt-2 lg:mt-[0%] mt-[4%] lg:w-[30%] mx-auto">
      <p className="text-sm color black mb-3"></p>
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        ✨ Welcome to my blog ✨
      </motion.p>
      <h2 className="text-3xl text-[#262630] header mt-4">
        {chars.map((char, index) => (
          <motion.span
            key={index}
            style={{ display: "inline" }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            }}
            initial={{ opacity: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            {char}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}

export default Header;
