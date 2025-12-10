import React, { useState } from 'react';
import { Modal, Button, Row, Col, Card } from 'antd';
import { motion } from 'framer-motion';
import { DoubleRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../../style/landing.css';

const Main = () => {
  const navigate = useNavigate();

  const topic = "Welcome SafeTown Hero";

  const storyline = `**These are difficult times for the City of SafeTown**

Once This City was very safe for Pedestrians, Drivers, Cyclists, Passengers  
BUT in recent times the City faced with an eminent Threat.

Many are affected, injured due to various Road safety Violations

YOU !!! Our SafeTown Hero, Tasked with our fellow Heroes to save the City

Are you ready !!!!

Investigate risky road behaviors  
Choose the correct safety actions  
Identify the Traffic Rules and safe Behaviours  
Show your exceptional Emergency Response Skills

Then step in, stay alert, and…  
solve challenges, and become the SafeTown Road Safety Champion!  
Let's protect our SafeTown together!`;

  const termsText = `
### Responsible Use Notice
This game is created for educational and research purposes to promote safe road use among students.  
All information collected through this game will be used only to improve road safety education.

### Your Privacy is Protected
- No personal identity (name, school ID, contact details, or any information that identifies you) will be shared outside the research team.  
- All responses are confidential and used only in summary form.  
- Scores, answers, and choices are stored only for learning effectiveness analysis.

### No Commercial Use
- Your data will not be sold, shared, or used for advertising.  
- This game does not collect sensitive information beyond educational needs.

### Voluntary Participation
- You may stop playing at any time.  
- Your participation does not affect grades or school activities.

**By continuing, you agree to learn and play responsibly.**  
Let’s build a safer future together!
`;

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isStorylineComplete] = useState(true);

  const handleAccept = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    navigate('/zone');
  };

  return (
    <>
      {/* Terms & Conditions Modal */}
      <Modal
        style={{borderRadius:"15px"}}
        title="Terms & Conditions"
        open={isModalOpen}
        onCancel={() => {}}
        maskClosable={false}
        closable={false}
        footer={[
          <Button 
            key="accept" 
            type="primary" 
            className="accept-continue-btn"
            onClick={handleAccept}
          >
            Accept & Continue
          </Button>
        ]}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <ReactMarkdown>{termsText}</ReactMarkdown>
        </div>
      </Modal>

      {/* Main Content */}
      <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '10px' }}>
        <Col xs={24} sm={22} md={18} lg={12} xl={10}>
          <Card className="responsive-box">

            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <label style={{ fontWeight: "bold", fontSize: "16px" }}>
                {topic}
              </label>
            </div>

            {/* Storyline */}
            <div className="storyline" style={{ fontSize: '14px', textAlign: 'center' }}>
              <ReactMarkdown>{storyline}</ReactMarkdown>
            </div>

            {/* Next Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                type="primary"
                className="next-button flex-center-btn"
                onClick={handleNext}
                disabled={!isStorylineComplete}
              >
                Next
                {isStorylineComplete && (
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    <DoubleRightOutlined />
                  </motion.span>
                )}
              </Button>
            </div>

          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Main;
