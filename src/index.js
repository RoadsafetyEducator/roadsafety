import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionView from '../src/components/questionnaire/question-view'
import Landing from '../src/components/landing/main'
import ZoneSelection from '../src/components/zone-selection/main'
import SignUp from './components/authentication/signup'
import AvatarSelection from '../src/components/authentication/avatar-selection'
import Results from '../src/components/Results/main'
import Credits from './components/credits/main'
import AppName from '../src/components/landing/app-name'
import Driving from '../src/components/driving/main'
import Cover from '../src/components/cover/main'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<Router>
  <Routes>
    <Route path="/" element={<Cover />} />
     <Route path="/auth" element={<SignUp />} />
    <Route path="/auth" element={<SignUp />} />
    <Route path="/questionnaire" element={<QuestionView />} />
    <Route path="/intro" element={<Landing />} />
    <Route path="/zone" element={<ZoneSelection />} />
    <Route path="/avatar" element={<AvatarSelection />} />
    <Route path="/results" element={<Results />} />
    <Route path="/credits" element={<Credits />} />
    <Route path="/driving" element={<Driving />} />

  </Routes>
</Router>
</React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
