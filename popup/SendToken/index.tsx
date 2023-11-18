import cn from 'classnames';
import matic from 'data-base64:~popup/assets/svg/matic.png';
import usdt from 'data-base64:~popup/assets/svg/usdt.png';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XWalletProviderContext } from '~popup/context';
import { addressFormat } from '~popup/utils';

function SendToken(props: {}) {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, []);
  const [searchParams] = useSearchParams();
  const {
    ethBalance,
    usdtBalance,
    getXWalletAddress,
    appendRecord,
    sendETH,
    sendERC20,
    isSendLogin,
  } = useContext(XWalletProviderContext);

  const [balance, setBalance] = useState(ethBalance);
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('matic'); // 默认币种
  const [selectedLogo, setSelectedLogo] = useState(matic); // 显示目标地址
  const [targetHandle, setTargetHandle] = useState('');
  const [targetAddress, setTargetAddress] = useState('');

  useEffect(() => {
    let tokenType = searchParams.get('token').toLocaleLowerCase();
    if (tokenType != '') {
      setSelectedCurrency(tokenType);
      changeBalance(tokenType);
    } else {
      changeBalance(selectedCurrency);
    }
  }, []);

  const changeBalance = (currency: string) => {
    if (currency === 'matic') {
      setBalance(ethBalance);
      setSelectedLogo(matic);
    } else if (currency === 'usdt') {
      setBalance(usdtBalance);
      setSelectedLogo(usdt);
    } else {
      return;
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

  const handleSendToken = async () => {
    console.log(
      'Send',
      selectedCurrency,
      'Amount',
      amount,
      'To',
      targetAddress
    );

    if ('matic' == selectedCurrency) await sendETH(targetAddress, amount);
    else
      await sendERC20(
        '0x4aAeB0c6523e7aa5Adc77EAD9b031ccdEA9cB1c3',
        targetAddress,
        amount,
        18
      );
    appendRecord({
      timestamp: new Date().toString(),
      toTwitter: targetHandle,
      toAddress: targetAddress,
      amount,
      currency: selectedCurrency,
      hash: '0x',
    });
    goBack();
  };

  const twitterRef = useRef<HTMLInputElement>(null);
  const handleTwitterBlur = async () => {
    const twitterUsername = twitterRef.current?.value;
    console.log('Twitter Username', twitterUsername);
    if (/^0x[0-9a-fA-F]{40}$/.test(twitterUsername)) {
      setTargetHandle(twitterUsername);
      setTargetAddress(twitterUsername);
    } else {
      if (twitterUsername) {
        // 调用后台接口获取目标地址

        const data = await getXWalletAddress(twitterUsername);
        console.log('Target Address', data.account_address);
        setTargetAddress(data.account_address);

        let handle = twitterUsername; // if address, shorten
        if (handle.startsWith('0x') && handle.length > 16) {
          handle = addressFormat(handle);
        }
        setTargetHandle(handle);
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
      </div>

      <div className=" flex justify-start text-center text-base pl-2 mb-2">
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

      {targetAddress && (
        <div className=" flex justify-start text-center text-base pl-2 mb-4">
          <div> To Address: {addressFormat(targetAddress)} </div>
        </div>
      )}

      <button
        className={cn(
          'absolute left-0 bottom-0',
          'w-[100%] h-12 text-center text-white  bg-black leading-[48px]',
          'rounded-b-3xl',

          'flex justify-center items-center',
          isSendLogin ? 'bg-gray-500' : 'bg-black'
        )}
        disabled={isSendLogin}
        onClick={handleSendToken}
      >
        {isSendLogin ? 'Loading...' : 'Send'}
      </button>
    </div>
  );
}

export default SendToken;
