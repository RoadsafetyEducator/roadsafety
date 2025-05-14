import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons'; // Import the icon
import { useNavigate } from 'react-router-dom';
import '../../style/zone.css';
import Zone1 from '../../assets/Zone1.png';
import Zone2 from '../../assets/Zone2.png';
import Zone3 from '../../assets/Zone3.png';
import Zone4 from '../../assets/Zone4.png';
import { motion } from 'framer-motion';

const { Meta } = Card;

const Main = () => {
  const navigate = useNavigate();

  const handleZoneClick = (zoneName) => {
    // Navigate to questionnaire with the zone name
    navigate(`/questionnaire?zone=${zoneName}`);
  };

  // Zone data for cleaner rendering
  const zones = [
    { id: "zone01", title: "Zone 01", image: Zone1 },
    { id: "zone02", title: "Zone 02", image: Zone2 },
    { id: "zone03", title: "Zone 03", image: Zone3 },
    { id: "zone04", title: "Zone 04", image: Zone4 }
  ];

  return (
    <div className='zone-container'>
      <div className="zone-wrapper">
        <Row gutter={[24, 24]} justify="center" align="middle">
          {zones.map((zone) => (
            <Col xs={24} sm={12} md={12} lg={6} xl={6} key={zone.id}>
              <Card
                hoverable
                cover={<img alt={zone.title} src={zone.image} />}
                className="zone-card"
                actions={[
                  <Button 
                    type="primary" 
                    onClick={() => handleZoneClick(zone.id)}
                    className="zone-button"
                  >
                    Select Zone
                                  <motion.span 
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }} 
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <DoubleRightOutlined />
              </motion.span>
                  </Button>
                ]}
              >
                <Meta title={zone.title} description="www.instagram.com" />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Main;