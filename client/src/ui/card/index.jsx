
import { useState } from 'react';
import styles from './styles.module.scss';
import ToggleButton from '../button';

function ProductCard({
  title,
  price,
  discont_price,
  image,
  onClick,
  onAddToCart,
}) {
  const [isHovered, setIsHovered] = useState(false);

  function calculateDiscountPercentage(price, discountPrice) {
    if (discountPrice && price > 0) {
      return Math.round(((price - discountPrice) / price) * 100);
    }
    return null;
  }

  const discountPercentage = calculateDiscountPercentage(price, discont_price);

  return (
    <div
      className={styles.productCard}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={title} className={styles.productImage} />
      <h3 className={styles.productTitle}>{title}</h3>
      <div className={styles.pricesContainer}>
        {discont_price !== null ? (
          <>
            <p className={styles.productDiscountPrice}>${discont_price}</p>
            <p className={styles.productOriginalPrice}>
              <s>${price}</s>
            </p>
            {discountPercentage !== null && (
              <p className={styles.productDiscountPercentage}>
                -{discountPercentage}%
              </p>
            )}
          </>
        ) : (
          <p className={styles.productPrice}>${price}</p>
        )}
      </div>

      {isHovered && (
        <div
          className={styles.toggleButtonContainer}
          onClick={e => {
            e.stopPropagation(); 
          
          }}
        >
          <ToggleButton
            initialText="Add to Cart"
            toggledText="Added"
            onClick={e => {
             
              onAddToCart(); 
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProductCard;