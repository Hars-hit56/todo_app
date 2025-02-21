import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {addTodo, editTodo} from '../../../../redux/slices/todoSlice';
import {APP_PADDING_HORIZONTAL} from '../../../../styles/commonStyles';
import {spacing} from '../../../../styles/spacing';
import colors from '../../../../utility/colors';
import {goBack} from '../../../../utility/commonFunction';
import {
  TodoListData,
  TodoOperation,
} from '../../../../utility/type/generalType';
import {AddTodoPayload} from '../../../../utility/type/payloadType';
import {isInputEmpty} from '../../../../utility/validation';
import Button from '../../../common/buttons/Button';
import AppContainer from '../../../common/container/AppContainer';
import Header from '../../../common/header/Header';
import TextInput from '../../../common/inputBoxes/TextInput';

type ParamsType = {
  params: {
    type: TodoOperation;
    recorrectData: TodoListData;
  };
};

const AddTodo = ({route}: any) => {
  const {params}: ParamsType = route;
  const dispatch = useDispatch();
  //state
  const [task, setTask] = useState(
    params.type === 'EDIT' ? params.recorrectData.title : '',
  );
  const [taskError, setTaskError] = useState('');
  const [isAddBtnLoading, setIsAddBtnLoading] = useState(false);

  const {todosData} = useSelector(
    (state: any) => ({
      todosData: state.TODO_SLICE.todosData,
    }),
    shallowEqual,
  );

  const onPressAddBtn = () => {
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
        const payload: AddTodoPayload = {
          userId: 1,
          id: todosData?.length + 1,
          title: task,
          completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        dispatch(addTodo({todosData: payload}));
      } else {
        const payload = {
          ...params.recorrectData,
          updated_at: new Date().toISOString(),
          title: task,
        };
        console.log('payload', payload);

        dispatch(editTodo({editTodoData: payload}));
      }
      goBack();
    } catch (error) {
    } finally {
      setIsAddBtnLoading(false);
    }
  };
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
