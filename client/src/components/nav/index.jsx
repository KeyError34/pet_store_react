
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './steles.module.scss';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };
  function closeMenu() {
  setIsMenuOpen(false)
}
  return (
    <nav className={styles.navContainer}>
      <div className={styles.hamburger} onMouseEnter={toggleMenu}>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </div>

      <div
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