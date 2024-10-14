import { Link, useLocation } from 'react-router-dom';
import styles from "./styles.module.scss";

const NavBred = () => {
  const categories = {
    1: 'Dry & Wet Food',
    2: 'Litter Boxes & Litter Trays',
    3: 'Baskets & Beds',
    4: 'Toys',
    5: 'Care & Grooming',
    6: 'Snacks & Supplements',
    7: 'Runs & Fencing',
    8: 'Trees & Scratching',
  };

  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean); 

  const categoryId = paths[1]; 
  const categoryName = categories[categoryId] || 'Unknown Category';

  return (
    <nav>
      <ul style={{ display: 'flex', alignItems: 'center' }}>
        <li>
          <Link to="/">Main Page</Link>
        </li>
        {paths[0] === 'categories' && (
          <>
            <span className={styles.line}></span>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
          </>
        )}
        {paths[0] === 'category' && (
          <>
            <span className={styles.line}></span>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <span className={styles.line}></span>
            <li>
              <Link to={`/category/${categoryId}`}>{categoryName}</Link>
            </li>
          </>
        )}
        {paths[0] === 'category' && paths.length === 3 && (
          <>
            <span className={styles.line}></span>
            <li>
              <Link to={`/category/${categoryId}`}>{categoryName}</Link>
            </li>
            <span className={styles.line}></span>
            <li>Product Details</li>
          </>
        )}
        {paths[0] === 'all_products' && (
          <>
            <span className={styles.line}></span>
            <li>
              <Link to="/all_products">All Products</Link>
            </li>
          </>
        )}
        {paths[0] === 'discounts' && (
          <>
            <span className={styles.line}></span>
            <li>
              <Link to="/discounts">All Sales</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBred;