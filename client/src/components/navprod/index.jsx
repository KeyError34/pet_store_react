import { Link, useLocation } from 'react-router-dom';
const Nav = () => {
  const location = useLocation();

  // Разбиваем текущий путь на массив
  const paths = location.pathname.split('/').filter(Boolean);

  const isOnCategory = paths.length >= 1;
  const isOnProductList = paths.length >= 2;
  const isOnProductDetails = paths.length === 3;

  return (
    <nav>
      <ul className="nav-list">
        {isOnCategory && (<li>
            <Link to="/" className={paths.length === 0 ? 'active' : ''}>
              Categories List
            </Link>
          </li>
        )}
        {isOnProductList && (
          <li>
            <Link
              to={`/category/${paths[1]}`}
              className={paths.length === 2 ? 'active' : ''}
            >
              Product List
            </Link>
          </li>
        )}
        {isOnProductDetails && (
          <li>
            <Link
              to={`/category/product/${paths[2]}`}
              className={paths.length === 3 ? 'active' : ''}
            >
              Product Details
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;