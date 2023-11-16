import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { useContext } from 'react';
import { XWalletProviderContext } from './context';
import TransactionDetail from './components/TransactionDetail';
import SendNFT from './SendNFT';
import Send from './components/Send';
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
                <Send />
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
