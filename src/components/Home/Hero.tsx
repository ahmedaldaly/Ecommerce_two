"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
const Hero = () => {
  return (
    <AnimatePresence>
        
    <motion.div
    initial={{scale:0, opacity:0}}
    animate={{scale:1 , opacity:1}}
    exit={{scale:0, opacity:0}}
    transition={{duration:0.5}}
    className="w-[95%] overflow-hidden mx-auto min-h-[80vh] relative bg-[#FAEDEB] ">
      <div className="absolute left-10 max-sm:bottom-10 min-sm:top-40 z-10">
        <motion.h1
        initial={{x:-100 , opacity:0}}
        animate={{x:0 ,opacity:1}}
        transition={{duration:0.3 ,delay:0.5}}
        className="text-6xl font-bold">Slick. Modern.</motion.h1>
        <motion.h1
         initial={{x:-100 , opacity:0}}
         animate={{x:0 ,opacity:1}}
         transition={{duration:0.3 ,delay:1}}
        className="text-6xl font-bold"> Awesome</motion.h1>
        <motion.button
         initial={{x:-100 , opacity:0}}
         animate={{x:0 ,opacity:1}}
         transition={{duration:0.3 ,delay:1.5}}
        className="w-38 h-10 mt-5 cursor-pointer hover:rounded-3xl duration-150 bg-black text-white ">
          Shop Collection
        </motion.button>
      </div>

      <motion.img
       initial={{x:100 , opacity:0}}
       animate={{x:0 ,opacity:1}}
       transition={{duration:0.3 ,delay:0.5}}
        src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/hero-bg.png"
        alt=""
        className="absolute top-0 max-sm:top-10 max-sm:scale-100 right-10 scale-75"
        />
      <motion.img
       initial={{x:100 , opacity:0}}
       animate={{x:0 ,opacity:1}}
       transition={{duration:0.3 ,delay:1}}
        src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/hero.png"
        alt=""
         className="absolute bottom-0  right-10 max-sm:right-0 h-full"
      />
    </motion.div>
        </AnimatePresence>
  );
};

export default Hero;
