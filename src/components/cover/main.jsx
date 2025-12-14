import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../style/cover.css';

const { Text } = Typography;

const CoverPage = () => {
  const navigate = useNavigate();

  const handleStartMission = () => {
    navigate('/auth'); // navigate to home or mission page
  };

  return (
    <div className="cover-page-container">
      <div className="cover-page-overlay" />

      <div className="cover-page-content">
        <Button
          type="primary"
          size="large"
          onClick={handleStartMission}
          className="start-mission-button"
        >
          START MISSION
        </Button>

        <Text className="cover-page-footer">
          An Interactive Road Safety Learning Game | Department of Civil Engineering | University of Moratuwa
        </Text>
      </div>
    </div>
  );
};

export default CoverPage;
