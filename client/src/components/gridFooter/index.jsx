import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import instaIcon from '../../assets/icons/instagram.svg'
import whatsIcon from '../../assets/icons/whatsapp.svg';
import styles from './styles.module.scss'
const Item = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#F1F3F4',
  minHeight: '177px',
  padding: '2.8%',
  textAlign: 'start',
  boxShadow: 'none',
  '@media (max-width: 900px)': {
    minHeight: 'auto',
    padding: '5%',
  }
});
function GridFooter() {
  return (
    <Box sx={{ flexGrow: 1 }} className={styles.gridContainer}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Item className={styles.itemContwiner}>
            <p>Phone</p>
            <h1>+49 30 915-88492</h1>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Item>
            <p>Socials</p>
            <div className={styles.iconsContainer}>
              <img src={instaIcon} alt="insta" />
              <img src={whatsIcon} alt="whatsAp" />
            </div>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Item>
            <p>Address</p>
            <h1>Wallstraẞe 9-13, 10179 Berlin, Deutschland</h1>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Item>
            <p>Working Hours</p>
            <h1>24 hours a day</h1>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GridFooter;
