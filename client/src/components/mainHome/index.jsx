import { useNavigate } from 'react-router-dom';
import styles from './steles.module.scss';
import ToggleButton from '../../ui/button';
import CategoriesList from '../categoriesList';
import Box from '@mui/material/Box';
import Coupon from '../discountCoupon';
function Main() {
  const navigate = useNavigate();
  function onClick() {
    navigate('/discounts');
  }
  function onClickToAllCategories() {
     navigate('/categories')
  }
  return (
    <main>
      <div className={styles.banerContainer}>
        <div>
          <h1>
            Amazing Discounts <br /> on Pets Products!
          </h1>

          <ToggleButton
            onClick={onClick}
            initialText="Check out"
            toggledText="Check out"
          ></ToggleButton>
        </div>
      </div>

      <div className={styles.categoryContainer}>
        <div
          style={{ display: 'flex', marginBottom: '2.8%', alignItems: 'end' }}
        >
          <h1>Categories</h1>
          <div
            style={{
              height: '1px',
              backgroundColor: '#DDDDDD',
              width: '70%',
              marginBottom: '20px',
            }}
          ></div>
          <span className={styles.linkToallCategories} onClick={onClickToAllCategories}>
            All categories{' '}
          </span>
        </div>

        <Box
          className={styles.scrollContainer}
          sx={{
            display: 'flex',
            width: '100%',
            minHeight: 'max-content',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            padding: '16px',
            border: 'none',
            gap: '2%',
            scrollbarWidth: 'none',
          }}
        >
          <CategoriesList />
        </Box>
      </div>
      <div className={styles.discountCoupon}>
   
  <Coupon/>
      </div>
    </main>
  );
}
export default Main;
