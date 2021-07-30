import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { computeScore, QuestionState } from "./quizSlice";

const Question = ({ question }: { question: QuestionState }) => {
  const {
    score,
    quiz: { points, negativePoints },
  } = useAppSelector((state) => state.quiz);

  const dispatch = useAppDispatch();
  
  const calculateScore = (isCorrect: boolean) => {
    if (isCorrect) {
      dispatch(computeScore(points));
    } else {
      dispatch(computeScore(-negativePoints));
    }
  };

  return (
    <div>
      <h2>{question.question}</h2>
      <h3>Score: {score}</h3>
      <div>
        {question.options.map((option) => {
          return (
            <button key={option._id} onClick={() => calculateScore(option.isCorrect)}>
              {option.value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
