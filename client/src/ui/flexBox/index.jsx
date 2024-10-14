import styles from './stylec.module.scss'
function FlexBox({ children }) {
  return <div className={styles.flexBox}>{ children}</div>
}
export default FlexBox