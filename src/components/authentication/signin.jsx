import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import '../../style/signin.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    school: '',
    grade: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schools = [
    'Royal College',
    'Ananda College', 
    'Ladies College',
    'St. Thomas College'
  ];

  const grades = [
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Please enter student name';
    } else if (formData.studentName.trim().length < 2) {
      newErrors.studentName = 'Name must be at least 2 characters';
    }
    
    if (!formData.school) {
      newErrors.school = 'Please select a school';
    }
    
    if (!formData.grade) {
      newErrors.grade = 'Please select a grade';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  // e.preventDefault(); // keep commented since you use button type="button"

  if (!validateForm()) {
    setLoading(false);  // reset loading if validation fails
    return;
  }

  setLoading(true);  // set loading only if validation passed

  try {
    console.log('Form values:', formData);
    localStorage.setItem('studentName', formData.studentName);
    localStorage.setItem('school', formData.school);

    console.log("process.env.BASE_URL: ",process.env.BASE_URL)

    await fetch(process.env.REACT_APP_API_URL+"/api/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });


    setTimeout(() => {
      message.success('Sign in successful!');
      navigate('/avatar');
      setLoading(false); // optionally reset loading after navigation
    }, 3000);

  } catch (error) {
    message.error('Sign in failed. Please try again.');
    setLoading(false);
  }
};


  return (
    <div className="main-frame">
      <div className="signin-card">
        <div className="signin-header">
          <h2>Student Sign In</h2>
        </div>
        
        <div className="signin-form">
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input
              id="studentName"
              type="text"
              value={formData.studentName}
              onChange={(e) => handleInputChange('studentName', e.target.value)}
              placeholder="Enter student name"
              className={errors.studentName ? 'error' : ''}
            />
            {errors.studentName && <span className="error-message">{errors.studentName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="school">School</label>
            <select
              id="school"
              value={formData.school}
              onChange={(e) => handleInputChange('school', e.target.value)}
              className={errors.school ? 'error' : ''}
            >
              <option value="">Select your school</option>
              {schools.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
            {errors.school && <span className="error-message">{errors.school}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <select
              id="grade"
              value={formData.grade}
              onChange={(e) => handleInputChange('grade', e.target.value)}
              className={errors.grade ? 'error' : ''}
            >
              <option value="">Select your grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
            {errors.grade && <span className="error-message">{errors.grade}</span>}
          </div>
          {console.log("true: ",loading)}

           <Button
            icon={
                loading && (
                  <Spin
                    style={{ fontSize: 24, color: 'white' }}
                    indicator={<LoadingOutlined spin />}
                    size="small"
                  />
                )
              }
            className='signin-button' type="primary" onClick={handleSubmit}>
              Sign In
            </Button>


        </div>
      </div>
    </div>
  );
};

export default SignIn;

