import React, { useEffect, useRef, useState } from 'react';
import styles from './RowTable.module.scss';
import classNames from 'classnames';
import { BiSolidFile } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { CustomInput } from '../CustomInput';
import { useAppDispatch } from '../../app/store/hooks';
import { updateRow, deleteRow, createRow } from '../../app/store/thunks';
import { IRowTable } from '../../app/store/slices/rowSlice';
import { nanoid } from '@reduxjs/toolkit';

export function RowTable(props: IRowTable) {
  const { child, rowName, salary, equipmentCosts, overheads, estimatedProfit, id, shiftLeft } = props;

  const dispath = useAppDispatch();

  const [editing, setEditing] = useState(rowName ? false : true);

  const [name, setName] = useState(rowName ? rowName : '');
  const [salaryUs, setSalary] = useState(salary ? salary : 0);
  const [equipmentCostsUs, setEquipmentCosts] = useState(equipmentCosts ? equipmentCosts : 0);
  const [overheadsUs, setOverheads] = useState(overheads ? overheads : 0);
  const [estimatedProfitUs, setEstimatedProfit] = useState(estimatedProfit ? estimatedProfit : 0);
  const [hoverIcon, setHoverIcon] = useState(false);

  const form = useRef<HTMLFormElement>(null);
  const parentItem = useRef<HTMLDivElement>(null);
  const childrenItem = useRef<HTMLDivElement>(null);
  const [shiftToTheLeft, setShiftToTheLeft] = useState(0);
  const [heigthVerticalLine, setHeigthVerticalLine] = useState(0);
  const [leftVerticalLine, setLeftVerticalLine] = useState(0);
  const [topVerticalLine, setTopVerticalLine] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    id
      ? dispath(
          updateRow({
            rowName: name,
            salary: salaryUs,
            equipmentCosts: equipmentCostsUs,
            overheads: overheadsUs,
            estimatedProfit: estimatedProfitUs,
            rID: id,
          })
        )
      : dispath(
          createRow({
            rowName: name,
            salary: salaryUs,
            equipmentCosts: equipmentCostsUs,
            overheads: overheadsUs,
            estimatedProfit: estimatedProfitUs,
            id: id,
          })
        );

    setEditing(false);
  };

  const rowAdded = () => {
    !editing &&
      dispath(
        createRow({
          rowName: '',
          salary: 0,
          equipmentCosts: 0,
          overheads: 0,
          estimatedProfit: 0,
          parentId: id,
          child: [{ rowName: '', salary: 0, equipmentCosts: 0, overheads: 0, estimatedProfit: 0, child: [] }],
        })
      );
  };

  const rowDeleted = () => {
    dispath(deleteRow({ rID: id }));
  };

  useEffect(() => {
    if (!form.current || !parentItem.current || !childrenItem.current) return;

    const shiftParent =
      parentItem.current.getBoundingClientRect().left - form.current.getBoundingClientRect().left;

    const heigth =
      childrenItem.current.getBoundingClientRect().top - parentItem.current.getBoundingClientRect().top;
    console.log(heigth);
    setShiftToTheLeft(shiftParent + 20);
    setHeigthVerticalLine(heigth);
    setTopVerticalLine(parentItem.current.getBoundingClientRect().bottom - 11);
    setLeftVerticalLine(parentItem.current.getBoundingClientRect().left + 22);
  }, []);

  return (
    <>
      <form
        className={classNames(styles.row)}
        onSubmit={handleSubmit}
        onDoubleClick={() => setEditing(!editing)}
        ref={form}
      >
        <div
          className={classNames(styles.col, shiftLeft && styles.iconFileChild)}
          style={{ left: shiftLeft && `${shiftLeft}px` }}
          ref={parentItem}
          onMouseOver={() => setHoverIcon(true)}
          onMouseOut={() => setHoverIcon(false)}
        >
          <BiSolidFile className={classNames(styles.iconFile)} onClick={rowAdded} />
          <RiDeleteBin6Fill
            className={classNames(styles.iconDel, hoverIcon && styles.iconDelActive)}
            onClick={rowDeleted}
          />
        </div>
        {child && (
          <div
            className={styles.verticalLine}
            style={{
              height: `${heigthVerticalLine}px`,
              left: `${leftVerticalLine}px`,
              top: `${topVerticalLine}px`,
            }}
          ></div>
        )}
        {editing ? (
          <>
            <CustomInput value={name} setValue={(e) => setName(e)} />
            <CustomInput value={salaryUs} setValue={(e) => setSalary(+e)} />
            <CustomInput value={equipmentCostsUs} setValue={(e) => setEquipmentCosts(+e)} />
            <CustomInput value={overheadsUs} setValue={(e) => setOverheads(+e)} />
            <CustomInput value={estimatedProfitUs} setValue={(e) => setEstimatedProfit(+e)} />
          </>
        ) : (
          <>
            <CustomInput readonly value={name} />
            <CustomInput readonly value={salaryUs} />
            <CustomInput readonly value={equipmentCostsUs} />
            <CustomInput readonly value={overheadsUs} />
            <CustomInput readonly value={estimatedProfitUs} />
          </>
        )}
        <button
          type='submit'
          value=''
          style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0 }}
        />
      </form>
      {child?.map((el: IRowTable, index: number) => (
        <div ref={index === child.length - 1 ? childrenItem : null} key={nanoid()}>
          <RowTable
            id={el.id}
            child={el.child}
            rowName={el.rowName}
            salary={el.salary}
            equipmentCosts={el.equipmentCosts}
            overheads={el.overheads}
            estimatedProfit={el.estimatedProfit}
            shiftLeft={shiftToTheLeft}
          />
        </div>
      ))}
    </>
  );
}
