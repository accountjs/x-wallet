import type React from 'react';

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
    <div style={{ height: '48px', background: '#E9E9E9', display: 'flex', borderRadius: '18px' }}>
      <span
        style={{
          fontSize: '16px',
          fontWeight: 600,
          width: '150px',
          height: '48px',
          lineHeight: '48px',
          padding: '0 20px',
          boxSizing: 'content-box',
        }}
        className="test"
      >
        {label}
      </span>
      <input
        type="text"
        onChange={handleChange}
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
        placeholder={placeholder}
        value={value}
      />
      {suffix}
    </div>
  );
};

export default StyledInput;
