import styles from './steles.module.scss';
import MapComponent from '../map';
import GridFooter from '../gridFooter';
function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <h1>Contact</h1>
      
        <GridFooter />
      
      <div className={styles.mapContainer}>
        <MapComponent />
      </div>
    </footer>
  );
}
export default Footer;
