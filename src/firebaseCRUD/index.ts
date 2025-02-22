import firestore from '@react-native-firebase/firestore';
import {AddTodoPayload} from '../utility/type/payloadType';

export const addTodo = async (payload: AddTodoPayload) => {
  try {
    await firestore().collection('Todos').add({payload});
  } catch (error) {
    console.error('Error adding user:', error);
  }
};
export const updateTodo = async (
  recorrectData: Record<string, any>,
  task?: string,
  type?: string,
) => {
  try {
    if (type === 'EDIT') {
      await firestore()
        .collection('Todos')
        .doc(recorrectData.id.toString())
        .update({
          payload: {
            ...recorrectData.payload,
            title: task,
            updated_at: new Date().toISOString(),
          },
        });
    } else {
      await firestore()
        .collection('Todos')
        .doc(recorrectData.id.toString())
        .update({
          payload: {
            ...recorrectData.payload,
            completed: !recorrectData?.payload?.completed,
          },
        });
    }
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const subscribeToTodos = (
  setTodosData: (todos: Record<string, any>[]) => void,
) => {
  return firestore()
    .collection('Todos')
    .onSnapshot(snapshot => {
      const todosList: Record<string, any>[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodosData(todosList);
    });
};

export const deleteTodo = async (todoData: Record<string, any>) => {
  try {
    await firestore().collection('Todos').doc(todoData.id.toString()).delete();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
