import errorImg from '../../assets/image/404.png';
import ToggleButton from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import styles from './steles.module.scss';
function ErrorPage() {
  const navigate = useNavigate()
  function onClickToHome() {
    navigate('/')
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div className={styles.MainError}>
        <img src={errorImg} alt="error" />
        <h1>Page Not Found</h1>
        <p>
          We're sorry, the page you requested could not be found. <br />
          Please go back to the homepage.
        </p>
        <ToggleButton
          initialText="Go Home"
          toggledText="Forward to Home"
          onClick={onClickToHome}
        />
      </div>
    </div>
  );
}
export default ErrorPage;
