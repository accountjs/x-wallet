import cn from 'classnames';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XWalletProviderContext } from '~popup/context';
import { NFT_ADDRESS } from '~popup/context/XWalletProvider';
import { addressFormat } from '~popup/utils';

function SendNFT() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, []);
  const { sendNFT, getXWalletAddress, appendRecord } = useContext(
    XWalletProviderContext
  );
  const [searchParams] = useSearchParams();
  const [targetAddress, setTargetAddress] = useState('');
  const [tokenId, setTokenId] = useState<string | null>(
    searchParams.get('tokenId')
  );
  const [tokenImage, setTokenImage] = useState<string | null>(
    searchParams.get('tokenImage')
  );
  const [targetHandle, setTargetHandle] = useState('');
  useEffect(() => {
    let tokenId = searchParams.get('tokenId');
    let tokenImage = searchParams.get('tokenImage');
    console.log(searchParams, tokenId, tokenImage);

    if (!tokenId) {
      setTokenId(tokenId);
    }
    if (!tokenImage) {
      setTokenImage(tokenImage);
    }
  }, []);
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
      <div className={cn('text-center font-bold text-xl mb-2')}>NFT</div>
      <div className={cn('relative mb-6')}>
        <img
          src={tokenImage}
          alt=""
          className={cn('m-auto w-28 h-28 rounded-3xl')}
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
          onBlur={handleTwitterBlur}
        />
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
          'rounded-b-3xl',
          'cursor-pointer'
        )}
        onClick={async () => {
          let hash = await sendNFT(NFT_ADDRESS, targetAddress, tokenId);
          appendRecord({
            timestamp: new Date().toString(),
            toTwitter: targetHandle,
            toAddress: targetAddress,
            amount: '0',
            currency: `NFT #${tokenId}`,
            hash,
          });
        }}
      >
        Send
      </div>
    </div>
  );
}

export default SendNFT;
