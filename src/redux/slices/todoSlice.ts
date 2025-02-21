import {createSlice} from '@reduxjs/toolkit';
import {KEY_TODOS_DATA} from '../../utility/constants';
import {storeItem} from '../../utility/customAsyncStorage';
import {TodoListData} from '../../utility/type/generalType';

interface initialStateInterface {
  todosData: TodoListData[];
}

const initialState: initialStateInterface = {
  todosData: [],
};

export const TODO_SLICE = createSlice({
  name: 'TODO_SLICE',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const {todosData} = state;
      const {todosData: newTodoData, allTodosData} = action?.payload;
      if (todosData.length) {
        const tempTodos = [newTodoData, ...todosData];
        storeItem(KEY_TODOS_DATA, tempTodos);
        state.todosData = tempTodos;
      } else {
        if (Array.isArray(allTodosData)) {
          // for storing local storage data into redux states
          state.todosData = allTodosData as [];
          storeItem(KEY_TODOS_DATA, allTodosData);
        } else {
          // for storing new data into redux states
          state.todosData.push(newTodoData);
          storeItem(KEY_TODOS_DATA, [newTodoData]);
        }
      }
      return state;
    },
    toggleTodo: (state, action) => {
      const {updateTodoData} = action.payload;
      state.todosData = state.todosData.map(todo =>
        todo.id === updateTodoData.id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      );
      storeItem(KEY_TODOS_DATA, state.todosData);
    },

    deleteTodo: (state, action) => {
      const {deleteTodoData} = action.payload;
      state.todosData = state.todosData.filter(
        todo => todo.id !== deleteTodoData.id,
      );
      storeItem(KEY_TODOS_DATA, state.todosData);
    },

    editTodo: (state, action) => {
      const {editTodoData} = action.payload;
      state.todosData = state.todosData.map(todo =>
        todo.id === editTodoData.id
          ? {
              ...todo,
              title: editTodoData.title,
              updated_at: new Date().toISOString(),
            }
          : todo,
      );
      storeItem(KEY_TODOS_DATA, state.todosData);
    },
  },
});

export const userRes = (state: any) => state.TODO_SLICE;

export const {addTodo, toggleTodo, deleteTodo, editTodo} = TODO_SLICE.actions;

export default TODO_SLICE.reducer;
