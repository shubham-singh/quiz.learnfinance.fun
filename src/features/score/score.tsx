import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getScoreAsync } from "../../utils/server.requests";

const Score = () => {

    const score = useAppSelector(state => state.score);    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    console.log(axios.defaults.headers);
    useEffect(() => {
        dispatch(getScoreAsync());
    }, [])
    console.log(score);
    return (
    <div>
        {score.map(quizScore => <div onClick={() => navigate(`quiz/${quizScore.quiz_id._id}`)}>
            <h2>{quizScore.quiz_id.quizName}</h2>
            <h3>{quizScore.score}</h3>
        </div>
        )}
    </div>);
}

export default Score;