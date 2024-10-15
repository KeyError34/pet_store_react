import styles from './stylec.module.scss'
function FlexBox({style, children }) {
  return <div style={style} className={styles.flexBox}>{ children}</div>
}
export default FlexBox