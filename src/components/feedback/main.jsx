import React from 'react';
import { Card, Button } from 'antd';
import { FormOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import '../../style/feedback.css';
import FeedbackImg from '../../assets/Feedback.png'

const Feedback = () => {
  const handleFeedbackClick = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSfC0c6AC4DrUbcZi5fP4g5yR48PWYU5b1FeE47Ha2JD81SsMw/viewform',
      '_blank'
    );
  };

  return (
    <div className="feedback-container">
      <div className="feedback-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="feedback-card">
            <div className="feedback-content">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <img src={FeedbackImg} className='feedback-img'></img>
                {/* <FormOutlined className="feedback-icon" /> */}
              </motion.div>
              
              <h1 className="feedback-title">We Value Your Feedback!</h1>
              
              <p className="feedback-description">
                Help us improve the Road Safety Quiz experience. Your thoughts and suggestions 
                are incredibly important to us. Take a moment to share your feedback!
              </p>

              <Button
                type="primary"
                size="large"
                onClick={handleFeedbackClick}
                className="feedback-button"
              >
                Fill Feedback Form
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                >
                  <ArrowRightOutlined />
                </motion.span>
              </Button>

              <p className="feedback-note">
                It only takes 2-3 minutes and helps us serve you better! 💜
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;