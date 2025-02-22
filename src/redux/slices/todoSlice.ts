import {createSlice} from '@reduxjs/toolkit';

interface initialStateInterface {}

const initialState: initialStateInterface = {
  todosData: [],
};

export const TODO_SLICE = createSlice({
  name: 'TODO_SLICE',
  initialState,
  reducers: {},
});

export const userRes = (state: any) => state.TODO_SLICE;

export const {} = TODO_SLICE.actions;

export default TODO_SLICE.reducer;
