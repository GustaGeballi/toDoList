import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { auth, database } from '../../config/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import styles from './Style';

const isValidPhoneNumber = (number) => {
  // Verifica se o número de telefone possui 11 dígitos
  if (number.length !== 11) {
    return false;
  }

  // Verifica se o número de telefone contém apenas dígitos
  if (!/^\d+$/.test(number)) {
    return false;
  }

  return true;
};

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleRegister = () => {
    if (!email || !password || !fullName || !age || !phone) {
      setModalMessage('Por favor, preencha todos os campos corretamente.');
      setIsErrorModalVisible(true);
      return;
    }

    const ageNumber = parseInt(age);
    if (ageNumber < 10 || ageNumber > 110) {
      setModalMessage('Idade inválida, preencha corretamente.');
      setIsErrorModalVisible(true);
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      setModalMessage('Número de Celular Inválido');
      setIsErrorModalVisible(true);
      return;
    }

    if (password.length < 6) {
      setModalMessage('Sua senha deve possuir no mínimo 6 caracteres');
      setIsErrorModalVisible(true);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;

        // Salvar os dados do usuário no Realtime Database
        const userRef = ref(database, `Users/${userId}`);
        const userData = {
          age: ageNumber,
          email: email,
          fullname: fullName,
          password: password,
          phone: phone,
          sex: selectedGender,
        };
        // Adicionar a propriedade "uid" ao objeto userData
        userData.uid = userId;

        set(userRef, userData);

        setModalMessage('Usuário cadastrado com sucesso!\nFaça o Login para continuar');
        setIsSuccessModalVisible(true);
      })
      .catch((error) => {
        // Tratamento de erros
        if (error.code === 'auth/email-already-in-use') {
          setModalMessage('Endereço de email já cadastrado.');
        } else if (error.code === 'auth/invalid-email') {
          setModalMessage('Endereço de email incorreto.');
        } else {
          setModalMessage('Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente mais tarde.');
        }
        setIsErrorModalVisible(true);
        console.log('Registration error:', error);
      });
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalVisible(false);
    navigation.goBack(); // Redirecionar para a tela "LoginScreen"
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
          placeholder="Endereço de Email"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Nome Completo"
        />

        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Idade"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Celular"
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
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <Pressable style={styles.modalButton} onPress={handleCloseErrorModal}>
                <Text style={styles.modalButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal isVisible={isSuccessModalVisible} animationIn="fadeIn" animationOut="fadeOut">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <Pressable style={styles.modalButton} onPress={handleCloseSuccessModal}>
                <Text style={styles.modalButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default RegisterScreen;
