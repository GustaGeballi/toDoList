import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Pressable } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Modal from 'react-native-modal';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwboLjZZGUSE9xK3LTsdd0DgWLUHZA7WA",
  authDomain: "todolist-50b5c.firebaseapp.com",
  projectId: "todolist-50b5c",
  storageBucket: "todolist-50b5c.appspot.com",
  messagingSenderId: "720614305509",
  appId: "1:720614305509:web:ca2aff3904345a33702e0c"
};
// Inicialização do Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleRegister = () => {
    if (!email || !password || !fullName || !age || !phone || !selectedGender) {
      setError('Por favor, preencha todos os campos corretamente.');
      setIsErrorModalVisible(true);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Registro do usuário bem-sucedido
        console.log('User registered:', user);
        navigation.navigate('TaskLists'); // Redirecionar para a tela "TaskLists"
      })
      .catch((error) => {
        // Tratamento de erros
        setError('Email ou senha inválidos.');
        setIsErrorModalVisible(true);
        console.log('Registration error:', error);
      });
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Cadastre-se</Text>
        </View>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
        />

        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Age"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
        />

        <View style={styles.genderContainer}>
          <Text style={styles.genderLabel}>Sexo:</Text>
          <View style={styles.genderOptions}>
            <Text
              style={[
                styles.genderOption,
                selectedGender === 'male' && styles.selectedGenderOption,
              ]}
              onPress={() => setSelectedGender('male')}
            >
              Masculino
            </Text>
            <Text
              style={[
                styles.genderOption,
                selectedGender === 'female' && styles.selectedGenderOption,
              ]}
              onPress={() => setSelectedGender('female')}
            >
              Feminino
            </Text>
          </View>
        </View>

        <Button
          title="Register"
          onPress={handleRegister}
          color="#ff4141"
        />

        <Modal isVisible={isErrorModalVisible} animationIn="fadeIn" animationOut="fadeOut">
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#ff4141',
    fontWeight: '600',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  genderLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  genderOptions: {
    flexDirection: 'row',
  },
  genderOption: {
    fontSize: 16,
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedGenderOption: {
    backgroundColor: '#ff4141',
    color: '#fff',
    borderColor: '#ff4141',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#ff4141',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegisterScreen;