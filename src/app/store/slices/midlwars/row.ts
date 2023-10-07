import { IRowTable } from '../rowSlice';

export const rowChildAdded = (arr: IRowTable[], id: number, children: IRowTable): IRowTable[] => {
  const newArr = arr.map((row) => {
    let newRow: IRowTable;

    if (row.id === id) {
      const newChild = row.child ? [...row.child, children] : [children];
      newRow = { ...row, child: newChild };
      return newRow;
    } else if (row.child && row.child.length) {
      const [comp] = row.child.map(() => rowChildAdded(row.child, id, children));
      newRow = { ...row, child: comp };
    } else {
      return (newRow = row);
    }

    return newRow;
  });

  return newArr;
};

export const rowUpdate = (arr: IRowTable[], id: number, rowUp: IRowTable): IRowTable[] => {
  const newArr: IRowTable[] = arr.map((row: IRowTable): IRowTable => {
    let newRow: IRowTable;

    if (!row.child) {
      return (newRow =
        row.id === id
          ? {
              ...row,
              equipmentCosts: rowUp.equipmentCosts,
              estimatedProfit: rowUp.estimatedProfit,
              overheads: rowUp.overheads,
              rowName: rowUp.rowName,
              salary: rowUp.salary,
              id: rowUp.id,
            }
          : row);
    } else if (row.id === id) {
      return (newRow = {
        ...row,
        equipmentCosts: rowUp.equipmentCosts,
        estimatedProfit: rowUp.estimatedProfit,
        overheads: rowUp.overheads,
        rowName: rowUp.rowName,
        salary: rowUp.salary,
      });
    } else {
      !row.child && { ...row, child: [] };
      const [comp] = row.child.map(() => {
        return rowUpdate(row.child, id, rowUp);
      });
      newRow = { ...row, child: comp };
    }

    return newRow;
  });

  return newArr;
};

export const rowDelete = (arr: IRowTable[], index: number): IRowTable[] => {
  return arr.reduce((acc: IRowTable[], curVal) => {
    if (curVal.id === index) {
      return acc;
    } else if (curVal.child && curVal.child.length) {
      return [...acc, { ...curVal, child: rowDelete(curVal.child, index) }];
    } else if (curVal.id !== index) {
      acc.push(curVal);
      return acc;
    } else {
      return acc;
    }
  }, []);
};
