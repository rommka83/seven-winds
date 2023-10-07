import React, { useState } from 'react';
import styles from './NawGorizontal.module.scss';
import { INawGorizontal } from './NawGorizontal.types';
import { nanoid } from 'nanoid';
import classNames from 'classnames';

export function NawGorizontal({ items }: INawGorizontal) {
  const [active, setActive] = useState(0);
  return (
    <nav className={styles.root}>
      <ul className={styles.list}>
        {items.map((item, index) => {
          return (
            <li
              className={classNames(styles.item, active === index && styles.itemActive)}
              key={nanoid()}
              onClick={() => setActive(index)}
            >
              <a href='#'>{item}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
