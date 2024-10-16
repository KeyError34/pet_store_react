import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
  decrementQuantity,
} from '../../redux/slices/basketSlice';
import styles from './styles.module.scss';
import { useState } from 'react';
function ProductDetails() {
  const { productId } = useParams();
  const categories = useSelector(state => state.categories.categories);
  const basketItems = useSelector(state => state.basket.items); // Получаем товары из корзины
  const dispatch = useDispatch();

  const product = categories
    .flatMap(category => category.data)
    .find(product => product.id === parseInt(productId));

  const basketProduct = basketItems.find(
    item => item.id === parseInt(productId)
  );
  const [isExpanded, setIsExpanded] = useState(false);
  if (!product) {
    return (
      <div style={{ margin: '2%', fontSize: '26px', color: 'red' }}>
        No products available
      </div>
    );
  }

  function handleAddToCart() {
    dispatch(addToBasket(product));
  }

  function handleIncrement() {
    dispatch(addToBasket(product));
  }

  function handleDecrement() {
    if (basketProduct && basketProduct.quantity > 1) {
      dispatch(decrementQuantity(product.id));
    } else {
      dispatch(removeFromBasket(product.id));
    }
  }
  const descriptionWords = product.description.split(' ');
  const visibleWords = isExpanded
    ? descriptionWords
    : descriptionWords.slice(0, 20);
  return (
    <div className={styles.mainDescription}>
      <div className={styles.imgContainer}>
        <img
          src={`https://olga-api.pet-shop.click/${product.image}`}
          alt={product.title}
        />
      </div>
      <div className={styles.mainAll}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.priceContainer}>
          {product.discont_price ? (
            <>
              <h1
                style={{
                  fontWeight: 'bold',

                  marginRight: '10px',
                }}
              >
                ${product.discont_price}
              </h1>
              <span
                style={{
                  textDecoration: 'line-through',
                  color: 'gray',
                  marginRight: '10px',
                }}
              >
                ${product.price}
              </span>
              <span className={styles.saleProsent}>
                -
                {Math.round(
                  ((product.price - product.discont_price) / product.price) *
                    100
                )}
                %
              </span>
            </>
          ) : (
            <h1 style={{ fontWeight: 'bold' }}>${product.price}</h1>
          )}
        </div>

        {basketProduct ? (
          <div className={styles.countsCont}>
            <span className={styles.cstBtn} onClick={handleDecrement}>
              -
            </span>
            <h3
              style={{
                padding: '10px 12px',
                borderTop: '0.5px solid #DDDDDD',
                borderBottom: '0.5px solid #DDDDDD',
                borderRadius: '4px',
                fontSize: '10px',
              }}
            >
              {basketProduct.quantity}
            </h3>
            <span className={styles.cstBtn} onClick={handleIncrement}>
              +
            </span>

            <h2 style={{ paddingLeft: '10%', fontSize: '34px' }}>
              $
              {basketProduct.quantity *
                (product.discont_price || product.price)}
            </h2>
          </div>
        ) : (
          <button onClick={handleAddToCart}>Add to Basket</button>
        )}

        <div style={{ maxWidth: '80%' }}>{visibleWords.join(' ')}</div>
        {descriptionWords.length > 20 && (
          <span
            className={styles.seeMore}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '...see less' : 'see more...'}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
