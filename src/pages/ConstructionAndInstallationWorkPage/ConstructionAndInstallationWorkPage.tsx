import React, { useEffect } from 'react';
import styles from './ConstructionAndInstallationWorkPage.module.scss';
import { PageHead } from '../../shared/PageHead';
import classNames from 'classnames';
import { nanoid } from 'nanoid/non-secure';
import { headerTableTitle } from './ConstructionAndInstallationWorkPage.service';
import { RowTable } from '../../shared/RowTable';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { IRowTable, rowsArr } from '../../app/store/slices/rowSlice';
import { getListRows } from '../../app/store/thunks';

export function ConstructionAndInstallationWorkPage() {
  const dispath = useAppDispatch();
  const { rows } = useAppSelector(rowsArr);

  useEffect(() => {
    dispath(getListRows());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.root}>
      <PageHead name='Строительно-монтажные работы' />
      <ul className={styles.table}>
        <li className={styles.tableItem}>{rowHeadRender(headerTableTitle)}</li>

        {!rows.length ? (
          <li className={styles.tableItem}>
            <RowTable child={[]} />
          </li>
        ) : (
          rows.map((row: IRowTable) => {
            return (
              <li className={styles.tableItem} key={nanoid()}>
                <RowTable
                  child={row.child}
                  rowName={row.rowName}
                  salary={row.salary}
                  equipmentCosts={row.equipmentCosts}
                  overheads={row.overheads}
                  estimatedProfit={row.estimatedProfit}
                  id={row.id}
                />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

const rowHeadRender = (arr: string[]) => {
  return (
    <ul className={classNames(styles.row, styles.rowHead)}>
      {arr.map((item) => {
        return (
          <li key={nanoid()} className={styles.col}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};
