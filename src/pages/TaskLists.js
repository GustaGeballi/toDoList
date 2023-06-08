import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text, TouchableOpacity, Modal, SafeAreaView, StatusBar } from 'react-native';
import { getDatabase, ref, push, onValue, update, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { database } from '../config/firebaseconfig';
import { Ionicons } from '@expo/vector-icons';
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

    const newTask = {
      UID: userUID,
      name: taskName,
      description: taskDescription,
      completionDate: completionDate,
      createdBy: userName,
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
      <TouchableOpacity onPress={() => toggleTaskSelection(item.id)}>
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

  const handleLogout = () => {
    setIsLoggedOut(true);
  };

  if (isLoggedOut) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes da Tarefa</Text>

            {selectedTask && (
              <Task
                key={selectedTask.id}
                isSelected={selectedTask.isSelected}
                task={{
                  name: selectedTask.name,
                  description: selectedTask.description,
                  completionDate: selectedTask.completionDate,
                  createdBy: selectedTask.createdBy,
                }}
              />
            )}

            <TouchableOpacity style={styles.modalButton} onPress={closeTaskModal}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TaskList;
