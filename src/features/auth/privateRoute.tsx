import { Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface Props {
  path?: string | undefined,
  [key: string]: any
  // element?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined
}

const PrivateRoute = ({ path, ...props }: Props) => {
  const { loggedIn } = useAppSelector((state) => state.auth);
  return loggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};

export default PrivateRoute;