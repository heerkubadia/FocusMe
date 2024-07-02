import React, { useEffect } from "react";
import Camera from "../components/Camera";
import { motion } from "framer-motion";

import "/Users/heerkubadia/Desktop/FocusMe/FocusMeFrontend/src/css/HomePage.css";
const Home = () => {
  return (
    <div className="home-container">
      
      <motion.div
        className="welcome-message"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to FocusMe!
      </motion.div>
      <motion.div
        className="description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <p>
          Hello, I'm <strong>Heer Kubadia</strong>, an undergraduate student
          specializing in Computer Science and Engineering at{" "}
          <strong>IIT Gandhinagar</strong>.
        </p>
        <p>
          <strong>FocusMe</strong> is my innovative creation designed to
          simplify your photo management. You can effortlessly upload real-time
          images or choose photos from your device, and our advanced machine
          learning model will accurately fetch only those images that feature
          your face.
        </p>
        <p>
          Click your real time pictures <strong>down below</strong> and dive
          into a seamless experience with <strong>FocusMe</strong>, where
          technology meets convenience!
        </p>
      </motion.div>
     
      <Camera />
     
    </div>
  );
};

export default Home;
