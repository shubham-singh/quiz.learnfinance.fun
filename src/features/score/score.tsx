import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";

const Score = () => {
  const score = useAppSelector((state) => state.score);
  const navigate = useNavigate();

  return (
    <div className="flex-c justify-e">
    <h1 className="heading xx-large text-color pointer" onClick={() => navigate("/")}>Learn Finance</h1>
      <h1 className="text-color xx-large">Your Scores</h1>
      <div className="card-container">
      {score.map((quizScore) => (
        <div key={quizScore._id}>
          <div className="flex-column-center card-badge p-s">
            <h3>{quizScore.quiz_id.quizName}</h3>
            <h3 className="m-m">Score: {quizScore.score}</h3>
            <button
              onClick={() => navigate(`/quiz/${quizScore.quiz_id._id}`)}
              className="btn btn-modern"
            >
              Play again
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Score;
