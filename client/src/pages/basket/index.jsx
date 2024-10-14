import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearBasket,
  removeFromBasket,
  decrementQuantity,
  addToBasket,
} from '../../redux/slices/basketSlice';
import Modal from '../../ui/modal';

function Basket() {
  const dispatch = useDispatch();
  const { items, totalPrice, totalDiscount, totalQuantity } = useSelector(
    state => state.basket
  );
  const [modalOpen, setModalOpen] = React.useState(false);

  function handleClearBasket () {
    dispatch(clearBasket());
  };

  function handleCheckout (){
    setModalOpen(true);
    handleClearBasket(); 
  };

  function handleIncrement( item ) {
    dispatch(addToBasket(item)); 
  };

  function handleDecrement  (id ) {
    dispatch(decrementQuantity(id)); 
  };

  function handleRemove (id) {
    dispatch(removeFromBasket(id)); 
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div>
          {items.map(item => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>
                Price: ${item.price} x {item.quantity}
              </p>
              {item.discount_price && (
                <p>Discounted Price: ${item.discount_price}</p>
              )}
              <button onClick={() => handleIncrement(item)}>+</button>
              <button onClick={() => handleDecrement(item.id)}>-</button>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total Price: ${totalPrice}</h3>
          <h3>Total Discount: ${totalDiscount}</h3>
          <h3>Total Quantity: {totalQuantity}</h3>
          <button onClick={handleCheckout}>Place Order</button>
        </div>
      )}
      {modalOpen && (
        <Modal
          message1="Your order has been successfully placed on the website."
          massage2="A manager will contact you shortly to confirm your order."
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Basket;
