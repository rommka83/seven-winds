import styles from './Dashboard.module.scss';
import { IDashboard } from './Dashboard.types';
import classNames from 'classnames';
import { NawVertical } from '../../shared/NawVertical';
import { itemsNawVertical } from './Dashboard.service';

export function Dashboard({ className }: IDashboard) {
  return (
    <div className={classNames(styles.root, className)}>
      <NawVertical items={itemsNawVertical} />
    </div>
  );
}
