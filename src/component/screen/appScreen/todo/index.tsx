import {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  deleteTodo,
  subscribeToTodos,
  updateTodo,
} from '../../../../firebaseCRUD';
import commonStyle, {
  APP_PADDING_HORIZONTAL,
} from '../../../../styles/commonStyles';
import {boxShadowTwo} from '../../../../styles/Mixins';
import {textScale} from '../../../../styles/responsiveStyles';
import {spacing} from '../../../../styles/spacing';
import {fontNames} from '../../../../styles/typography';
import colors from '../../../../utility/colors';
import {navigate} from '../../../../utility/commonFunction';
import {SCREEN_ADD_TOTO} from '../../../../utility/constants';
import {Images} from '../../../../utility/imagePaths';
import {FILTER_TAB_DATA, SORT_TODO} from '../../../../utility/utilityData';
import FabButton from '../../../common/buttons/FabButton';
import AppContainer from '../../../common/container/AppContainer';
import Image from '../../../common/Image';
import RegularText from '../../../common/RegularText';
import Title from '../../../common/Title';
import ItemPickerModal from '../../../modals/ItemPickerModal';
import TodoActionModal from '../../../modals/TodoActionModal';
import Tab from '../../../modules/Tab';
import TodoList from '../../../modules/TodoList';

const Todo = () => {
  // state
  const [activeTab, setActiveTab] = useState('');
  const [sortedByText, setSortedByText] = useState<Record<string, string>>({});
  const [todosData, setTodosData] = useState<Record<string, any>[]>([]);
  const [todos, setTodos] = useState<Record<string, any>[]>([]);
  const [todoRecorrectData, setTodoRecorrectData] = useState<
    Record<string, any>
  >([]);

  const [showActionModal, setShowActionModal] = useState(false);
  const [showItemPickerModal, setShowItemPickerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActiveTab(FILTER_TAB_DATA[0].tabName);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToTodos(todos => {
      setTodosData(todos);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setTodos(todosData);
  }, [todosData]);

  // Sort By funtions
  const onPressSortBy = () => {
    setShowItemPickerModal(true);
  };

  const closeItemPickerModal = () => {
    setShowItemPickerModal(false);
  };

  const onSelectItem = (item: Record<string, string>) => {
    closeItemPickerModal();
    if (item.value == SORT_TODO[0].value) {
      if (item.value === SORT_TODO[0].value) {
        const sortedTodos = [...todos].sort(
          (a, b) => a.payload.id - b.payload.id,
        );
        setTodos(sortedTodos);
      }
    } else {
      const sortedTodos = [...todos].sort(
        (a, b) =>
          new Date(b.payload.created_at).getTime() -
          new Date(a.payload.created_at).getTime(),
      );
      setTodos(sortedTodos);
    }
    setSortedByText(item);
  };

  const clearSortedBy = () => {
    setSortedByText({});
    setTodos(todosData);
    setActiveTab(FILTER_TAB_DATA[0].tabName);
  };

  // tab function
  const onPressTab = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === 'ACTIVE') {
      const filterTodoData = todosData.filter(
        (item: Record<string, any>) => !item?.payload?.completed,
      );
      setTodos(filterTodoData);
    } else if (tabName === 'COMPLETED') {
      const filterTodoData = todosData.filter(
        (item: Record<string, any>) => item?.payload?.completed,
      );
      setTodos(filterTodoData);
    } else {
      setTodos(todosData);
    }
  };

  const onPressTodoCard = (todo: Record<string, any>) => {
    setShowActionModal(true);
    setTodoRecorrectData(todo);
  };

  const onPressCheckBox = async (todo: Record<string, any>) => {
    updateTodo(todo, 'TOGGLE');
  };

  const completedTaskCount = useMemo(() => {
    return todosData.reduce(
      (count: number, todo: Record<string, any>) =>
        todo?.payload?.completed ? count + 1 : count,
      0,
    );
  }, [todosData]);

  const closeActionModal = () => {
    setShowActionModal(false);
  };

  const onPressEdit = () => {
    closeActionModal();
    navigate(SCREEN_ADD_TOTO, {type: 'EDIT', recorrectData: todoRecorrectData});
  };

  const onPressDelete = async () => {
    await deleteTodo(todoRecorrectData);
    closeActionModal();
  };

  const onPressAddBtn = () => {
    navigate(SCREEN_ADD_TOTO, {type: 'ADD'});
  };

  return (
    <AppContainer
      backgroundColor={colors.appBackgroundColor}
      statusBarColor={colors.white}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Title title="Todo List" />
          <TouchableOpacity
            style={[commonStyle.flexDirectionRow, {gap: spacing.MARGIN_4}]}
            onPress={onPressSortBy}>
            <RegularText>Sort by</RegularText>
            <Image source={Images.IMG_SORT_ICON} style={styles.sortIcon} />
          </TouchableOpacity>
        </View>
        <Tab
          activeTab={activeTab}
          onPressTab={onPressTab}
          tabData={FILTER_TAB_DATA}
        />
      </View>
      <View style={styles.seconderyContainer}>
        <View style={styles.countContainer}>
          <RenderCountCard count={todosData.length} label="Total Todo" />
          <RenderCountCard count={completedTaskCount} label="Completed" />
        </View>
        {Object.keys(sortedByText).length !== 0 && (
          <View style={styles.sortedTextContainer}>
            <RegularText style={[styles.sortedText, {color: colors.grey600}]}>
              Sorted By : <RegularText>{sortedByText.label}</RegularText>
            </RegularText>
            <TouchableOpacity onPress={clearSortedBy}>
              <Image source={Images.IMG_CLOSE_ICON} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator color={colors.theme} />
      ) : (
        <View style={{flex: 1}}>
          <TodoList
            todos={todos}
            onPressTodoCard={onPressTodoCard}
            onPressCheckBox={onPressCheckBox}
          />
        </View>
      )}

      <FabButton
        leftImage={Images.IMG_ADD_ICON}
        onPressButton={onPressAddBtn}
      />
      <ItemPickerModal
        visible={showItemPickerModal}
        onClose={closeItemPickerModal}
        data={SORT_TODO}
        onSelectItem={onSelectItem}
        displayKey={'label'}
      />
      <TodoActionModal
        visible={showActionModal}
        onRequestClose={closeActionModal}
        onPressDelete={onPressDelete}
        onPressEdit={onPressEdit}
      />
    </AppContainer>
  );
};

