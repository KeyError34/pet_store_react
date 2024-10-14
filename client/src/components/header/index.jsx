import logoMain from '../../assets/icons/logoMain.svg';
import basket from '../../assets/icons/basket.svg';
import Nav from '../nav';
import { NavLink } from 'react-router-dom';
import styles from './steles.module.scss';
import { useSelector } from 'react-redux';
function Header() {
   const { totalQuantity } = useSelector(state => state.basket);
  return (
    <header className={styles.headerContainer}>
      <NavLink className={styles.logoImg} to="/">
        <img src={logoMain} alt="logo" />
      </NavLink>
      <Nav />
      <NavLink className={styles.basketImg} to="/basket">
        <img src={basket} alt="basket" />
        <span className={styles.warenCount}>{totalQuantity}</span>
      </NavLink>
    </header>
  );
}
export default Header;
