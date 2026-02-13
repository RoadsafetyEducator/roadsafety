import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../style/credits.css';

const Credits = () => {
  const navigate = useNavigate();

  return (
    <div className="credits-container">
      <div className="credits-box">
        
        <h1 className="credits-title">SafeTown – Credits</h1>

        <div className="credits-section">
          <h3>Developed By</h3>
          <p>
            Lahiru Prasad Gunathunga<br/>
            B.Tech (Civil Eng), AMIESL, GMICE<br/>
            MSc in Highway & Transportation (Reading)<br/>
            Department of Civil Engineering, University of Moratuwa
          </p>
        </div>

        <div className="credits-section">
          <h3>Academic Supervision</h3>
          <p>
            Prof. J.M.S.J. Bandara<br/>
            Department of Civil Engineering, University of Moratuwa
          </p>
        </div>

        <div className="credits-section">
          <h3>Game Design, UI/UX & Digital Artwork</h3>
          <p>
            Sankha Gunathunga<br></br>
            Sayuru Dissanyake<br></br>
            Pamudu Rathnayake<br></br>
            Oshadha Goonathilaka
          </p>
        </div>

        <div className="credits-section">
          <h3>Research Project Context</h3>
          <p className="research-text">
            This game is part of the MSc research study titled 
            <strong> “Development and Evaluation of an Interactive Road Safety Education Module for Secondary School Students in Sri Lanka”</strong>, 
            which aims to address the growing vulnerability of school-aged children to road traffic incidents by introducing an engaging, technology-driven learning approach.
            Traditional awareness programmes often fail to sustain student interest, so this research incorporates gamification and interactive learning to improve knowledge, decision-making, and safe behaviour.
            The SafeTown game functions as the practical component of the module, allowing students to learn road rules, safe habits, and emergency responses.
            Data collected through gameplay helps assess the effectiveness of this digital approach in enhancing road safety awareness and supporting national efforts to reduce youth-related road accidents.
          </p>
        </div>

        <div className="credits-section">
          <h3>Special Thanks</h3>
          <ul className="credits-list">
            <li>Participating Schools & Teachers</li>
            <li>Sri Lanka Police – Traffic Division</li>
            <li>University of Moratuwa</li>
          </ul>
        </div>

        <div className="credits-btn">
          <Button type="primary" onClick={() => navigate('/feedback')}>
            Give feedback
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Credits;
