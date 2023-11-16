import welcome from 'data-base64:~popup/assets/svg/welcome-logo.png';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~components/ui/button';
import { XWalletProviderContext } from '~popup/context';

export default function Login() {
  const { isLogin, login, loginLoading } = useContext(XWalletProviderContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
    console.log('Login islogin', isLogin);
  }, [isLogin]);
  return (
    <div className="w-full h-full bg-[#F8FAF9] px-11 pt-24 rounded-[1.25rem]">
      <div className="flex flex-col items-center">
        <img className="w-48 h-48 object-contain" src={welcome}></img>
        <Button
          className="w-full h-11 text-xl/[1.5125rem] rounded-[2.5rem]"
          onClick={() => {
            login();
          }}
        >
          {loginLoading ? 'loading ...' : 'connect to X-Wallet'}
        </Button>
      </div>
    </div>
  );
}
