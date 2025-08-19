// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Gif from '../../assets/Online test.gif';
// import '../../style/questionView.css';
// import { motion } from 'framer-motion';
// import { DoubleRightOutlined } from '@ant-design/icons';

// const Quiz = () => {
//   const navigate = useNavigate();
//   const questions = [
//     {
//       question: 'What should you do first if you see a fire in the workplace?',
//       options: ['Call emergency services', 'Ignore it', 'Run away', 'Try to put it out without informing anyone'],
//       correctAnswer: 'Call emergency services',
//     },
//     {
//       question: 'Which of the following is NOT a common cause of workplace accidents?',
//       options: ['Slippery floors', 'Poor lighting', 'Proper use of safety equipment', 'Improper lifting techniques'],
//       correctAnswer: 'Proper use of safety equipment',
//     },
//     {
//       question: 'Which type of fire extinguisher is best for electrical fires?',
//       options: ['Water-based', 'Foam-based', 'CO2 extinguisher', 'Paper extinguisher'],
//       correctAnswer: 'CO2 extinguisher',
//     },
//     {
//       question: 'What should you do if your clothes catch fire?',
//       options: ['Run around', 'Stop, drop, and roll', 'Use a fan to put out the flames', 'Remove your clothes quickly'],
//       correctAnswer: 'Stop, drop, and roll',
//     },
//     {
//       question: 'Which of the following is NOT considered personal protective equipment (PPE)?',
//       options: ['Gloves', 'Safety goggles', 'Sunglasses', 'Hard hat'],
//       correctAnswer: 'Sunglasses',
//     },
//     {
//       question: 'When should safety gloves be worn?',
//       options: ['Only when handling chemicals', 'Whenever performing tasks with hand injury risks', 'Only when required by management', 'Never, as they reduce efficiency'],
//       correctAnswer: 'Whenever performing tasks with hand injury risks',
//     }
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [answerSelected, setAnswerSelected] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   const handleAnswerSelect = (answer) => {
//     const newAnswers = [...answers];
//     newAnswers[currentQuestion] = answer;
//     setAnswers(newAnswers);
//     setAnswerSelected(true);
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setAnswerSelected(false);
//     } else {
//       setQuizCompleted(true);
//     }
//   };

//   const submitQuiz = () => {
//     navigate('/landing');
//   };

//   const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
//   const wrongAnswers = answers.length - correctAnswers;

//   return (
//     <div className='main-frame'>
//       <div className='sub-frame'>
//         {!quizCompleted ? (
//           <>
//             <div>
//               <span className='question-num'>{String(currentQuestion + 1).padStart(2, '0')}</span>
//               <span className='question-page-num'>/{String(questions.length).padStart(2, '0')}</span>
//             </div>
//             <label className='question-title'>{questions[currentQuestion].question}</label>
//             <div className='answers-main'>
//               <div className='answers-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//                 {questions[currentQuestion].options.map((option, index) => (
//                   <button
//                     className='answers'
//                     key={index}
//                     onClick={() => handleAnswerSelect(option)}
//                     style={{
//                       backgroundColor: answers[currentQuestion] === option ? '#ffd6ff' : '',
//                       textAlign: 'left',
//                       width: '100%',
//                       border:answers[currentQuestion] === option ? '1px solid #800080' : '',
//                     }}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <button 
//               className='ques-next-btn' 
//               onClick={nextQuestion} 
//               disabled={!answerSelected}
//               style={{ 
//                 cursor: answerSelected ? 'pointer' : 'not-allowed', 
//                 opacity: answerSelected ? 1 : 0.5 
//               }}
//             >
//               Next &nbsp;
//               <motion.span 
//                 animate={{ x: [0, 10, 0] }} 
//                 transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
//                 style={{ display: 'inline-block' }}
//               >
//                 <DoubleRightOutlined />
//               </motion.span>
//             </button>
//           </>
//         ) : (
//           <div className="quiz-summary">
//             <h2>Quiz Completed!</h2>
//             <p>Total Questions: {questions.length}</p>
//             <p>Correct Answers: {correctAnswers}</p>
//             <p>Wrong Answers: {wrongAnswers}</p>
//             <button className="ques-next-btn" onClick={submitQuiz}>Submit</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DoubleRightOutlined } from '@ant-design/icons';
import '../../style/firework.css';
import '../../style/questionView.css';
import Sad from '../../assets/Anxiety.gif'
import Happy from '../../assets/Happy.gif'
import HighFive from '../../assets/High five.gif'

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);


useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const zone = queryParams.get('zone');
  
  if (zone) {
    // Fetch questions from API
    fetch(process.env.REACT_APP_API_URL+`/api/zone/${zone}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        return response.json();
      })
      .then(data => {
          const questionsCopy = [...data];
          const selected = [];

          while (selected.length < 10 && questionsCopy.length > 0) {
            const randomIndex = Math.floor(Math.random() * questionsCopy.length);
            selected.push(questionsCopy.splice(randomIndex, 1)[0]); 
            // splice removes the picked question from the array
          }

          setQuestions(selected);
          setLoading(false);
        })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }
}, []);

useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const zone = queryParams.get('zone');
  
  if (zone) {
    // Save current zone in localStorage
    localStorage.setItem("currentZone", zone);

    fetch(process.env.REACT_APP_API_URL+`/api/zone/${zone}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch questions');
        return response.json();
      })
      .then(data => {
        const questionsCopy = [...data];
        const selected = [];

        while (selected.length < 10 && questionsCopy.length > 0) {
          const randomIndex = Math.floor(Math.random() * questionsCopy.length);
          selected.push(questionsCopy.splice(randomIndex, 1)[0]); 
        }

        setQuestions(selected);
        setLoading(false);
        setCurrentQuestion(0);   // reset to first question
        setAnswers([]);          // reset answers
        setAnswerSelected(false);
        setQuizCompleted(false);
        setShowFireworks(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }
}, [location.search]);


  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    setAnswerSelected(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswerSelected(false);
    } else {
      setQuizCompleted(true);
      setShowFireworks(true);
    }
  };

  // const submitQuiz = () => {
  //   navigate('/zone');
  // };

  const submitQuiz = () => {
  const queryParams = new URLSearchParams(location.search);
  const currentZone = queryParams.get('zone');

  // Define the order of zones
  const zones = ["zone01", "zone02", "zone03", "zone04"];
  const currentIndex = zones.indexOf(currentZone);

  if (currentIndex !== -1 && currentIndex < zones.length - 1) {
    // Go to the next zone
    const nextZone = zones[currentIndex + 1];
    navigate(`/questionnaire?zone=${nextZone}`);
  } else {
    // If it's the last zone, go back to /zone or final page
    navigate('/zone');
  }
};

  // Check if the selected answer matches the correct answer
  const isCorrectAnswer = (questionIndex, selectedAnswer) => {
    if (!questions[questionIndex]) return false;
    const correctOption = questions[questionIndex].correct_answer; // "A", "B", "C", etc.
    return selectedAnswer === questions[questionIndex].answers[correctOption];
  };

  const correctAnswers = answers.filter((answer, index) => 
    isCorrectAnswer(index, answer)
  ).length;
  
  const wrongAnswers = answers.length - correctAnswers;

  // Render fireworks
  const renderFireworks = () => {
    const fireworks = [];
    const colors = ['#ff1461', '#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd166'];
    
    for (let i = 0; i < 50; i++) {
      fireworks.push(
        <div 
          key={i} 
          className="firework" 
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 2}s`
          }}
        ></div>
      );
    }
    return fireworks;
  };

  if (loading) return <div className="main-frame"><div className="sub-frame">Loading questions...</div></div>;
  if (error) return <div className="main-frame"><div className="sub-frame">Error: {error}</div></div>;
  if (questions.length === 0) return <div className="main-frame"><div className="sub-frame">No questions available.</div></div>;

  // Convert API response format to the format we need for rendering
  const currentQuestionData = questions[currentQuestion];
  const options = currentQuestionData ? Object.values(currentQuestionData.answers) : [];

  return (
    <div className='main-frame'>
      {showFireworks && <div className="fireworks-container">{renderFireworks()}</div>}
      <div className='sub-frame'>
        {!quizCompleted ? (
          <>
            <div>
              <span className='question-num'>{String(currentQuestion + 1).padStart(2, '0')}</span>
              <span className='question-page-num'>/{String(questions.length).padStart(2, '0')}</span>
            </div>
            <label className='question-title'>{currentQuestionData.question}</label>
            <div className='answers-main'>
              <div className='answers-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {options.map((option, index) => (
                  <button
                    className='answers'
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    style={{
                      backgroundColor: answers[currentQuestion] === option ? '#ffd6ff' : '',
                      textAlign: 'left',
                      width: '100%',
                      border: answers[currentQuestion] === option ? '1px solid #800080' : '',
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <button 
              className='ques-next-btn' 
              onClick={nextQuestion} 
              disabled={!answerSelected}
              style={{ 
                cursor: answerSelected ? 'pointer' : 'not-allowed', 
                opacity: answerSelected ? 1 : 0.5 
              }}
            >
              Next &nbsp;
              <motion.span 
                animate={{ x: [0, 10, 0] }} 
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                style={{ display: 'inline-block' }}
              >
                <DoubleRightOutlined />
              </motion.span>
            </button>
          </>
        ) : (
          <div>
            <div className="quiz-summary">
              <div>
                <h2 className='quiz-completed'>Quiz Completed!</h2>
                <p>Total Questions: {questions.length}</p>
                <p>Correct Answers: {correctAnswers}</p>
                <p>Wrong Answers: {wrongAnswers}</p>
              </div>
              <div>
                {correctAnswers < wrongAnswers ? (
                  <img className='sad-img' src={Sad} alt="Sad face" />
                ) : correctAnswers > wrongAnswers ? (
                  <img className='sad-img' src={Happy} alt="Happy face" />
                ) : (
                  <img className='sad-img' src={HighFive} alt="High five" />
                )}
              </div>
            </div>
            {/* <button className="ques-next-btn" onClick={submitQuiz}>Submit</button> */}
           <button className="ques-next-btn" onClick={submitQuiz}>
              {(() => {
                const queryParams = new URLSearchParams(location.search);
                const currentZone = queryParams.get('zone');
                const zones = ["zone01", "zone02", "zone03", "zone04"];
                const currentIndex = zones.indexOf(currentZone);

                return currentIndex < zones.length - 1 ? (
                  <>
                    Next Challenge &nbsp;
                    <motion.span 
                      animate={{ x: [0, 8, 0] }} 
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                      style={{ display: "inline-block" }}
                    >
                      <DoubleRightOutlined />
                    </motion.span>
                  </>
                ) : (
                  "Submit"
                );
              })()}
            </button>


          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;