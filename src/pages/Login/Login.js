import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwboLjZZGUSE9xK3LTsdd0DgWLUHZA7WA",
  authDomain: "todolist-50b5c.firebaseapp.com",
  projectId: "todolist-50b5c",
  storageBucket: "todolist-50b5c.appspot.com",
  messagingSenderId: "720614305509",
  appId: "1:720614305509:web:ca2aff3904345a33702e0c"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorField, setErrorField] = useState('');

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
        // Redirecionar para a tela TaskLists
        navigation.navigate('TaskLists');
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
          placeholder="Email"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(value) => handleFieldInputChange('password', value)}
          placeholder="Password"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#ff4141',
    fontWeight: '600',
  },
  createAccountText: {
    color: '#ff4141',
    textAlign: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#ff4141',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;