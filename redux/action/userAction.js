import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getUserDetails = () => async dispatch => {
  try {
    const getDoc = await firestore()
      .collection('users')
      .where('uid', '==', auth()?.currentUser?.uid)
      .get();
    let dataType = {};
    getDoc.forEach(item => {
      let userData = {...item.data(), docId: item.id};
      dataType = userData;
    });

   
console.log("dataType", dataType);
    dispatch({
      type: 'USER_DATA',
      payload: dataType,
    });
  } catch (err) {
    console.log('err', err);
  }
};
