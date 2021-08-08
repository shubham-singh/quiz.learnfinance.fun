import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getAllQuizAsync, getLeaderboardAsync } from "../../utils/server.requests";

interface To {
  state: {
    from: string;
  };
}

interface QuizState {
  _id: string;
  quizName: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const [quizes, setQuizes] = useState<QuizState[] | null>(null);
  useEffect(() => {
    getAllQuizAsync(setQuizes, dispatch);
    dispatch(getLeaderboardAsync());
  }, []);

  return (
    <div>
      {quizes !== null &&
        quizes.map((quiz) => {
          return (
            <div key={quiz._id}>
              <Link
                to={`/quiz/${quiz._id}`}
              >
                <p>{quiz.quizName}</p>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
