import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLeaderboardAsync } from "../../utils/server.requests";

const Leaderboard = () => {
  const { leaderboard } = useAppSelector((state) => state.leaderboard);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLeaderboardAsync());
  }, [dispatch]);

  return (
    <div className="flex-c justify-e">
      <h1
        className="heading xx-large text-color pointer"
        onClick={() => navigate("/")}
      >
        Learn Finance
      </h1>
      <h1 className="text-color xx-large">Leaderboards</h1>

      <div className="card-container">
        {leaderboard.map((quiz) => {
          return (
            <div className="text-color">
              <h2 className="underline m-s">{quiz.quiz_id.quizName}</h2>
              <div className="leaderboard m-m p-m">
                {quiz.topScores.map((score) => {
                  return (
                    <h2 className="mt-l">
                      {score.user_id.firstName}: {score.score}
                    </h2>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
