import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
  getAllQuizAsync,
  getLeaderboardAsync,
} from "../../utils/server.requests";
import Loader from "../loader/loader";
import { idle, loading } from "../loader/loaderSlice";

interface QuizState {
  _id: string;
  quizName: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const [quizes, setQuizes] = useState<QuizState[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllQuizAsync(setQuizes, dispatch);
    dispatch(getLeaderboardAsync());
  }, [dispatch]);

  useEffect(() => {
    if (quizes === null) {
      dispatch(loading());
    } else {
      dispatch(idle());
    }
  }, [quizes, dispatch]);

  return (
    <div className="flex-c justify-e">
      <h1 className="heading xx-large text-color pointer" onClick={() => navigate("/")}>Learn Finance</h1>
      <div className="heading-home">
        <h1>Let's play</h1>
        <h4>Choose a category to start playing</h4>

        {quizes === null ? (
          <Loader />
        ) : (
          <div className="card-container">
            {quizes?.map((quiz) => {
              return (
                <Link
                  key={quiz._id}
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/quiz/${quiz._id}`}
                >
                  <div className="flex-column-center card-badge" key={quiz._id}>
                    <h4>{quiz.quizName}</h4>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
