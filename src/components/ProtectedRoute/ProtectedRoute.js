import { Navigate } from "react-router-dom";

function ProtecedRoute({ loggedIn, children }) {
  return loggedIn || localStorage.jwt ? children : <Navigate to="/signin" />;
}
export default ProtecedRoute;
