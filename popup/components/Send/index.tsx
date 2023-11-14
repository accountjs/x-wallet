import { useState } from 'react';
import cn from 'classnames';

import BasePageWrap from '../BasePageWrap';
import StyledInput from '../StyledInput';
import StyledDesc from '../StyledDesc';
import SelectForm from '../Select';

import ArrowDown from 'data-base64:~popup/assets/svg/arrow_down.svg';

const Send = () => {
  const [value, setValue] = useState();
  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    console.log(value, 'eeee');
  };

  const handleSelectChange = (e) => {};

  const options = [
    { label: 'BTC', value: 'btc' },
    { label: 'ETH', value: 'eth' },
    { label: 'BNB', value: 'bnb' },
  ];

  return (
    <BasePageWrap isBack>
      <div className="mx-[15px]">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '11px',
            position: 'relative',
          }}
        >
          <StyledInput label="Amount" placeholder="" onChange={handleChange} value={value} />
          <div
            className={cn(
              'absolute left-[50%] bottom-[50%] -translate-x-1/2 -translate-y-1/2',
              'flex w-[40px] h-[30px] justify-center items-center bg-[#AEAFAE] rounded-[10px] text-white'
            )}
          >
            <img src={ArrowDown} alt="" />
          </div>
          <StyledInput
            label="Twitter"
            placeholder="name or handle"
            onChange={handleChange}
            value={value}
            suffix={SelectForm({ value, options, onChange: handleSelectChange })}
          />
          <StyledDesc label="Target Address:" value={value} />
        </div>
        <div
          className={cn(
            'absolute left-0 bottom-0',
            'w-[350px] h-12 text-center text-white  bg-black leading-[48px]',
            'rounded-b-3xl'
          )}
        >
          Send
        </div>
      </div>
    </BasePageWrap>
  );
};

export default Send;
