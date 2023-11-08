import { Navigate } from "react-router-dom";
import { useWallet } from "~popup/hooks/useWallet";

export const PrivateRoute = ({ children }) => {
  const { address } = useWallet();
  return <>{address ? children : <Navigate to="/login" />}</>;
};
export default PrivateRoute;
