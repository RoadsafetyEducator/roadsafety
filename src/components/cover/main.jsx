import React, { useState, useEffect } from 'react';
import { Car, TrafficCone, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../style/cover.css';

export default function RoadSafetyCover() {
  const navigate = useNavigate();
  const [carPosition, setCarPosition] = useState(0);

  useEffect(() => {
    const carInterval = setInterval(() => {
      setCarPosition(prev => (prev >= 95 ? 0 : prev + 0.5));
    }, 30);

    return () => clearInterval(carInterval);
  }, []);

  const handleNavigate = () => {
    navigate('/auth');
  };

  return (
    <div className="container">
      {/* Clouds */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>

      {/* Road */}
      <div className="road">
        <div className="road-line"></div>
      </div>

      {/* Car */}
      <div className="car" style={{ left: `${carPosition}%` }}>
        <Car size={60} color="#ef4444" strokeWidth={2.5} />
      </div>

      {/* Traffic Cones */}
      <div className="cone cone-left">
        <TrafficCone size={40} color="#f97316" strokeWidth={2.5} />
      </div>
      <div className="cone cone-right">
        <TrafficCone size={40} color="#f97316" strokeWidth={2.5} />
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="warning-icon">
          <AlertTriangle size={80} color="#dc2626" strokeWidth={3} />
        </div>

        <h1 className="title">
          <span className="title-road">SafeTown</span>
          <span className="title-safety">Hero</span>
        </h1>

        <p className="subtitle">Let's Learn to Stay Safe! 🚦</p>

        <button className="btn-go" onClick={handleNavigate}>
          Let's Go! 🚀
        </button>
      </div>

      {/* Floating Emojis */}
      <div className="emoji emoji1">🚸</div>
      <div className="emoji emoji2">🛑</div>
      <div className="emoji emoji3">🚦</div>
      <div className="emoji emoji4">⚠️</div>

      {/* Spinning Stars */}
      <div className="star star1">⭐</div>
      <div className="star star2">✨</div>
      <div className="star star3">🌟</div>
      <div className="star star4">💫</div>
    </div>
  );
}