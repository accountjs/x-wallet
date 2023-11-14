import type React from 'react';

type PropsType = {
  label?: string;
  value?: string;
  suffix?: string | React.ReactNode;
};

const StyledDesc = ({ label = 'laebl', value = '', suffix }: PropsType) => {
  return (
    <div
      style={{
        width: '100%',
        height: '48px',
        background: '#E9E9E9',
        display: 'flex',
        borderRadius: '18px',
      }}
    >
      <span
        style={{
          fontSize: '16px',
          fontWeight: 600,
          width: '150px',
          height: '48px',
          lineHeight: '48px',
          padding: '0 10px',
          boxSizing: 'content-box',
        }}
        className="whitespace-nowrap "
      >
        {label}
      </span>
      <input
        type="text"
        disabled
        style={{
          flex: 1,
          fontSize: '16px',
          border: 'none',
          background: 'none',
          padding: 'none',
          margin: 'none',
          outline: 'none',
          height: '48px',
          lineHeight: '48px',
        }}
        value={value}
      />
      {suffix}
    </div>
  );
};

export default StyledDesc;
