import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getQuizAsync } from "./quizSlice";
import Question from "./question";
import { loginAsync } from "../../utils/server.requests";

const Quiz = () => {
    const { id } = useParams();
    const { error, quiz, status } = useAppSelector(state => state.quiz);
    const  auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const loginInfo = {
        email: "shubham@gmail.com",
        password: "Bitcoin"
    }

    useEffect(() => {
        dispatch(getQuizAsync(id));
    }, [])

    return (
        <div>
            {status === 'loading' && <p>loading</p>}
            {status === 'failed' && <p>something went wrong</p>}
            {status === 'idle' && 
            <div>
                {quiz.quizName}
                {quiz.questions.map((question) => {
                    return <Question key={question._id} question={question} />
                })}
            </div>
            }
        </div>
    );
}

export default Quiz;