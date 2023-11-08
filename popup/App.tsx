import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

import { useWallet } from "./hooks/useWallet";
export default function App() {
  const { isLogin } = useWallet();
  const PrivateRoute = ({ children }) => {
    return isLogin ? <>{children}</> : <Navigate to="/login" replace />;
  };
  return (
    <>
      <div className="h-[375px] w-[350px] font-semibold mb-10">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route path="/lazy" element={<>lazy</>} />
        </Routes>
      </div>
    </>
  );
}
