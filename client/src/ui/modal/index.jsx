import styles from './styles.module.scss';

function Modal({ message1, message2, onClose }) {
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1>Congratulations!</h1>
        <p>{message1}</p>
        <p>{message2}</p> 
        <span className={styles.close} onClick={onClose}>
          x
        </span>
      </div>
    </div>
  );
}

export default Modal;
