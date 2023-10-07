import { createSlice } from '@reduxjs/toolkit';
import { createRow, deleteRow, getListRows, updateRow } from '../thunks';
import { RootState } from '../store';
import { rowChildAdded, rowUpdate, rowDelete } from './midlwars/row';

export interface IRowTable {
  child: IRowTable[];
  equipmentCosts?: number; //Оборудование
  estimatedProfit?: number; //Сметная прибыль
  id?: number;
  machineOperatorSalary?: number;
  mainCosts?: number;
  materials?: number;
  mimExploitation?: number;
  overheads?: number; //Накладные расходы
  rowName?: string; //Наименование работ
  salary?: number; //Основная з/п
  supportCosts?: number;
  total?: number;
  shiftLeft?: number;
}

const initialState: {
  rows: IRowTable[];
  pending: boolean;
  error: boolean;
} = {
  rows: [],
  pending: false,
  error: false,
};

export const rows = createSlice({
  name: 'rows',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListRows.pending, (state) => {
        state.pending = true;
      })
      .addCase(getListRows.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.rows = payload;
      })
      .addCase(getListRows.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })

      .addCase(createRow.pending, (state) => {
        state.pending = true;
      })
      .addCase(createRow.fulfilled, (state, { payload }) => {
        const newRows = rowChildAdded(state.rows, payload[1] ?? 0, payload[0].current);
        state.pending = false;
        state.rows = newRows;
      })
      .addCase(createRow.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })

      .addCase(updateRow.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateRow.fulfilled, (state, { payload }) => {
        const newRows = rowUpdate(state.rows, payload[1] ?? 0, payload[0].current);
        state.pending = false;
        state.rows = newRows;
      })
      .addCase(updateRow.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })

      .addCase(deleteRow.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteRow.fulfilled, (state, { payload }) => {
        const newRows = rowDelete(state.rows, payload ?? 0);
        state.pending = false;
        state.rows = newRows;
      })
      .addCase(deleteRow.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const rowsArr = (state: RootState) => state.rows;
export default rows.reducer;
