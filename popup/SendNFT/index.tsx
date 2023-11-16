import cn from 'classnames';
import qbrady_manga from 'data-base64:~popup/assets/svg/qbrady_manga.png';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SendNFT() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, []);

  const [targetAddress, setTargetAddress] = useState('');

  return (
    <div className="p-4 relative pb-6 h-[100%]">
      <div
        className={cn(
          'w-16 h-8 text-white bg-[#D9D9D9] cursor-pointer rounded-2xl',
          'flex justify-center items-center text-2xl font-bold'
        )}
        onClick={goBack}
      >
        ←
      </div>
      <div className={cn('text-center font-bold text-xl mb-2')}>NFT</div>
      <div className={cn('relative mb-6')}>
        <img
          src={qbrady_manga}
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
          'rounded-b-3xl'
        )}
      >
        Send
      </div>
    </div>
  );
}

export default SendNFT;