type RenderCountCard = {
  count: number;
  label: string;
};

const RenderCountCard = ({label, count}: RenderCountCard) => {
  return (
    <View style={styles.countCardContainer}>
      <RegularText style={styles.count}>{count}</RegularText>
      <RegularText style={styles.label}>{label}</RegularText>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    minHeight: spacing.HEIGHT_58,
    backgroundColor: colors.white,
    ...boxShadowTwo(),
  },
  headerSubContainer: {
    ...commonStyle.flexDirectionRow,
    justifyContent: 'space-between',
    marginTop: spacing.MARGIN_12,
    marginHorizontal: APP_PADDING_HORIZONTAL,
  },
  sortIcon: {
    width: spacing.WIDTH_14,
    height: spacing.WIDTH_14,
  },
  seconderyContainer: {
    gap: spacing.MARGIN_16,
    margin: spacing.MARGIN_16,
  },
  countContainer: {
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_10,
  },
  countCardContainer: {
    padding: spacing.PADDING_12,
    borderRadius: spacing.RADIUS_10,
    backgroundColor: colors.white,
    alignItems: 'center',
    flex: 1,
    ...boxShadowTwo(colors.grey300),
  },
  count: {
    fontSize: textScale(16),
    fontFamily: fontNames.FONT_FAMILY_SEMI_BOLD,
  },
  label: {
    marginTop: spacing.MARGIN_2,
  },
  sortedTextContainer: {
    ...commonStyle.flexDirectionRow,
    justifyContent: 'space-between',
  },
  sortedText: {
    fontSize: textScale(14),
    fontFamily: fontNames.FONT_FAMILY_REGULAR,
  },
});

export default Todo;
