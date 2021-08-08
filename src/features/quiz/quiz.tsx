import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Question from "./question";
import { getQuizAsync } from "../../utils/server.requests";

const Quiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { error, quiz, status } = useAppSelector(state => state.quiz);
    const  auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [questionNumber, setQuestionNumber] = useState(0);

    useEffect(() => {
        dispatch(getQuizAsync(id));
    }, [])

    if (questionNumber === 10) {
        navigate('/');
        return <></>;
    }

    return (
        <div>
            {status === 'loading' && <p>loading</p>}
            {status === 'failed' && <p>something went wrong</p>}
            {status === 'idle' && 
            <div>
                {quiz.quizName}
                <Question question={quiz.questions[questionNumber]} setQuestionNumber={setQuestionNumber} />
            </div>
            }
        </div>
    );
}

export default Quiz;