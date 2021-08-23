import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../auth/authSlice";

const Navbar = () => {

    const { loggedIn } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandle = () => {
        dispatch(logout());
        setTimeout(() => navigate("/"), 0)
        
    }
    return (
        <nav className="navbar">
            <NavLink activeClassName="selected" className="nav-item" end to="/">Home</NavLink>
            <NavLink activeClassName="selected" className="nav-item" to="/leaderboard">Leaderboard</NavLink>
            {loggedIn ? (
                <>
                    <NavLink activeClassName="selected" className="nav-item" to="/score">Score</NavLink>
                    <NavLink activeClassName="selected" className="nav-item" to="/logout" onClick={logoutHandle}>Logout</NavLink>
                </>
            ) : 
            <NavLink activeClassName="selected" className="nav-item" to="/login">Login</NavLink>}
            
        </nav>
    )
}

export default Navbar;