// import React from 'react';
// import FlexBox from '../../ui/flexBox';
// import ProductCard from '../../ui/card';
// import { useDispatch } from 'react-redux';
// import { addToBasket } from '../../redux/slices/basketSlice';

// const DiscountedProducts = ({ products, visibleItem, loadMore, style }) => {
//   const dispatch = useDispatch();

//   function handleAddToCart(product) {
//     dispatch(addToBasket(product));
//   }

//   return (
//     <div>
//       <FlexBox style={style}>
//         {products.length === 0 ? (
//           <div style={{ margin: '2%', fontSize: '26px', color: 'red' }}>
//             No products available
//           </div>
//         ) : (
//           products.slice(0, visibleItem).map(product => (
//             <ProductCard
//               key={product.id}
//               title={product.title}
//               price={product.price}
//               discont_price={product.discont_price}
//               image={`http://localhost:3333/${product.image}`}
//               navigatePath={`/category/product/${product.id}`}
//               onAddToCart={() => handleAddToCart(product)}
//               initialText="Add to Cart"
//               toggledText="Added"
//               isCategoryButton={false}
//             />
//           ))
//         )}
//       </FlexBox>

//       {visibleItem < products.length && (
//         <div
//           style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}
//         >
//           <span
//             style={{ cursor: 'pointer', padding: '5px 8px' }}
//             onClick={loadMore}
//           >
//             more sales items...
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DiscountedProducts;
import React from 'react';
import FlexBox from '../../ui/flexBox';
import ProductCard from '../../ui/card';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../../redux/slices/basketSlice';

const DiscountedProducts = ({
  products,
  visibleItem,
  loadMore,
  display = 'flex',
  style
}) => {
  const dispatch = useDispatch();

  function handleAddToCart(product) {
    dispatch(addToBasket(product));
  }

  return (
    <div>
      <FlexBox style={style}>
        {products.length === 0 ? (
          <div style={{ margin: '2%', fontSize: '26px', color: 'red' }}>
            No products available
          </div>
        ) : (
          products
            .slice(0, visibleItem)
            .map(product => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                discont_price={product.discont_price}
                image={`http://localhost:3333/${product.image}`}
                navigatePath={`/category/product/${product.id}`}
                onAddToCart={() => handleAddToCart(product)}
                initialText="Add to Cart"
                toggledText="Added"
                isCategoryButton={false}
              />
            ))
        )}
      </FlexBox>

      {visibleItem < products.length && (
        <div
          style={{
            display: display, // Передаём строку display
            justifyContent: 'center',
            margin: '10px',
          }}
        >
          <span
            style={{
              display: display, // Передаём строку display
              cursor: 'pointer',
              padding: '5px 8px',
            }}
            onClick={loadMore}
          >
            more sales items...
          </span>
        </div>
      )}
    </div>
  );
};

export default DiscountedProducts;