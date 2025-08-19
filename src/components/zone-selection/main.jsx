import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import { DoubleRightOutlined, LockOutlined } from '@ant-design/icons'; 
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
  const [currentZone, setCurrentZone] = useState("zone01");

  // Read currentZone from localStorage when component loads
  useEffect(() => {
    const savedZone = localStorage.getItem("currentZone");
    if (savedZone) {
      setCurrentZone(savedZone);
    }
  }, []);

  const handleZoneClick = (zoneName) => {
    navigate(`/questionnaire?zone=${zoneName}`);
  };

  // Define zones order
  const zonesOrder = ["zone01", "zone02", "zone03", "zone04"];
  const currentIndex = zonesOrder.indexOf(currentZone);

  // Zone data with dynamic locked flag
  const zones = [
    { id: "zone01", title: "Zone 01", image: Zone1 },
    { id: "zone02", title: "Zone 02", image: Zone2 },
    { id: "zone03", title: "Zone 03", image: Zone3 },
    { id: "zone04", title: "Zone 04", image: Zone4 },
  ].map((zone, index) => ({
    ...zone,
    locked: index > currentIndex, // unlock up to currentZone
  }));

  return (
    <div className='zone-container'>
      <div className="zone-wrapper">
        <Row gutter={[24, 24]} justify="center" align="middle">
          {zones.map((zone) => (
            <Col xs={24} sm={12} md={12} lg={6} xl={6} key={zone.id}>
              <Card
                hoverable={!zone.locked}
                cover={<img alt={zone.title} src={zone.image} />}
                className={`zone-card ${zone.locked ? "locked-card" : ""}`}
                actions={[
                  zone.locked ? (
                    <Button disabled className="zone-button locked-button">
                      Locked <LockOutlined />
                    </Button>
                  ) : (
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
                  )
                ]}
              >
                <Meta title={zone.title} description={zone.locked ? "Locked Zone" : ""} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Main;
