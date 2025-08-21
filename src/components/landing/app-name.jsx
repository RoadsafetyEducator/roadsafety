import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import '../../style/appName.css';

const { Title } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to /signin after 3 seconds
    const timer = setTimeout(() => {
      navigate('/signin');
    }, 3000); // 3000ms = 3 seconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-container">
      <label className="brand-title">Road Safety Hero</label>
    </div>
  );
};

export default LandingPage;