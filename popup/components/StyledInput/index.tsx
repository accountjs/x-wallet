import type React from 'react';
import cn from 'classnames';

type PropsType = {
  label?: string;
  value?: string;
  suffix?: string | React.ReactNode;
  placeholder?: string;
  onChange?: (params?: any) => void;
};

const StyledInput = ({ label = 'laebl', value = '', onChange, suffix, placeholder }: PropsType) => {
  const handleChange = (e) => {
    console.log(e, 'eeee');
    onChange?.(e);
  };

  return (
    <div
      style={{
        width: '100',
        height: '48px',
        background: '#E9E9E9',
        display: 'flex',
        borderRadius: '18px',
      }}
    >
      <div
        className={cn(
          'flex-1 flex justify-between items-center',
          'w-[100%] h-12 rounded-2xl px-4 bg-[#E9E9E9] mb-2 text-[16px]'
        )}
      >
        {label}
        <input
          className={cn('h-[100%] w-[50%] bg-[#E9E9E9] text-right')}
          placeholder={placeholder}
          style={{ outline: 'none' }}
        />
      </div>
      {suffix}
    </div>
  );
};

export default StyledInput;
