import './styles.module.scss'
function Input({ type, value, onChange, placeholder, style, checked, name }) {
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
    />
  );
}

export default Input;
