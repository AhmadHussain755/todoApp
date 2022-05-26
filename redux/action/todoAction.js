import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getTodoDetails = () => async dispatch => {
  firestore()
    .collection('Todos')
    .where('createdBy', '==', auth()?.currentUser?.uid)
    .onSnapshot(
      res => {
        let dataArr = [];
        res.forEach(res => {
          let data = {...res.data(), docId: res.id};
          dataArr.push(data);

          console.log('dataaaa', data);
        });
        console.log('dataAr', dataArr);

        dispatch({
          type: 'TODO_DATA',
          payload: dataArr,
        });
      },

      err => {
        console.log('errWhileGetData', err);
      },
    );
};

export const todoDeleteAction = item => async dispatch => {
  try {
    const deleteTodo = await firestore().collection('Todos').doc(item).delete();

    console.log('deleteTodo', deleteTodo);

    dispatch({
      type: 'DELETE_DATA',
      payload: item,
    });
  } catch (err) {
    console.log('errWhileDeleteTodo', err);
  }
};

export const todoUpdateAction = (item, cb) => async dispatch => {
  console.log('itemUpdating', item);
  try {
    console.log('item', item);
    const updateTodo = await firestore()
      .collection('Todos')
      .doc(item.docId)
      .update(item);

    // get updated record

    const getUpdatedRecord = firestore().collection('Todos').get();
    console.log('updateTodofssdafds', updateTodo);

    dispatch({
      type: 'UPDATE_TODO',
      payload: getUpdatedRecord,
    });
    cb();
  } catch (err) {
    console.log('errWhileUpdateTodo', err);
  }
};
