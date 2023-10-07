import { useState } from 'react';
import styles from './NawVertical.module.scss';
import { INawVertical } from './NawVertical.types';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { RiLayoutMasonryFill } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';

export function NawVertical({ items }: INawVertical) {
  const [active, setActive] = useState(4);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav className={styles.root}>
      <div className={styles.navHead} onClick={() => setIsOpen(!isOpen)}>
        <p className={styles.navHeadTitle}>Название проекта</p>
        <p className={styles.navHeadSubTitle}>Аббревиатура</p>
        {isOpen ? (
          <MdKeyboardArrowDown className={styles.arrow} />
        ) : (
          <MdKeyboardArrowUp className={styles.arrow} />
        )}
      </div>
      {isOpen && (
        <ul className={styles.list}>
          {items.map((item, index) => {
            return (
              <li
                className={classNames(styles.item, active === index && styles.itemActive)}
                key={nanoid()}
                onClick={() => setActive(index)}
              >
                <a href='#' className={styles.link}>
                  <RiLayoutMasonryFill className={styles.icon} />
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
