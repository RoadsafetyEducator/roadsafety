import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { motion } from 'framer-motion';
import { DoubleRightOutlined } from '@ant-design/icons'; // Import the icon
import { useNavigate } from 'react-router-dom';
import '../../style/landing.css';

const Main = () => {
  const navigate = useNavigate();

  const topic = "The Journey Begins";
  const storyline = "Once upon a time, in a land far away, a great adventure awaited. This journey was unlike any other, filled with challenges and triumphs.";

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal starts open
  const [startAnimation, setStartAnimation] = useState(false); // Controls animation start
  const [isStorylineComplete, setIsStorylineComplete] = useState(false); // Flag to track storyline completion

  useEffect(() => {
    if (startAnimation && index < storyline.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(storyline.slice(0, index + 1));
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (index === storyline.length) {
      setShowCursor(false);
      setIsStorylineComplete(true); // Set the flag when storyline is complete
    }
  }, [index, storyline, startAnimation]);

  // Function to close modal and start animation
  const handleAccept = () => {
    setIsModalOpen(false);
    setStartAnimation(true); // Start animation after closing the modal
  };

  // Function to handle the "Next" button click
  const handleNext = () => {
    if (isStorylineComplete) {
      // Logic for next step after the storyline is complete
      // console.log("Storyline complete, move to the next step.");
      navigate('/zone');
    } else {
      setStartAnimation(true); // Ensure animation starts if it hasn't yet
    }
  };

  return (
    <>
      {/* Terms & Conditions Popup */}
      <Modal 
        title="Terms & Conditions" 
        open={isModalOpen} 
        onCancel={() => {}}
        footer={[
          <Button key="accept" className='accept-continue-btn' type="primary" onClick={handleAccept}>
            Accept & Continue
          </Button>
        ]}
        maskClosable={false} // Prevents clicking outside to close
        closable={false} // Hides the close button
      >
        <p>By using this application, you agree to our terms and conditions.</p>
        <p>Please make sure to read and understand them before proceeding.</p>
      </Modal>

      {/* Main Content */}
      <div className="container">
        <div className="box">
          <motion.h1 
            className="topic"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {topic}
            <span className="underline"></span>
          </motion.h1>
          <p className="storyline">
            {displayedText}
            {showCursor && startAnimation && <span className="cursor">|</span>}
          </p>

          {/* Next Button with DoubleRightOutlined Icon */}
          <div className="next-button-container">
            <Button 
              type="primary" 
              className="next-button" 
              onClick={handleNext}
              disabled={!isStorylineComplete}
            >
              Next 
              {/* Animate the icon with framer-motion */}
              {isStorylineComplete &&
              <motion.span 
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }} 
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <DoubleRightOutlined />
              </motion.span>
                }
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
