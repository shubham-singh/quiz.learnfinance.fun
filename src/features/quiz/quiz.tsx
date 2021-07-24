import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getQuizAsync } from "./quizSlice";
import Question from "./question";

const Quiz = () => {
    const { error, quiz, status } = useAppSelector(state => state.quiz);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getQuizAsync("60f3b9835ac36a0077afc020"));
        console.log('status: ', status)
    }, [])

    return (
        <div>
            {status === 'loading' && <p>loading</p>}
            {status === 'failed' && <p>something went wrong</p>}
            {status === 'idle' && 
            <div>
                {quiz.quizName}
                {quiz.questions.map((question) => {
                    return <Question question={question} />
                })}
            </div>
            }
        </div>
    );
}

export default Quiz;