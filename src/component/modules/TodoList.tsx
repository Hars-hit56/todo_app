import {FlatList, View} from 'react-native';
import TodoCard from '../row/todoCard';
import EmptyList from './EmptyList';

type TodoListProps = {
  todos: Record<string, any>[];
  onPressTodoCard: (todo: Record<string, any>) => void;
  onPressCheckBox: (todo: Record<string, any>) => void;
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
