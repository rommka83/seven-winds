import React from 'react';
import styles from './TemplateName.module.scss';
import { ITemplateName } from './TemplateName.types';

export function TemplateName({}: ITemplateName) {
  return <div className={styles.root}>TemplateName</div>;
}
