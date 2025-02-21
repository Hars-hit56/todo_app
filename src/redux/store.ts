import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {LOGIN_API} from './api/auth/login/login.api';
import {TODO_SLICE} from './slices/todoSlice';

const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

const combinedReducer = combineReducers({
  [LOGIN_API.reducerPath]: LOGIN_API.reducer,

  [TODO_SLICE.name]: TODO_SLICE.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      LOGIN_API.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
