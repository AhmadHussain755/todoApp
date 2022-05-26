import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
// import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignUp() {
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [loader, setLoader] = useState(false);

  const signupHandler = async () => {
    try {
      setLoader(true);

      const res = await auth().createUserWithEmailAndPassword(email, pass);
      console.log('res', res);
      if (res.user) {
        const userObj = {
          name: username,
          email: email,
          uid: res.user?.uid,
        };

        console.log('userObj', userObj);

        await firestore().collection('users').add(userObj);
      }
      setLoader(false);
    } catch (err) {
      console.log('err while signup', err);
      setLoader(false);
    }
  };

  return (
    <View style={styles.loginCon}>
      <Text style={{fontSize: 25}}>Sign Up</Text>
      <View style={styles.emailInput}>
        <TextInput
          //   style={styles.emailInput}
          name="Name"
          placeholder="Name"
          onChangeText={text => setUsername(text)}
          value={username}
        />
      </View>
      <View style={styles.emailInput}>
        <TextInput
          //   style={styles.emailInput}
          name="Email"
          placeholder="Enter Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.emailInput}>
        <TextInput
          //   style={styles.emailInput}
          name="password"
          secureTextEntry={true}
          placeholder="Enter Password"
          onChangeText={text => setPass(text)}
          value={pass}
        />
      </View>
      <TouchableOpacity
        style={styles.btnCon}
        // title="Go to Login"
        // onPress={() => navigation.navigate('Login')}
        onPress={signupHandler}>
        {loader ? (
          <ActivityIndicator size={20} color={'red'} />
        ) : (
          <Text>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
