import { StyleSheet } from 'react-native';

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
      borderColor: '#cfcfcf',
      borderWidth: 1,
      borderRadius: 10,
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
  
  export default styles;