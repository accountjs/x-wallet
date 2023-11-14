import { useMemo, useState } from 'react';
import BasePageWrap from '../BasePageWrap';
import StyledInput from '../StyledInput';
import StyledDesc from '../StyledDesc';
import SelectForm from '../Select';

const Send = () => {
  const [value, setValue] = useState();
  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    console.log(value, 'eeee');
  };

  // const Sufffix = () => {
  //   const list = ['eth', 'btc', 'okx'];

  //   return (
  //     <div>
  //       xxx
  //       {/* {list.map((item) => {
  //         <div key={item}>{item}</div>;
  //       })} */}
  //     </div>
  //   );
  // };

  const handleSelectChange = (e) => {};

  const options = [
    { label: 'btc', value: 'btc' },
    { label: 'eth', value: 'eth' },
  ];

  return (
    <BasePageWrap>
      <div>
        <StyledInput label="Amount" placeholder="amount" onChange={handleChange} value={value} />
        <StyledInput
          label="Twitter"
          placeholder="name or handle"
          onChange={handleChange}
          value={value}
          suffix={SelectForm({ value, options, onChange: handleSelectChange })}
        />
        <StyledDesc label="Target Address:" value={value} />
      </div>
    </BasePageWrap>
  );
};

export default Send;
