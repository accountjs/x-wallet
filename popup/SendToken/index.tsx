import cn from 'classnames';
import matic from 'data-base64:~popup/assets/svg/matic.png';
import usdt from 'data-base64:~popup/assets/svg/usdt.png';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XWalletProviderContext } from '~popup/context';

function SendToken(props: { token: 'matic' | 'usdt' }) {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, []);

  const { ethBalance, usdtBalance } = useContext(XWalletProviderContext);

  const [balance, setBalance] = useState(ethBalance);
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(''); // 默认币种
  const [selectedLogo, setSelectedLogo] = useState(matic); // 显示目标地址
  const [targetAddress, setTargetAddress] = useState('');

  useEffect(() => {
    setSelectedCurrency(props.token);
    changeBalance(props.token);
  }, []);

  const changeBalance = (currency: 'matic' | 'usdt') => {
    if (currency === 'matic') {
      setBalance(ethBalance);
      setSelectedLogo(matic);
    } else if (currency === 'usdt') {
      setBalance(usdtBalance);
      setSelectedLogo(usdt);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    console.log('Set Amount', value);
  };

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    changeBalance(currency);
  };

  const handleSendToken = () => {
    console.log(
      'Send',
      selectedCurrency,
      'Amount',
      amount,
      'To',
      targetAddress
    );
  };

  const twitterRef = useRef<HTMLInputElement>(null);
  const handleTwitterBlur = async () => {
    const twitterUsername = twitterRef.current?.value;
    if (twitterUsername) {
      // 调用后台接口获取目标地址
      const response = await fetch(
        `/api/getAddress?twitter=${twitterUsername}`
      );
      if (response.ok) {
        const data = await response.json();
        const address = data.address;
        setTargetAddress(address);
      } else {
        console.error('Failed to fetch target address');
      }
    }
  };

  return (
    <div className="p-4 relative pb-6 h-[100%] border border-[#ECECEC] rounded-2xl">
      <div
        className={cn(
          'w-12 h-8 text-white bg-[#D9D9D9] cursor-pointer rounded-2xl',
          'flex justify-center items-center text-2xl font-bold'
        )}
        onClick={goBack}
      >
        ←
      </div>

      <div className="flex justify-center items-center">
        <img src={selectedLogo} className={cn('w-8 h-8 object-contain')} />
        <div className={cn('font-base text-2xl mx-2 my-4')}>
          Balance: {balance}
        </div>
      </div>
      <div className=" flex justify-start text-center text-base pl-2 mb-2 mt-6">
        <div> Amount </div>
      </div>
      <div
        className={cn(
          'flex justify-between items-center',
          'h-12 rounded-2xl px-4 bg-[#E9E9E9] mb-2'
        )}
      >
        <input
          className={cn('h-[100%] w-[60%] bg-[#E9E9E9] text-left')}
          placeholder="Amount"
          style={{ outline: 'none' }}
          value={amount}
          onChange={handleChange}
        />
        <select
          className={cn('h-[100%] w-[40%] bg-[#E9E9E9] text-right')}
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <option value="matic">MATIC</option>
          <option value="usdt">USDT</option>
        </select>
      </div>
      <div className=" flex justify-start text-center text-base pl-2 mb-2">
        <div> Twitter or Address </div>
      </div>
      <div
        className={cn(
          'flex justify-between items-center',
          'h-12 rounded-2xl px-4 bg-[#E9E9E9] mb-2'
        )}
      >
        <input
          className={cn('h-[100%] w-[100%] bg-[#E9E9E9] text-left')}
          placeholder="@handle or address"
          style={{ outline: 'none' }}
          ref={twitterRef}
          onBlur={handleTwitterBlur} // 在失去焦点时调用获取目标地址的函数
        />
        <div
          className={cn(
            'absolute left-1/2 bottom-[-20px]',
            'px-2 py-1 bg-[#AEAFAE] rounded-xl text-white'
          )}
          style={{
            translate: '-50% 0',
          }}
        >
          ↓
        </div>
      </div>

      {targetAddress && (
        <div className=" flex justify-start text-center text-base pl-2 mb-2">
          <div> To Address: {targetAddress} </div>
        </div>
      )}

      <div
        className={cn(
          'absolute left-0 bottom-0',
          'w-[100%] h-12 text-center text-white  bg-black leading-[48px]',
          'rounded-b-3xl'
        )}
        onClick={handleSendToken}
      >
        Send
      </div>
    </div>
  );
}

export default SendToken;
