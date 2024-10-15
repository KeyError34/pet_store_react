import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearBasket,
  removeFromBasket,
  decrementQuantity,
  addToBasket,
} from '../../redux/slices/basketSlice';
import Modal from '../../ui/modal';
import { useNavigate } from 'react-router-dom';
import styles from './steles.module.scss';
import Input from '../../ui/input';
import { useForm } from 'react-hook-form';
import ToggleButton from '../../ui/button';
function Basket() {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity, discountApplied } = useSelector(
    state => state.basket
  );
  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  function handleClearBasket() {
    dispatch(clearBasket());
  }

  function handleCheckout() {
    setModalOpen(true);
    handleClearBasket();
    reset();
  }

  function handleIncrement(item) {
    dispatch(addToBasket(item));
  }

  function handleDecrement(id) {
    dispatch(decrementQuantity(id));
  }

  function handleRemove(id) {
    dispatch(removeFromBasket(id));
  }
  function onClickToStore() {
    navigate('/all_products');
  }
  const safeTotalPrice = totalPrice > 0 ? totalPrice : 0;

  const discount = discountApplied ? safeTotalPrice * 0.03 : 0;
  const finalPrice = safeTotalPrice - discount;

  return (
    <div style={{ margin: '2.8%', width: '100%' }}>
      <div style={{ display: 'flex', marginBottom: '2.8%', alignItems: 'end' }}>
        <h1>Categories</h1>
        <div
          style={{
            height: '1px',
            backgroundColor: '#DDDDDD',
            width: '70%',
            marginBottom: '20px',
          }}
        ></div>
        <span className={styles.linkToallCategories} onClick={onClickToStore}>
          Back to the store
        </span>
      </div>
      {items.length === 0 ? (
        <div style={{ margin: '2%', fontSize: '26px', color: 'red' }}>
          Your cart is empty
        </div>
      ) : (
        <div className={styles.mainBasketItems}>
          <div className={styles.mainBasket}>
            {items.map(item => (
              <div className={styles.cartContainer} key={item.id}>
                <div className={styles.imgContainer}>
                  <img
                    src={`http://localhost:3333/${item.image}`}
                    alt={item.title}
                  />
                </div>

                <div className={styles.deskrCont}>
                  <h3 className={styles.titleDescr}>{item.title}</h3>
                  <div className={styles.countsCont}>
                    <span
                      className={styles.cstBtn}
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </span>

                    <h4
                      style={{
                        padding: '1% 15px',
                        borderTop: '0.5px solid #DDDDDD',
                        borderBottom: '0.5px solid #DDDDDD',
                        borderRadius: '4px',
                      }}
                    >
                      {item.quantity}
                    </h4>
                    <span
                      className={styles.cstBtn}
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </span>
                    <h4
                      className={styles.closeX}
                      onClick={() => handleRemove(item.id)}
                    >
                      x
                    </h4>
                    <h2 style={{ paddingLeft: '10%', fontSize: '34px' }}>
                      {' '}
                      ${item.price * item.quantity}{' '}
                    </h2>
                  </div>
                </div>
              </div>
            ))}{' '}
          </div>
          <div className={styles.orderCont}>
            <h1>Order details</h1>
            <label className={styles.labelPr}>
              {' '}
              Total items{' '}
              <span className={styles.totalQuantity}>{totalQuantity}</span>{' '}
            </label>
            <label className={styles.labelPr}>
              Total Price{' '}
              <span className={styles.totalQuantity}>
                ${safeTotalPrice.toFixed(2)}
              </span>{' '}
            </label>
            {discountApplied && (
              <label className={styles.labelPr}>
                New b -5%{' '}
                <span className={styles.totalQuantity}>
                  ${discount.toFixed(2)}
                </span>{' '}
              </label>
            )}
            <label className={styles.labelPr}>
              Final Price
              <span className={styles.totalQuantity}>
                ${finalPrice.toFixed(2)}
              </span>
            </label>

            <form
              className={styles.formCont}
              onSubmit={handleSubmit(handleCheckout)}
            >
              <Input
                style={{
                  marginBottom: '2.8%',
                  maxWidth: '400px',
                }}
                {...register('name', { required: 'Name is required' })}
                placeholder="Your Name"
              />
              {errors.name && <p>{errors.name.message}</p>}

              <Input
                style={{ marginBottom: '2.8%', maxWidth: '400px' }}
                {...register('phone_number', {
                  required: 'Phone number is required',
                })}
                placeholder="Phone Number"
              />
              {errors.phone_number && <p>{errors.phone_number.message}</p>}

              <Input
                style={{ marginBottom: '2.8%', maxWidth: '400px' }}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format',
                  },
                })}
                placeholder="Email"
              />
              {errors.email && <p>{errors.email.message}</p>}
              <ToggleButton
                type="submit"
                initialText="Get a discount"
                toggledText="Request Submitted"
                style={{ width: '100%', maxWidth: '400px' }}
              />
            </form>
          </div>
        </div>
      )}
      {modalOpen && (
        <Modal
          message1="Your order has been successfully placed on the website."
          message2="A manager will contact you shortly to confirm your order."
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Basket;
