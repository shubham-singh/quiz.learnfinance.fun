import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Question from "./question";
import Loader from "../loader/loader";
import { changeScoreAsync, getQuizAsync, postScoreAsync } from "../../utils/server.requests";

const Quiz = () => {
    const { id } = useParams();
    const [timer, setTimer] = useState(10);
    const { quiz, score } = useAppSelector(state => state.quiz);
    const { status } = useAppSelector(state => state.loader);
    const userScore = useAppSelector(state => state.score);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(0);
    const { _id: quizID } = quiz;

    useEffect(() => {
        dispatch(getQuizAsync(id));
    }, [dispatch, id])

    useEffect(() => {
        const id = setInterval(() => {
            setTimer((state) => state - 1);
        }, 1000)
        return () => {
            clearInterval(id);
        }
    }, [])

    useEffect(() => {
        const id = setTimeout(() => {
            setTimer((state) => 10)
            setQuestionNumber((state) => state + 1);
        }, 10000)
        return () => {
            clearTimeout(id);
        }
    }, [questionNumber])

    if (questionNumber === 10) {
        if (userScore.some(quiz => quiz.quiz_id._id === id)) {
            dispatch(changeScoreAsync({quizID, score}))
        } else {
            dispatch(postScoreAsync({quizID, score}));
        }
        navigate('/score');
        return null;
    }

    return (
        <div className="flex-column-center">
            {status === 'loading' && <Loader />}
            {status === 'failed' && <p>something went wrong</p>}
            {(status === 'idle' && JSON.stringify(quiz) !== "{}") && 
            <div className="flex-c justify-e quiz">
                <h1 className="xx-large text-color">{quiz.quizName}</h1>
                <h1 className="text-color">{timer}</h1>
                <Question question={quiz?.questions[questionNumber]} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} setTimer={setTimer} />
            </div>
            }
        </div>
    );
}

export default Quiz;