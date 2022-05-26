import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {styles} from './style';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import {doc, deleteDoc} from '@react-native-firebase/firestore';
import {db} from '@react-native-firebase/firestore';
import ActivityIndicatorViewNativeComponent from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails} from '../../redux/action/userAction';
import {getTodoDetails} from '../../redux/action/todoAction';
import {todoDeleteAction} from '../../redux/action/todoAction';

export default function TodoList() {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [logoutLoader, setLogoutLoader] = useState(false);
  const {user} = useSelector(store => store.authReducer);
  const todoData = useSelector(store => store.todoReducer.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getTodoDetails());
  }, []);
  const navigation = useNavigation();
  const [getData, setGetData] = useState([]);
  const [getUserData, setGetUserData] = useState({});
  const logoutHandler = () => {
    auth().signOut();
    setLogoutLoader(true);
  };

  return (
    <>
      <View style={styles.userDataCon}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
      <FlatList
        data={todoData}
        renderItem={({item}) => {
          console.log('docID', item.docId);
          return (
            <View>
              <Text style={styles.headerText}>Todos</Text>
              <View style={styles.listCon}>
                <View style={styles.detailCon}>
                  <Text style={styles.descriptionText}>{item.description}</Text>
                  <Text style={styles.timeText}>
                    {/* {dayjs(item.date.toDate()).format('DD/MM/YYYY hh:mm A')} */}
                  </Text>
                </View>
                <View style={styles.detailCon}>
                  <TouchableOpacity
                    style={styles.updateBtn}
                    onPress={() =>
                      navigation.navigate({name: 'TodoScreen', params: item})
                    }>
                    <Text>Update</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => dispatch(todoDeleteAction(item.docId))}>
                    {loader ? (
                      <ActivityIndicator size={20} color={'red'} />
                    ) : (
                      <Text>Delete</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity onPress={logoutHandler} style={styles.addButton}>
        {logoutLoader ? (
          <ActivityIndicator size={20} color={'red'} />
        ) : (
          <Text>Logout</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TodoScreen')}>
        {loader ? (
          <View>
            <ActivityIndicator size={20} color={'orange'} />
          </View>
        ) : (
          <Text style={styles.addButton}>Add</Text>
        )}
      </TouchableOpacity>
    </>
  );
}
