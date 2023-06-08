import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ececec',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff4141',
    paddingBottom: 20,
  },
  title2: {
    fontSize: 12,
    fontWeight: '400',
    color: '#565656',
    paddingBottom: 20,
  },
  tarefaNm: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    paddingBottom: 15,
  },
  logoutButton: {
    marginRight: 20,
    paddingBottom: 20,
  },
  taskContainer: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff4141',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
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
    maxWidth: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff4141',
  },
  input: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    minWidth: '100%',
    textAlignVertical: 'top',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#ff4141',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskModalText: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#c8c8c8',
    color: '#a0a0a0',
    borderRadius: 5,
    minWidth: '100%',
    textAlignVertical: 'top',
  },
  editButton: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 200,
    color: '#ff4141',
  },
   editButton: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 200,
    color: '#ff4141',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 200,
    color: '#ff4141',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
  },
  
});

export default styles;
