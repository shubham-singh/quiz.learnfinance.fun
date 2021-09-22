import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../auth/authSlice";
import { ReactComponent as DayIcon } from "../../assets/icons/DayIcon.svg";
import { ReactComponent as NightIcon } from "../../assets/icons/NightIcon.svg";
import { switchTheme } from "../theme/themeSlice";

const Navbar = () => {
  const { loggedIn } = useAppSelector((state) => state.auth);
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandle = () => {
    dispatch(logout());
    setTimeout(() => navigate("/"), 0);
  };
  return (
    <nav className="navbar">
      <div className="pointer mr-s btn-theme" onClick={() => dispatch(switchTheme())}>
        {theme === "light" ? <NightIcon /> : <DayIcon />}
      </div>
      <NavLink activeClassName="selected" className="nav-item" end to="/">
        Home
      </NavLink>
      <NavLink
        activeClassName="selected"
        className="nav-item"
        to="/leaderboard"
      >
        Leaderboard
      </NavLink>
      {loggedIn ? (
        <>
          <NavLink activeClassName="selected" className="nav-item" to="/score">
            Score
          </NavLink>
          <NavLink
            activeClassName="selected"
            className="nav-item"
            to="/logout"
            onClick={logoutHandle}
          >
            Logout
          </NavLink>
        </>
      ) : (
        <NavLink activeClassName="selected" className="nav-item" to="/login">
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
