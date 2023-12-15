import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function AuthRoute({ element }) {
    const { authenticatedUser} = useContext(UserContext);

    if (!authenticatedUser) {
        return <Navigate to="/login" />;
    } 
    return element;
}
export default AuthRoute;