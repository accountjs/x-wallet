import cn from 'classnames';
import { useState, useContext, useEffect } from 'react';
import { useConfigStore } from '~popup/store';
import { XWalletProviderContext } from '~popup/context';
import { useNavigate } from 'react-router-dom';

interface TokenItem {
  token: string;
  amount: string;
}

function TokensBox() {
  const { userInfo, ethBalance, usdtBalance, updateBalance } = useContext(
    XWalletProviderContext
  );
  const [tokensList, setTokenList] = useState<TokenItem[]>([
    { token: 'MATIC', amount: '0.0' },
    { token: 'USDT', amount: '0.0' },
  ]);
  const { isShowMoney } = useConfigStore();
  const navigate = useNavigate();
  useEffect(() => {
    console.log('ethBalance', ethBalance, 'usdtBalance', usdtBalance);
    setTokenList([
      { token: 'MATIC', amount: ethBalance },
      { token: 'USDT', amount: usdtBalance },
    ]);
  }, []);

  useEffect(() => {
    console.log('updateBalance accountAddress', userInfo?.accountAddress);
    updateBalance();
  }, [userInfo]);

  return (
    <div className="bg-[#E9E9E9] text-center px-5 py-4 h-[170px] relative rounded-b-2xl overflow-x-hidden overflow-y-scroll">
      {tokensList.length === 0 ? (
        <div
          className={cn(
            'absolute bottom-2 left-4',
            'text-sm font-semibold cursor-pointer',
            'flex justify-center items-center',
            'h-10 w-[100%] px-6 py-2 mb-3 rounded-2xl bg-white opacity-30'
          )}
        >
          + Import Tokens
        </div>
      ) : (
        tokensList.map((i) => (
          <div
            key={i.token}
            className={cn(
              'text-sm font-semibold cursor-pointer',
              'flex justify-between items-center overflow-hidden',
              'h-10 w-[320px] px-6 py-2 mb-3 rounded-2xl bg-white'
            )}
            onClick={() => {
              console.log('i.token', i.token);
              navigate(`/send?token=${i.token}`);
            }}
          >
            <span>{i.token}</span>
            <span>{isShowMoney ? <span>{i.amount}</span> : '***'}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default TokensBox;
