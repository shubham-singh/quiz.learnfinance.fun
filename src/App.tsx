import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./features/auth/privateRoute";
import Snackbar from "./features/snackbar/snackbar";
import Login from "./features/auth/login";
import Signup from "./features/auth/signup";
import Quiz from "./features/quiz/quiz";
import Home from "./features/home/home";
import Score from "./features/score/score";
import Leaderboard from "./features/leaderboard/leaderboard";
import Navbar from "./features/navigation/navbar";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setupAuthHeaderForServiceCalls } from "./utils/function";
import { getScoreAsync, pingServer } from "./utils/server.requests";

function App() {
  const { loggedIn } = useAppSelector((state) => state.auth);
  const theme = useAppSelector(state => state.theme.theme);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    pingServer();
  }, [])

  useEffect(() => {
    setupAuthHeaderForServiceCalls();
    if (loggedIn) {
      dispatch(getScoreAsync());
    }
  }, [loggedIn, dispatch]);
  
  return (
    <div className="App" style={{backgroundColor: `${theme === "light" ? "#3B82F6" : "black" }`}}>
      <Snackbar />
      {["/login", "/signup"].includes(location.pathname) ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <PrivateRoute path="/quiz/:id" element={<Quiz />} />
        <PrivateRoute path="/score" element={<Score />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
