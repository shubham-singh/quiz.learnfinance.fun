import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { computeScore, QuestionState } from "./quizSlice";

const Question = ({
  question,
  questionNumber,
  setQuestionNumber,
  setTimer,
}: {
  question: QuestionState;
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const { quiz: { points, negativePoints } } = useAppSelector((state) => state.quiz);

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
      <h2 className="text-color mb-xl">
        {questionNumber + 1}. {question.question}
      </h2>
      <div className="flex-column-center">
        {question.options.map((option) => {
          return (
            <button
              disabled={showAnswer}
              className={
                showAnswer
                  ? option.isCorrect
                    ? "option option-right no-hover"
                    : "option"
                  : "option pointer"
              }
              key={option._id}
              onClick={(e) => {
                calculateScore(option.isCorrect);
                setShowAnswer(true);
                setTimeout(() => {
                  setShowAnswer(false);
                  setQuestionNumber((state) => state + 1);
                  setTimer((state) => 10);
                }, 2000);
              }}
            >
              {option.value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
