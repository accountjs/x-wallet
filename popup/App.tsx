import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SendNFT from './SendNFT';
import SendToken from './SendToken';
import Home from './components/Home';
import Login from './components/Login';
import TransactionDetail from './components/TransactionDetail';
import { XWalletProviderContext } from './context';
export default function App() {
  const { isLogin } = useContext(XWalletProviderContext);
  const PrivateRoute = ({ children }) => {
    // return children;
    return isLogin ? <>{children}</> : <Navigate to="/login" replace />;
  };

  return (
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
          path="/send"
          element={
            <>
              <PrivateRoute>
                <SendToken />
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
        <Route path="/transactionDetail" element={<TransactionDetail />} />
        <Route path="/sendNFT" element={<SendNFT />} />
      </Routes>
    </div>
  );
}
