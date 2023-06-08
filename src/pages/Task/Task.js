import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Task = (props) => {
  const { task, isSelected } = props;

  return (
    <View style={[styles.item, isSelected && styles.selectedItem]}>
      <View style={styles.itemLeft}>
        <View style={[styles.square, isSelected && styles.selectedSquare, isSelected && styles.square2]}></View>
        <Text style={[styles.itemText, isSelected && styles.selectedItemText, isSelected && styles.itemText2]}>{task.name}</Text>
      </View>
      <View style={[styles.circular, isSelected && styles.selectedCircular, isSelected && styles.circular2]}></View>
    </View>
  );
};


const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#ff4141',
    opacity: 1,
    borderRadius: 5,
    marginRight: 15,
  },
  square2: {
    width: 24,
    height: 24,
    backgroundColor: '#9a9a9a',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },

  itemText: {
    maxWidth: '80%',
    fontWeight: '500',
    color: '#000',
  },
  itemText2: {
    maxWidth: '80%',
    textDecorationLine: 'line-through',
    color: '#9a9a9a',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#ff4141',
    borderWidth: 2,
    borderRadius: 5,
  },
  circular2: {
    width: 12,
    height: 12,
    borderColor: '#9a9a9a',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
