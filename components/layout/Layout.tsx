import React, { PropsWithChildren } from 'react';
import { Navigation } from '../navigation/Navigation';
import styles from '../../styles/Home.module.scss';
import { MAIN_HEADING } from '../../shared/constants';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({
  children,
}: PropsWithChildren<LayoutProps>): JSX.Element => {
  return (
    <>
      <div className={styles.heading}>
        <h1 className={styles.title}>{MAIN_HEADING}</h1>
        <Navigation />
      </div>
      {children}
    </>
  );
};
