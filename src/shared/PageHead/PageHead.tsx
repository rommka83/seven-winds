import styles from './PageHead.module.scss';
import { IPageHead } from './PageHead.types';

export function PageHead({ name }: IPageHead) {
  return (
    <div className={styles.head}>
      <p className={styles.namePage}>{name}</p>
    </div>
  );
}
