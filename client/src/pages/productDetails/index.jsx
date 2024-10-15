
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket } from '../../redux/slices/basketSlice';

function ProductDetails (){
  const { productId } = useParams(); 
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch()
 
  const product = categories
    .flatMap(category => category.data)
    .find(product => product.id === parseInt(productId));

  if (!product) {
    return (
      <div style={{ margin: '2%', fontSize: '26px', color: 'red' }}>
        No products available
      </div>
    );
  }
function handleAddToCart () {
  dispatch(addToBasket(product)); 
};

  return (
    <div>

      <h1>{product.title}</h1>
      <img src={`http://localhost:3333/${product.image}`} alt={product.title} />
      <p>{product.description}</p>
      <p>Цена: {product.price}</p>
      <button onClick={handleAddToCart}>Add to Basket</button>
    </div>
  );
};

export default ProductDetails;
