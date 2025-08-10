import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionView from '../src/components/questionnaire/question-view'
import Landing from '../src/components/landing/main'
import ZoneSelection from '../src/components/zone-selection/main'
import SignIn from '../src/components/authentication/signin'
import AvatarSelection from '../src/components/authentication/avatar-selection'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<Router>
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/questionnaire" element={<QuestionView />} />
    {/* <Route path="/" element={<Landing />} /> */}
    <Route path="/zone" element={<ZoneSelection />} />
    <Route path="/avatar" element={<AvatarSelection />} />
  </Routes>
</Router>
</React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
