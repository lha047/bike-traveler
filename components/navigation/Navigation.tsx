import Link from 'next/link';
import styles from '../../styles/Navigation.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
export const Navigation = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  return (
    <>
      <button
        type={'button'}
        className={styles.button}
        onClick={() => setShowMenu(!showMenu)}
        aria-controls={'menu-list'}
        aria-expanded={showMenu}
      >
        Meny
      </button>
      {showMenu && (
        <ul id="menu-list" className={styles.ul}>
          <li className={styles.li}>
            <Link href={'/'}>
              <a
                href={'/'}
                onClick={() => setShowMenu(false)}
                className={`${styles.link} ${
                  router.pathname === '/' ? styles.active : ''
                }`}
              >
                Kart
              </a>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href={'/stations-list'}>
              <a
                href={'/stations-list'}
                onClick={() => setShowMenu(false)}
                className={`${styles.link} ${
                  router.pathname === '/stations-list' ? styles.active : ''
                }`}
              >
                Stasjonsliste
              </a>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};
