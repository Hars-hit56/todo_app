import {FlatList, View} from 'react-native';
import {TodoListData} from '../../utility/type/generalType';
import TodoCard from '../row/todoCard';
import EmptyList from './EmptyList';

type TodoListProps = {
  todos: TodoListData[];
  onPressTodoCard: (todo: TodoListData) => void;
  onPressCheckBox: (todo: TodoListData) => void;
};
const TodoList = ({todos, onPressTodoCard, onPressCheckBox}: TodoListProps) => {
  return (
    <View>
      <FlatList
        data={todos}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => (
          <TodoCard
            todo={item}
            index={index}
            key={'TodoCard' + index}
            lastIndex={todos.length}
            onPressTodoCard={onPressTodoCard}
            onPressCheckBox={onPressCheckBox}
          />
        )}
        ListEmptyComponent={<EmptyList msg="No todo data" />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TodoList;
