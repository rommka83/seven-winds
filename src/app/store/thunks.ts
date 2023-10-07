import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const ID = 110165;
const path = 'http://185.244.172.108:8081/v1/outlay-rows/entity/110165/row';

type rowCreateData = {
  rowName?: string;
  salary?: number;
  equipmentCosts?: number;
  overheads?: number;
  estimatedProfit?: number;
  parentId?: number;
  rID?: number;
  id?: number;
  child?: [
    {
      rowName?: string;
      salary?: number;
      equipmentCosts?: number;
      overheads?: number;
      estimatedProfit?: number;
      child?: [];
    }
  ];
};

export const getListRows = createAsyncThunk('rows/rows-get', async () => {
  const response = await axios.get(`${path}/list`);
  return response.data;
});

export const createRow = createAsyncThunk(
  'rows/rows-create',
  async ({
    rowName,
    child,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
    parentId,
    id,
  }: rowCreateData) => {
    if (!parentId) {
      window.location.reload();
    }
    const response = await axios.post(
      `${path}/create`,
      {
        equipmentCosts: equipmentCosts,
        estimatedProfit: estimatedProfit,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: overheads,
        parentId: parentId ?? id,
        rowName: rowName,
        salary: salary,
        supportCosts: 0,
        child: child,
      },
      {
        headers: { accept: '*/*', 'Content-Type': 'application/json' },
      }
    );

    return [response.data, parentId];
  }
);

export const updateRow = createAsyncThunk(
  'rows/rows-update',
  async ({ rowName, salary, equipmentCosts, overheads, estimatedProfit, rID }: rowCreateData) => {
    const response = await axios.post(
      `${path}/${rID}/update`,
      {
        equipmentCosts: equipmentCosts,
        estimatedProfit: estimatedProfit,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: overheads,
        rowName: rowName,
        salary: salary,
        supportCosts: 0,
      },
      {
        headers: { accept: '*/*', 'Content-Type': 'application/json' },
      }
    );

    window.location.reload();
    return [response.data, rID];
  }
);

export const deleteRow = createAsyncThunk('rows/rows-delet', async ({ rID }: rowCreateData) => {
  await axios.delete(`${path}/${rID}/delete`, {
    headers: { accept: '*/*' },
  });
  return rID;
});
