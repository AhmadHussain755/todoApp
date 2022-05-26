import * as React from 'react';
import Login from './screens/login';
import SignUp from './screens/signUp';
import TodoScreen from './screens/todosScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodoList from './screens/todoList';
import auth from '@react-native-firebase/auth';
import store from './redux/store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={auth().currentUser?.uid ? 'TodoList' : 'Login'}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="TodoScreen" component={TodoScreen} />
          <Stack.Screen name="TodoList" component={TodoList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
