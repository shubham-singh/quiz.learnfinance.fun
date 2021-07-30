import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Quiz from './features/quiz/quiz';
import Snackbar from './features/snackbar/snackbar';
import Home from './features/home/home';
import PrivateRoute from './features/auth/privateRoute';
import Login from './features/auth/login';
import Signup from './features/auth/signup';
function App() {
  return (
    <div className="App">
      <Snackbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <PrivateRoute path='/quiz/:id' element={<Quiz />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;
