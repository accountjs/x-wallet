import React, { useState } from 'react';

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
  const [selectedOption, setSelectedOption] = useState(value || options[0].value);

  const handleOptionClick = (optionValue: string) => {
    setSelectedOption(optionValue);
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={handleToggleClick}>{selectedOption}</div>
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0 }}>
          {options.map((option) => (
            <div key={option.value} onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          top: '50%%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {isOpen ? '▲' : '▼'}
      </div>
    </div>
  );
};

export default SelectForm;
