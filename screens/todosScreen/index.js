import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import {styles} from './style';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {todoUpdateAction} from '../../redux/action/todoAction';

export default function TodoScreen() {
  const route = useRoute();
  console.log('route', route);
  const item = route.params;
  console.log('something', item);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [getUserData, setGetUserData] = useState({});

  const userData = useSelector(store => store.authReducer.user);

  console.log('dataFromStore', userData);

  useEffect(() => {
    setDescription(item?.description);
  }, []);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onSubmit = async () => {
    try {
      const addDoc = await firestore().collection('Todos').add({
        description: description,
        date: date,
        createdBy: auth().currentUser.uid,
        createdAt: new Date(),
      });
      navigation.navigate('TodoList');
      console.log('resWhileAddData', addDoc);
    } catch (err) {
      console.log('errWhileAddData', err);
    }
  };

  const onUpdateTodo = async docId => {
    const cb = () => {
      navigation.navigate('TodoList');
    };
    let obj = {
      description: description,
      date: date,
      createdBy: auth().currentUser.uid,
      createdAt: new Date(),
      docId: docId,
    };

    console.log('obj', obj);

    dispatch(todoUpdateAction(obj, cb));
  };

  return (
    <>
      <View style={styles.userDataCon}>
        <Text>{userData.name}</Text>
        <Text>{userData.email}</Text>
      </View>
      <View style={styles.root}>
        <View style={styles.rowContainer}>
          <Text style={{textAlign: 'center', fontSize: 20}}>New ToDo</Text>
          <Text style={{marginTop: 15}}>Detail</Text>
          <TextInput
            style={styles.textInput}
            value={description}
            onChangeText={value => setDescription(value)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>Time Picker</Text>
          <View>
            <View style={styles.datePicker}>
              <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <View style={styles.datePicker}>
              <Button onPress={showTimepicker} title="Show time picker!" />
            </View>
            <Text style={{paddingTop: 10}}>
              selected: {date.toLocaleString()}
            </Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
        </View>
        {item ? (
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => onUpdateTodo(item.docId)}>
            <Text>update</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
            <Text>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
