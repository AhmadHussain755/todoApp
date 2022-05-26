import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import auth from '@react-native-firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const Login = async () => {
    try {
      const res = await auth().signInWithEmailAndPassword(email, pass);

      console.log('resWhenSignin', res);
      setLoader(true);
      // navigate to todo screen
      navigation.navigate('TodoList');
    } catch (err) {
      console.log('errWhileSignin', err);

      // alert for error
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      console.log('successWhileSignout');
    } catch (Err) {
      console.log('err while logout', Err);
    }
  };

  return (
    <View style={styles.loginCon}>
      <Text style={{fontSize: 25}}>Log in</Text>
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
        title="Go to TodoScreen"
        onPress={Login}>
        {loader ? (
          <ActivityIndicator size={20} color={'purple'} />
        ) : (
          <Text>Submit</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnCon}
        title="Go to TodoScreen"
        // onPress={() => navigation.navigate('TodoScreen')}
        onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.memberText}>Not a Member Before?</Text>
        <TouchableOpacity
          title="Go to SignUp"
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.memberText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
