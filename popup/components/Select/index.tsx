import React, { useState } from 'react';
import TriangleDown from 'data-base64:~popup/assets/svg/triangle_down.svg';

interface Option {
  value: string;
  label: string;
}

interface SelectFormProps {
  value?: string;
  options: Option[];
  onChange?: (value: string) => void;
}

const SelectForm: React.FC<SelectFormProps> = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || options[0].label);

  const handleOptionClick = (optionValue: string) => {
    const selected = options.find((item) => item.value == optionValue);
    setSelectedOption(selected.label);
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '60px',
        height: '48px',
        backgroundColor: '#d9d9d9',
        color: '#5B6A78',
        borderRadius: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={handleToggleClick}
    >
      <div>{selectedOption}</div>
      {isOpen && (
        <div style={{ position: 'absolute', top: '0', left: '0', zIndex: 1, borderRadius: '18px' }}>
          {options.map((option) => (
            <div
              className="first:rounded-tl-2xl first:rounded-tr-2xl border-b last:border-0 last:border-b-0 last:rounded-bl-2xl last:rounded-br-2xl"
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              style={{
                width: '60px',
                height: '48px',
                backgroundColor: '#D9D9D9',
                color: '#5B6A78',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '4px',
          transform: 'translate(-50%)',
        }}
      >
        {isOpen ? '▲' : <img src={TriangleDown} alt="" />}
      </div>
    </div>
  );
};

export default SelectForm;
