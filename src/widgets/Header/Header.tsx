import React from 'react';
import styles from './Header.module.scss';
import { TiArrowBack } from 'react-icons/ti';
import { CgMenuGridR } from 'react-icons/cg';
import classNames from 'classnames';
import { NawGorizontal } from '../../shared/NawGorizontal';
import { itemsNawGorizontal } from './Header.service';
import { IHeader } from './Header.types';

export function Header({ className }: IHeader) {
  return (
    <header className={classNames(styles.root, className)}>
      <div className={classNames(styles.wrapper, 'container')}>
        <CgMenuGridR className={styles.icon} />
        <TiArrowBack className={styles.icon} />
        <NawGorizontal items={itemsNawGorizontal} />
      </div>
    </header>
  );
}
