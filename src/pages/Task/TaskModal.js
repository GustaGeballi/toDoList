import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const TaskModal = ({ task, onClose }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={!!task} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{task && task.name}</Text>
          <Text style={styles.taskDetails}>Criado por: {task && task.createdBy}</Text>
          <Text style={styles.taskDetails}>Descrição: {task && task.description}</Text>
          <Text style={styles.taskDetails}>Data de criação: {task && task.creationDate}</Text>
          <Text style={styles.taskDetails}>Data de conclusão: {task && task.completionDate}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskDetails: {
    marginBottom: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#333333',
    fontSize: 16,
  },
});

export default TaskModal;
