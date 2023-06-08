import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseconfig';
import { UserContext } from '../../contexts/UserContext';

import styles from './Style';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorField, setErrorField] = useState('');

  const { setUser } = useContext(UserContext); // Obter o contexto do usuário

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setIsErrorModalVisible(true);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Login do usuário bem-sucedido
        console.log('User logged in:', user);
        // Armazene os dados do usuário no contexto
        setUser(user);
        // Redirecionar para a tela TaskLists
        navigation.navigate('TaskList');
      })
      .catch((error) => {
        // Tratamento de erros
        setError('Email ou senha inválidos.');
        setIsErrorModalVisible(true);
        console.log('Login error:', error);
      });
  };

  const handleCreateAccount = () => {
    navigation.navigate('RegisterScreen');
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  const handleFieldInputChange = (field, value) => {
    if (error) {
      setError('');
      setIsErrorModalVisible(false);
    }

    if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(value) => handleFieldInputChange('email', value)}
          placeholder="Endereço de e-mail"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(value) => handleFieldInputChange('password', value)}
          placeholder="Senha"
          secureTextEntry
        />

        <Button
          title="Login"
          onPress={handleLogin}
          color="#ff4141"
          style={styles.buttonText}
        />

        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.createAccountText}>Crie uma conta</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isErrorModalVisible}
        onRequestClose={handleCloseErrorModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>{error}</Text>
            <Pressable style={styles.modalButton} onPress={handleCloseErrorModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
