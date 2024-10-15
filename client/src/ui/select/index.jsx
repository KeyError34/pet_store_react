import  { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss'; 

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const selectRef = useRef(null);

  function handleOptionClick  (option)  {
    setSelectedOption(option); 
    onChange(option); 
    setIsOpen(false); 
  };

  function handleClickOutside ( event ) {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <div className={styles.selectContainer} ref={selectRef}>
      <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption?.label || placeholder}{' '}

        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className={styles.optionsContainer}>
          {options.map(option => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
