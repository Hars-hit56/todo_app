import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TODO_SLICE} from './slices/todoSlice';

const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

const combinedReducer = combineReducers({
  [TODO_SLICE.name]: TODO_SLICE.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
