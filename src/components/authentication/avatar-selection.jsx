import React, { useState } from 'react';
import '../../style/avatarselection.css';
import { useNavigate } from 'react-router-dom';
import { message, Button } from 'antd';

const SelectionPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isHovering, setIsHovering] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Replace these with your actual image URLs
  const options = [
    {
      id: 'option1',
      title: 'Galactic Hero',
      image:
        'https://img.freepik.com/premium-vector/beautiful-professional-cartoon-character-design-vector-illustration_1253044-5822.jpg',
      description: 'Ready to conquer any challenge with cosmic power!',
    },
    {
      id: 'option2',
      title: 'Super Star Girl',
      image:
        'https://img.freepik.com/premium-vector/beautiful-girl-children-character-vector-illustration_1287274-43991.jpg?semt=ais_hybrid&w=740',
      description: 'Fearless and fierce — the ultimate champion of justice!',
    },
  ];

  const handleSelection = (optionId) => {
    setSelectedOption(optionId);
    console.log('Selected:', optionId);
  };

  const handleMouseEnter = (optionId) => {
    setIsHovering(optionId);
  };

  const handleMouseLeave = () => {
    setIsHovering(null);
  };

  const continueAvatar = () => {
    if (!selectedOption) {
      message.error('Please select an avatar before continuing.');
      return;
    }
    setLoading(true);
    // message.loading({ content: 'Loading...', key: 'continue' });

    // Simulate async action, then navigate
    setTimeout(() => {
      setLoading(false);
      message.success({
        content: 'Avatar selected & Redirected',
        key: 'continue',
        duration: 2,
      });
      navigate('/driving');
    }, 2000);
  };

  return (
    <div className="selection-container">
      <div className="selection-header">
        <h1>Choose Your Dream Avatar</h1>
        {/* <p>Select one of the options below to continue</p> */}
      </div>

      <div className="options-container">
        {options.map((option) => (
          <div
            key={option.id}
            className={`option-circle ${
              selectedOption === option.id ? 'selected' : ''
            } ${isHovering === option.id ? 'hovering' : ''}`}
            onClick={() => handleSelection(option.id)}
            onMouseEnter={() => handleMouseEnter(option.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="circle-3d">
              <div
                className="circle-image"
                style={{ backgroundImage: `url(${option.image})` }}
              >
                <div className="circle-overlay">
                  <div className="circle-content">
                    <h3>{option.title}</h3>
                    <p>{option.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {selectedOption === option.id && (
              <div className="selection-indicator">
                <div className="checkmark">✓</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedOption && (
        <div className="continue-section">
          <Button
            type="primary"
            loading={loading}
            onClick={continueAvatar}
            className="continue-button"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectionPage;
