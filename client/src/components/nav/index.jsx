
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import styles from './steles.module.scss';

// function Nav() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);

//   };
//   function closeMenu() {
//   setIsMenuOpen(false)
// }
//   return (
//     <nav className={styles.navContainer}>
//       <div className={styles.hamburger} onMouseEnter={toggleMenu}>
//         <span className={styles.hamburgerLine}></span>
//         <span className={styles.hamburgerLine}></span>
//         <span className={styles.hamburgerLine}></span>
//         <span className={styles.hamburgerLine}></span>
//       </div>

//       <div
//         className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}
//         onMouseLeave={closeMenu}
//       >
//         <NavLink className={styles.link} to="/" onClick={toggleMenu}>
//           Main Page
//         </NavLink>
//         <NavLink className={styles.link} to="/categories" onClick={toggleMenu}>
//           Categories
//         </NavLink>
//         <NavLink
//           className={styles.link}
//           to="/all_products"
//           onClick={toggleMenu}
//         >
//           All products
//         </NavLink>
//         <NavLink className={styles.link} to="/discounts" onClick={toggleMenu}>
//           All sales
//         </NavLink>
//       </div>
//     </nav>
//   );
// }

// export default Nav;

import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './steles.module.scss';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Открытие/закрытие меню при клике на иконку
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Закрытие меню при клике вне его границ
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // Закрытие меню при наведении мыши (для десктопа)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </div>

      <div
        ref={menuRef} // Используем ref для ссылки на меню
        className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}
        onMouseLeave={closeMenu}
      >
        <NavLink className={styles.link} to="/" onClick={toggleMenu}>
          Main Page
        </NavLink>
        <NavLink className={styles.link} to="/categories" onClick={toggleMenu}>
          Categories
        </NavLink>
        <NavLink
          className={styles.link}
          to="/all_products"
          onClick={toggleMenu}
        >
          All products
        </NavLink>
        <NavLink className={styles.link} to="/discounts" onClick={toggleMenu}>
          All sales
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav;