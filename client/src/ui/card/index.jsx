import { useState } from 'react';
import styles from './styles.module.scss';
import ToggleButton from '../button';
import { useNavigate } from 'react-router-dom';

function ProductCard({
  title,
  price,
  discont_price,
  image,
  navigatePath,
  onAddToCart,
  isCategoryButton,
  initialText,
  toggledText,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  
  function calculateDiscountPercentage(price, discountPrice) {
    if (discountPrice && price > 0) {
      return Math.round(((price - discountPrice) / price) * 100);
    }
    return null;
  }

  const discountPercentage = calculateDiscountPercentage(price, discont_price);

  function handleCardClick() {
    if (!isCategoryButton && navigatePath) {
      navigate(navigatePath);
    }
  }

  function handleButtonClick(e) {
    e.stopPropagation();
    if (isCategoryButton && navigatePath) {
      navigate(navigatePath);
    } else if (onAddToCart) {
      onAddToCart();
    }
  }

  return (
    <div
      className={styles.productCard}
      onClick={handleCardClick}
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
          price !== null && <p className={styles.productPrice}>${price}</p>
        )}
      </div>

      {isHovered && (
        <div
          className={styles.toggleButtonContainer}
          onClick={handleButtonClick}
        >
          <ToggleButton initialText={initialText} toggledText={toggledText} />
        </div>
      )}
    </div>
  );
}

export default ProductCard;
