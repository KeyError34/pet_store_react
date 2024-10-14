import './styles.module.scss';
import { useState } from 'react';
function ToggleButton({ initialText, toggledText, onClick, style }) {
  const [isToggled, setIsToggled] = useState(false);

  function handleClick ()  {
    setIsToggled(!isToggled);
    if (onClick) {
      onClick();
    }
  };

  return (
    <button 
      onClick={handleClick}
    >
      {isToggled ? toggledText : initialText}
    </button>
  );
}
export default ToggleButton;
