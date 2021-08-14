import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getScoreAsync } from "../../utils/server.requests";

const Score = () => {

    const score = useAppSelector(state => state.score);    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getScoreAsync());
    }, [])

    return (
    <div>
        {score.map(quizScore => <div key={quizScore._id} onClick={() => navigate(`/quiz/${quizScore.quiz_id._id}`)}>
            <h2>{quizScore.quiz_id.quizName}</h2>
            <h3>{quizScore.score}</h3>
        </div>
        )}
    </div>);
}

export default Score;