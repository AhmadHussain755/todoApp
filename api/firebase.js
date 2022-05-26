import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: 'AIzaSyBcLqmqDfCuL5fSa_YNMb9fmuz3aNPGnFo',
  authDomain: 'todoapp-e45af.firebaseapp.com',
  projectId: 'todoapp-e45af',
  storageBucket: 'todoapp-e45af.appspot.com',
  messagingSenderId: '771457420809',
  appId: '1:771457420809:web:eb28647b310bcd8f0eb2d8',
  measurementId: 'G-VEGWG2Q3CW',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

