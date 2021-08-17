import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import PrivateRoute from './features/auth/privateRoute';
import Snackbar from './features/snackbar/snackbar';
import Login from './features/auth/login';
import Signup from './features/auth/signup';
import Quiz from './features/quiz/quiz';
import Home from './features/home/home';
import Score from './features/score/score';
import Leaderboard from './features/leaderboard/leaderboard';
import { useAppSelector } from './app/hooks';
import { setupAuthHeaderForServiceCalls } from './utils/function';
import axios from 'axios';

function App() {
  const {loggedIn} = useAppSelector(state => state.auth);
  
  useEffect(() => {
    setupAuthHeaderForServiceCalls();
  }, [loggedIn])

  return (
    <div className="App">
      <Snackbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <PrivateRoute path="/quiz/:id" element={<Quiz />}/>
        <PrivateRoute path="/score" element={<Score />}/>
        <Route path='/leaderboard' element={<Leaderboard />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;
