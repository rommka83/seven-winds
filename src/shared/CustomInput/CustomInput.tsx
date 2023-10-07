import React from 'react';
import styles from './CustomInput.module.scss';
import { ICustomInput } from './CustomInput.types';
// import { nanoid } from 'nanoid';
import classNames from 'classnames';

export function CustomInput({ readonly, setValue, value }: ICustomInput) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue && setValue(e.target.value);

  return !readonly ? (
    <input
      type='text'
      onChange={(e) => handleChange(e)}
      value={value}
      className={classNames(styles.inp, styles.inpChange)}
    />
  ) : (
    <input type='text' readOnly value={value} className={classNames(styles.inp, styles.inpReadOnly)} />
  );
}
