import React from 'react';
import './styles.module.scss';

const Input = React.forwardRef(
  ({ type, value, onChange, placeholder, style, checked, name }, ref) => {
    return (
      <input
        style={style}
        type={type}
        value={type === 'checkbox' ? undefined : value}
        checked={type === 'checkbox' ? checked : undefined}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        required
        ref={ref} 
      />
    );
  }
);

export default Input;
