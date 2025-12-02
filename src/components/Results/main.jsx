import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrophyOutlined, StarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import '../../style/results.css';

const FinalResults = () => {
  const navigate = useNavigate();
  const [totalScoreData, setTotalScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

//   useEffect(() => {
//     const fetchTotalScore = async () => {
//       localStorage.removeItem("unlockedZone");
//       const firstName = localStorage.getItem('firstName');
//       const lastName = localStorage.getItem('lastName');

//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/result/total-score?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`,
//           {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' }
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           console.log("data: ",data);
//           setTotalScoreData(data);
//           setShowConfetti(true);
//         }
//       } catch (error) {
//         console.error('Error fetching total score:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTotalScore();
//   }, []);

    useEffect(() => {
    const fetchTotalScore = async () => {
        localStorage.removeItem("unlockedZone");
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');

        try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/total-score`,
            {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName
            })
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log("data: ", data);
            setTotalScoreData(data);
            setShowConfetti(true);
        }
        } catch (error) {
        console.error('Error fetching total score:', error);
        } finally {
        setLoading(false);
        }
    };

    fetchTotalScore();
    }, []);


  const renderConfetti = () => {
    const confetti = [];
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA500', '#FF1493'];
    
    for (let i = 0; i < 100; i++) {
      confetti.push(
        <div 
          key={i} 
          className="confetti-piece" 
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        ></div>
      );
    }
    return confetti;
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { title: "Outstanding!", emoji: "🏆", color: "#FFD700" };
    if (percentage >= 75) return { title: "Excellent!", emoji: "🌟", color: "#FFA500" };
    if (percentage >= 60) return { title: "Great Job!", emoji: "👏", color: "#4ECDC4" };
    if (percentage >= 50) return { title: "Good Effort!", emoji: "👍", color: "#45B7D1" };
    return { title: "Keep Practicing!", emoji: "💪", color: "#FF6B6B" };
  };

  if (loading) {
    return (
      <div className="results-container">
        <div className="loading-spinner">Loading results...</div>
      </div>
    );
  }

  if (!totalScoreData) {
    return (
      <div className="results-container">
        <div className="error-message">No results found</div>
      </div>
    );
  }

  const performance = getPerformanceLevel(parseFloat(totalScoreData.percentage));

  return (
    <div className="results-container">
      {showConfetti && <div className="confetti-container">{renderConfetti()}</div>}
      
      <motion.div 
        className="results-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with trophy */}
        <motion.div 
          className="results-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="trophy-icon">{performance.emoji}</div>
          <h1 className="results-title" style={{ color: performance.color }}>
            {performance.title}
          </h1>
          <p className="results-subtitle">You're crushing it!</p>
        </motion.div>

        {/* Main Score Display */}
        <motion.div 
          className="score-display"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <div className="score-circle" style={{ borderColor: performance.color }}>
            <div className="score-number">{totalScoreData.totalScore}</div>
            <div className="score-total">/ {totalScoreData.totalQuestions}</div>
          </div>
          <div className="score-percentage" style={{ color: performance.color }}>
            {totalScoreData.percentage}%
          </div>
        </motion.div>

        {/* Stats Cards */}
        {/* <motion.div 
          className="stats-container"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        > */}
          {/* <div className="stat-card">
            <TrophyOutlined className="stat-icon" style={{ color: '#FFD700' }} />
            <div className="stat-label">Hall of Fame</div>
            <div className="stat-value">Status</div>
          </div>

          <div className="stat-card stat-card-highlight" style={{ backgroundColor: performance.color }}>
            <CheckCircleOutlined className="stat-icon-white" />
            <div className="stat-label-white">Zones</div>
            <div className="stat-value-white">{totalScoreData.zonesCompleted}/4</div>
          </div>

          <div className="stat-card">
            <StarOutlined className="stat-icon" style={{ color: '#FFA500' }} />
            <div className="stat-label">Top 75%</div>
            <div className="stat-value">Rank</div>
          </div> */}
        {/* </motion.div> */}

        {/* Zone Breakdown */}
        <motion.div 
          className="zones-breakdown"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="breakdown-title">Zone Breakdown</h3>
          <div className="zones-grid">
            {totalScoreData.zoneScores.map((zoneScore, index) => (
              <motion.div 
                key={index} 
                className="zone-score-card"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 + (index * 0.1), duration: 0.4 }}
              >
                <div className="zone-name">{zoneScore.zone.replace('zone', 'Zone ')}</div>
                <div className="zone-score">
                  <span className="zone-score-value">{zoneScore.score}</span>
                  <span className="zone-score-total">/10</span>
                </div>
                <div className="zone-progress-bar">
                  <motion.div 
                    className="zone-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(zoneScore.score / 10) * 100}%` }}
                    transition={{ delay: 1 + (index * 0.1), duration: 0.8 }}
                    style={{ 
                      backgroundColor: zoneScore.score >= 7 ? '#4CAF50' : zoneScore.score >= 5 ? '#FFA500' : '#FF6B6B' 
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        {/* <motion.div 
          className="results-actions"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <button 
            className="btn-primary"
            onClick={() => navigate('/zone')}
            style={{ backgroundColor: performance.color }}
          >
            Back to Zones
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/')}
          >
            Go Home
          </button>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default FinalResults;