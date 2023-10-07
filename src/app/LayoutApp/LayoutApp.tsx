import styles from './LayoutApp.module.scss';
import { ILayoutApp } from './LayoutApp.types';
import { Header } from '../../widgets/Header';
import { Dashboard } from '../../widgets/Dashboard';

export function LayoutApp({ children }: ILayoutApp) {
  return (
    <div className={styles.root}>
      <Header className={styles.header} />
      <Dashboard className={styles.dashboard} />
      <div className={styles.children}>{children}</div>
    </div>
  );
}
