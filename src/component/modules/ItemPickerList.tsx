import React from 'react';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import ItemPickerCard from '../row/itemPickerCard';

type ItemPickerListProps = {
  data: Record<string, string>[];
  onSelectItem: (item: Record<string, any>) => void;
  displayKey: string;
  textStyle?: StyleProp<TextStyle>;
  mainStyleView?: StyleProp<ViewStyle>;
};

const ItemPickerList = ({
  data = [],
  displayKey,
  onSelectItem,
  textStyle,
  mainStyleView,
}: ItemPickerListProps) => {
  return (
    <View style={[styles.dropDownMainContainer, mainStyleView]}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => (
          <ItemPickerCard
            item={item}
            index={index}
            onSelectItem={onSelectItem}
            displayKey={displayKey}
            textStyle={textStyle}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownMainContainer: {},
});

export default ItemPickerList;
