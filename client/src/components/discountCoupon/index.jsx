
import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder } from '../../redux/slices/orderSlice';
import { applyDiscount } from '../../redux/slices/basketSlice';
import styles from './styles.module.scss';
import catDog from '../../assets/icons/cat_dogs.svg';
import Input from '../../ui/input';
import ToggleButton from '../../ui/button';
import Modal from '../../ui/modal';

function Coupon() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.basket.items);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage1, setModalMessage1] = useState('');
  const [modalMessage2, setModalMessage2] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const checkIfNewUser = email => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return !users.includes(email);
  };

  function onSubmit(data) {
    const orderData = {
      name: data.name,
      phone: data.phone_number,
      email: data.email,
      products: items,
    };

    const isNewUser = checkIfNewUser(data.email);

    dispatch(sendOrder(orderData))
      .then(() => {
        if (isNewUser) {
          dispatch(applyDiscount());

          const users = JSON.parse(localStorage.getItem('users')) || [];
          users.push(data.email);
          localStorage.setItem('users', JSON.stringify(users));

          setModalMessage1('Your coupon has been successfully received!');
          setModalMessage2('Enjoy your 5% discount on your first order.');
        } else {
          setModalMessage1('Your order has been successfully placed!');
          setModalMessage2('Thank you for your order.');
        }
        setModalOpen(true);
        reset();
      })
      .catch(error => {
        console.error('There was an error sending the order:', error);
        setModalMessage1('There was an error processing your order.');
        setModalMessage2('Please try again later.');
        setModalOpen(true);
      });
  }

  return (
    <div className={styles.couponContainer}>
      <h1> 5% off on your first order</h1>
      <div className={styles.absolutCont}>
        <div className={styles.imgContainer}>
          <img src={catDog} alt="cat_dog" />
        </div>
        <form className={styles.requestForm} onSubmit={handleSubmit(onSubmit)}>
          <Input
            style={{
              backgroundColor: '#2451C6',
              marginBottom: '2.8%',
              
            }}
            {...register('name', { required: 'Name is required' })}
            placeholder="Your Name"
          />
          {errors.name && <p>{errors.name.message}</p>}

          <Input
            style={{ backgroundColor: '#2451C6', marginBottom: '2.8%' }}
            {...register('phone_number', {
              required: 'Phone number is required',
            })}
            placeholder="Phone Number"
          />
          {errors.phone_number && <p>{errors.phone_number.message}</p>}

          <Input
            style={{ backgroundColor: '#2451C6', marginBottom: '2.8%' }}
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
            style={{ minWidth: '100%' }}
          />
        </form>
      </div>

      {isModalOpen && (
        <Modal
          message1={modalMessage1}
          message2={modalMessage2}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Coupon;