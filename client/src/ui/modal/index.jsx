import styles from './styles.module.scss'
function Modal({ message1, massage2, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1>Congratulations! </h1>
        <p>{message1}</p>
        <p>{massage2}</p>
        <span className={styles.close} onClick={onClose}>x</span>
      </div>
    </div>
  );
};

// const styles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modal: {
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '5px',
//     textAlign: 'center',
//   },
// };

export default Modal;
