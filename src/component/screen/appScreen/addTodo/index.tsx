import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {addTodo, subscribeToTodos, updateTodo} from '../../../../firebaseCRUD';
import {APP_PADDING_HORIZONTAL} from '../../../../styles/commonStyles';
import {spacing} from '../../../../styles/spacing';
import colors from '../../../../utility/colors';
import {goBack} from '../../../../utility/commonFunction';
import {TodoOperation} from '../../../../utility/type/generalType';
import {AddTodoPayload} from '../../../../utility/type/payloadType';
import {isInputEmpty} from '../../../../utility/validation';
import Button from '../../../common/buttons/Button';
import AppContainer from '../../../common/container/AppContainer';
import Header from '../../../common/header/Header';
import TextInput from '../../../common/inputBoxes/TextInput';

type ParamsType = {
  params: {
    type: TodoOperation;
    recorrectData: Record<string, any>;
  };
};

const AddTodo = ({route}: any) => {
  const {params}: ParamsType = route;
  //state
  const [task, setTask] = useState(
    params.type === 'EDIT' ? params?.recorrectData?.payload?.title : '',
  );
  const [taskError, setTaskError] = useState('');
  const [isAddBtnLoading, setIsAddBtnLoading] = useState(false);
  const [todos, setTodos] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToTodos(setTodos);
    return () => unsubscribe();
  }, []);

  const onPressAddBtn = async () => {
    setIsAddBtnLoading(true);
    try {
      const validateTask = isInputEmpty(task);

      if (!validateTask.success) {
        setTaskError('Please enter your task');
      } else {
        setTaskError('');
      }
      if (!validateTask.success) return setIsAddBtnLoading(false);

      if (params.type === 'ADD') {
        const lastId =
          todos?.length > 0
            ? Math.max(
                ...todos?.map((todo: Record<string, any>) => todo?.payload?.id),
              )
            : 0;
        const payload: AddTodoPayload = {
          id: lastId + 1,
          title: task,
          completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        await addTodo(payload);
      } else {
        await updateTodo(params.recorrectData, task, 'EDIT');
      }
      goBack();
    } catch (error) {
    } finally {
      setIsAddBtnLoading(false);
    }
  };
  console.log(todos, 'todos', params.recorrectData);

  return (
    <AppContainer
      backgroundColor={colors.appBackgroundColor}
      statusBarColor={colors.white}>
      <Header title={'Add Todo'} />
      <View style={styles.seconderyContainer}>
        <TextInput
          label="Task"
          onChangeText={setTask}
          value={task}
          error={taskError}
          placeHolder={'Enter your task'}
        />
        <Button
          title="Add"
          buttonStyle={styles.addBtnStyle}
          onPressButton={onPressAddBtn}
          fetching={isAddBtnLoading}
        />
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  seconderyContainer: {
    flex: 1,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    marginTop: spacing.MARGIN_16,
  },
  addBtnStyle: {
    marginHorizontal: APP_PADDING_HORIZONTAL,
    marginTop: spacing.MARGIN_20,
  },
});

export default AddTodo;
