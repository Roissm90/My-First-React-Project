import { Navigate } from "react-router-dom";

function AuthRoute({ element }) {

  const token = localStorage.getItem("token");
  ////console.log(token);
  ////console.log(location);
  if (token) return element;
  if (!token) return <Navigate to="/login" />;
}
export default AuthRoute;