import React, { useState } from 'react';
import { Button, Row, Col, Card, Radio, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../style/drivingCheck.css';
import { motion } from 'framer-motion';
import { DoubleRightOutlined } from '@ant-design/icons';

const DrivingCheck = () => {
  const navigate = useNavigate();

  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);

  const yesImg = 'https://cdn-icons-png.flaticon.com/512/190/190411.png';
  const noImg  = 'https://cdn-icons-png.flaticon.com/512/753/753345.png';
  const tickImg = 'https://cdn-icons-png.flaticon.com/512/845/845646.png';

  const handleNext = () => {
    const drivingAnswers = {
      hasDriven: q1,          // 'yes' | 'no'
      drivenVehicleType: q2, // only if q1 === 'yes'
      willingnessToDrive: q3 // only if q1 === 'no'
    };

    localStorage.setItem(
      'drivingCheckAnswers',
      JSON.stringify(drivingAnswers)
    );

    navigate('/intro');
  };

return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: 10 }}>
      <Col xs={24} sm={22} md={16} lg={12} xl={10}>
        <Card className="drive-card">

          {/* TITLE */}
          <div className="drive-header">
            <h2>Before We commence the Challenge</h2>
            <p>
              The people of SafeTown need to know a few things from their Hero
            </p>
          </div>

          {/* Q1 */}
          <div className="drive-section text-center">
            <p className="question-text">
              Have you ever driven any vehicle (even for fun)?
            </p>

            <div className="icon-options">
              <div
                className={`icon-circle ${q1 === 'yes' ? 'active-yes' : ''}`}
                onClick={() => {
                  setQ1('yes');
                  setQ3(null);
                }}
              >
                <img src={yesImg} alt="Yes" />
                {q1 === 'yes' && <img src={tickImg} className="tick" alt="tick" />}
              </div>

              <div
                className={`icon-circle ${q1 === 'no' ? 'active-no' : ''}`}
                onClick={() => {
                  setQ1('no');
                  setQ2(null);
                }}
              >
                <img src={noImg} alt="No" />
                {q1 === 'no' && <img src={tickImg} className="tick" alt="tick" />}
              </div>
            </div>
          </div>

          {/* Q2 */}
          {q1 === 'yes' && (
            <div className="drive-section">
              <p className="question-text">
                If you answered "Yes", what kind of vehicle have you tried?
              </p>

              <Radio.Group onChange={(e) => setQ2(e.target.value)} value={q2}>
                <Space direction="vertical">
                  <Radio value="Motorcycle or Scooter">Motorcycle or Scooter</Radio>
                  <Radio value="Three-Wheeler">Three-Wheeler</Radio>
                  <Radio value="Car / Van">Car / Van</Radio>
                  <Radio value="Lorry / Bus / Other Big Vehicle">
                    Lorry / Bus / Other Big Vehicle
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          )}

          {/* Q3 */}
          {q1 === 'no' && (
            <div className="drive-section">
              <p className="question-text">
                If you answered "No", would you like to try driving?
              </p>

              <Radio.Group onChange={(e) => setQ3(e.target.value)} value={q3}>
                <Space direction="vertical">
                  <Radio value="Most Likely">Most Likely</Radio>
                  <Radio value="Not Sure / Maybe">Not Sure / Maybe</Radio>
                  <Radio value="Definitely No">Definitely No</Radio>
                </Space>
              </Radio.Group>
            </div>
          )}

          {/* BUTTON */}
          <div className="btn-center">
            <Button
              type="primary"
              className="drive-next-btn"
              disabled={!q1 || (q1 === 'yes' && !q2) || (q1 === 'no' && !q3)}
              onClick={handleNext}
            >
              Next
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                style={{ marginLeft: 6 }}
              >
                <DoubleRightOutlined />
              </motion.span>
            </Button>
          </div>

        </Card>
      </Col>
    </Row>
  );
};

export default DrivingCheck;
