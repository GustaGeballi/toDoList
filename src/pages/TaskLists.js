import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text, TouchableOpacity, Modal, SafeAreaView, StatusBar } from 'react-native';
import { getDatabase, ref, push, onValue, update, get, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { firebase, database } from '../config/firebaseconfig';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import Task from './Task/Task';

import styles from './Style';

const TaskList = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [userUID, setUserUID] = useState('');
  const [userName, setUserName] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserUID(user.uid);
      getUserFullName(user.uid);
    }
  }, []);

  useEffect(() => {
    const tasksRef = ref(database, 'tasks');
    const tasksListener = onValue(tasksRef, (snapshot) => {
      const tasksData = snapshot.val();
      if (tasksData) {
        const tasksList = Object.keys(tasksData)
          .map((key) => ({ id: key, ...tasksData[key] }))
          .filter((task) => task.UID === userUID);
        setTasks(tasksList);
      } else {
        setTasks([]);
      }
    });

    return () => {
      // Remove o listener quando o componente é desmontado
      tasksListener();
    };
  }, [userUID]);

  const getUserFullName = (uid) => {
    const userRef = ref(database, `Users/${uid}`);
    get(userRef)
      .then((snapshot) => {
        const user = snapshot.val();
        if (user && user.fullname) {
          setUserName(user.fullname);
        }
      })
      .catch((error) => {
        console.error('Erro ao obter nome do usuário:', error);
      });
  };

  const createTask = () => {
    const newTaskRef = push(ref(database, 'tasks'));
    const newTaskKey = newTaskRef.key;

    const creationDate = moment().format('DD/MM/YYYY - HH:mm');
    const newTask = {
      UID: userUID,
      name: taskName,
      description: taskDescription,
      completionDate: completionDate,
      createdBy: userName,
      creationDate: creationDate,
    };

    const updates = {};
    updates[`tasks/${newTaskKey}`] = newTask;

    update(ref(database), updates)
      .then(() => {
        console.log('Dados da tarefa enviados com sucesso para o Realtime Database.');
        setTaskName('');
        setTaskDescription('');
        setCompletionDate('');
        setIsCreateModalVisible(false);
      })
      .catch((error) => {
        console.error('Erro ao enviar dados da tarefa para o Realtime Database:', error);
      });
  };

  const handleTaskNameChange = (text) => {
    setTaskName(text);
  };

  const handleTaskDescriptionChange = (text) => {
    setTaskDescription(text);
  };

  const handleCompletionDateChange = (text) => {
    setCompletionDate(text);
  };

  const toggleTaskSelection = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isSelected: !task.isSelected } : task
      )
    );
  };

  const renderItem = ({ item }) => {
    if (item.UID !== userUID) {
      return null;
    }

    return (
      <TouchableOpacity onPress={() => toggleTaskSelection(item.id)} onLongPress={() => openTaskModal(item.id)}>
        <Task
          key={item.id}
          isSelected={item.isSelected}
          task={{
            name: item.name,
            description: item.description,
            completionDate: item.completionDate,
            createdBy: item.createdBy,
          }}
        />
      </TouchableOpacity>
    );
  };

  const openCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalVisible(false);
  };

  const openTaskModal = (taskId) => {
    const task = tasks.find((item) => item.id === taskId);
    setSelectedTask(task);
    setIsTaskModalVisible(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalVisible(false);
  };

  const openEditModal = () => {
    setIsTaskModalVisible(false);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleSaveChanges = () => {
    const updatedTask = { ...selectedTask };

    // Atualizar a descrição, título e data de conclusão da tarefa

    // Atualizar a data de criação para o momento em que ele salvar
    updatedTask.creationDate = moment().format('DD/MM/YYYY - HH:mm');

    const updates = {};
    updates[`tasks/${selectedTask.id}`] = updatedTask;

    update(ref(database), updates)
      .then(() => {
        console.log('Alterações salvas com sucesso.');
        setIsEditModalVisible(false);
      })
      .catch((error) => {
        console.error('Erro ao salvar as alterações:', error);
      });
  };

  const handleLogout = () => {
    setIsLoggedOut(true);
    navigation.goBack();
  };
  
  if (isLoggedOut) {
    return null;
  }

  const handleDeleteTask = () => {
    const taskRef = ref(database, 'tasks/' + selectedTask.id);
    remove(taskRef)
      .then(() => {
        console.log('Tarefa excluída com sucesso');
        setIsTaskModalVisible(false);
      })
      .catch((error) => {
        console.error('Erro ao excluir a tarefa:', error);
      });
  };
  


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ff4141" barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Lista de Tarefas</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#ff4141" />
        </TouchableOpacity>
      </View>

      <View style={styles.taskContainer}>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
        <Text style={styles.addButtonIcon}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isCreateModalVisible}
        onRequestClose={closeCreateModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Tarefa</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome da Tarefa"
              value={taskName}
              onChangeText={handleTaskNameChange}
              maxLength={50}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />

            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={taskDescription}
              onChangeText={handleTaskDescriptionChange}
              maxLength={400}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
            />

            <TextInput
              style={styles.input}
              placeholder="Data de Conclusão"
              value={completionDate}
              onChangeText={handleCompletionDateChange}
            />

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={createTask}>
                <Text style={styles.modalButtonText}>Criar Tarefa</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={closeCreateModal}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
  animationType="fade"
  transparent={true}
  visible={isTaskModalVisible}
  onRequestClose={closeTaskModal}
>
  {selectedTask && (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.taskModalHeader}>
          <Text style={styles.modalTitle}>Editar Tarefa</Text>
          <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
            <Ionicons name="create-outline" size={24} color="#ff4141" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTask}>
            <Ionicons name="trash-outline" size={24} color="#ff4141" />
          </TouchableOpacity>
        </View>

        <Text style={styles.tarefaNm}>{selectedTask.name}</Text>
        <Text style={styles.title2}>{selectedTask.creationDate}</Text>

        <View>
          <Text style={styles.taskModalText}>{selectedTask.description}</Text>
          <Text style={styles.taskModalText}>Data de Conclusão: {selectedTask.completionDate}</Text>
          <Text style={styles.taskModalText}>Criador: {selectedTask.createdBy}</Text>
        </View>

        <TouchableOpacity style={styles.modalButton} onPress={closeTaskModal}>
          <Text style={styles.modalButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
</Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={closeEditModal}
      >
        {selectedTask && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Tarefa</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome da Tarefa"
              value={selectedTask.name}
              onChangeText={(text) => setSelectedTask({ ...selectedTask, name: text })}
              maxLength={50}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />

            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={selectedTask.description}
              onChangeText={(text) => setSelectedTask({ ...selectedTask, description: text })}
              maxLength={400}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
            />

            <TextInput
              style={styles.input}
              placeholder="Data de Conclusão"
              value={selectedTask.completionDate}
              onChangeText={(text) => setSelectedTask({ ...selectedTask, completionDate: text })}
            />

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveChanges}>
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={closeEditModal}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )}
      </Modal>

    </SafeAreaView>
  );
};

export default TaskList;