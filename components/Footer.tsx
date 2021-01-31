import { BYSYKKEL_OPEN_API_URL } from '../shared/fetchHelpers';
import styles from '../styles/Footer.module.scss';
export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.description}>
        Tjenesten er basert på Oslo Bysykkel sine sanntidsdata
      </p>
      <a href={BYSYKKEL_OPEN_API_URL} target="_blank" rel="noreferrer">
        Les mer hos Oslo Bysykkel
      </a>
    </footer>
  );
};
