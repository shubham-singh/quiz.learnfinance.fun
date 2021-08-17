import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLeaderboardAsync } from "../../utils/server.requests";

const Leaderboard = () => {
  const { leaderboard } = useAppSelector((state) => state.leaderboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(leaderboard);
    dispatch(getLeaderboardAsync());
  }, []);
  return (
    <div>
      {leaderboard.map((quiz) => {
        return (
          <div>
            <h1>{quiz.quiz_id.quizName}</h1>
            <div>
              {quiz.topScores.map((score) => {
                return (
                  <>
                    <h3>{score.user_id.firstName}</h3>
                    <h2>{score.score}</h2>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Leaderboard;
