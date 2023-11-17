import cn from 'classnames';
import moment from 'moment';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XWalletProviderContext } from '~popup/context';
import { useConfigStore } from '~popup/store';

// interface HistoryItem {
//   token: string;
//   amount: string;
// }

// interface TimeItem {
//   time: string;
//   history: HistoryItem[];
// }

function HistoryBox() {
  const { txRecords } = useContext(XWalletProviderContext);
  const { isShowMoney } = useConfigStore();

  const navigate = useNavigate();

  const toTransactionDetail = useCallback((hash: `0x${string}`) => {
    navigate(`/transactionDetail?hash=${hash}`);
  }, []);

  return (
    <div className="bg-[#E9E9E9] text-center px-5 py-4 h-[170px] relative rounded-b-2xl overflow-x-hidden overflow-y-scroll ">
      { !txRecords || txRecords.length === 0 ? (
        <div
          className={cn(
            'absolute bottom-2 left-4',
            'text-sm font-semibold cursor-pointer',
            'flex justify-center items-center',
            'h-10 w-[320px] px-6 py-2 mb-3 rounded-2xl bg-white opacity-30'
          )}
        >
          X-wallet support
        </div>
      ) : (
        <div className='overflow-hidden'>
          {txRecords.map((item) => (
            <>
              <div className={cn('text-left text-[#979797] mb-3')}>
                {moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')}
              </div>
              <div
                key={item.hash}
                className={cn(
                  'text-sm font-semibold cursor-pointer',
                  'flex justify-between items-center',
                  'h-10 w-[100%] px-6 py-2 mb-3 rounded-2xl bg-white'
                )}
                onClick={(i) =>
                  toTransactionDetail(
                    '0x9628815ffa0a91bb4ee0e5b5dc25b84c1c0ebd1d1b76975fb6961397f8bac1f3'
                  )
                }
              >
                <span>{item.toTwitter}</span>
                <span
                  className={cn({
                    'text-[#4CBC17]': !!item.amount,
                    'text-[#B82929]': !item.amount,
                  })}
                >
                  {item.amount ? 
                    isShowMoney ? item.amount : '*** ' 
                    : ' '} 
                  {item.currency.toUpperCase()}           
                </span>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryBox;
