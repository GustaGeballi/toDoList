import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import Task from './Task/Task';

export default function TaskLists() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, { text: task, isSelected: false }]);
    setTask('');
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const handleEditTask = (index, editedTask) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].text = editedTask;
    setTaskItems(itemsCopy);
    setEditingTask(null);
    setEditedTask('');
  };

  const startEditingTask = (index) => {
    setEditingTask(index);
    setEditedTask(taskItems[index].text);
  };

  const handleSaveTask = (index) => {
    if (editedTask.trim() !== '') {
      handleEditTask(index, editedTask);
    }
  };

  const handleTaskOptions = (index) => {
    setSelectedTaskIndex(index);
    setShowOptionsModal(true);
  };

  const handleDeleteTask = () => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(selectedTaskIndex, 1);
    setTaskItems(itemsCopy);
    setShowOptionsModal(false);
  };

  const handleEditTaskOption = () => {
    setShowOptionsModal(false);
    startEditingTask(selectedTaskIndex);
  };

  const closeModal = () => {
    setShowOptionsModal(false);
  };

  const handleTaskPress = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].isSelected = !itemsCopy[index].isSelected;
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Tarefas a fazer</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTaskPress(index)}
                onLongPress={() => handleTaskOptions(index)}
              >
                {editingTask === index ? (
                  <TextInput
                    style={styles.editInput}
                    value={editedTask}
                    onChangeText={(text) => setEditedTask(text)}
                    autoFocus
                    onSubmitEditing={() => handleSaveTask(index)}
                  />
                ) : (
                  <Task
                    text={item.text}
                    isSelected={item.isSelected}
                    onPress={() => handleTaskPress(index)}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {editingTask === null && ( // Adiciona esta condição
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder="Digite uma tarefa"
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}

      {/* Task Options Modal */}
      <Modal visible={showOptionsModal} transparent={true} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.optionButton} onPress={handleEditTaskOption}>
                <Text style={styles.optionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={handleDeleteTask}>
                <Text style={styles.optionButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4141',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    marginLeft: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    width: 320,
  },
  addWrapper: {
    marginRight: 10,
    width: 60,
    height: 60,
    backgroundColor: '#ff4141',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eaeaea',
    borderWidth: 1,
  },
  addText: {
    fontSize: 25,
    color: 'white',
  },
  editInput: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '80%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  optionButton: {
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    minWidth: 150,
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
});
