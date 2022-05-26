import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    height: '100%',
    // justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column',
  },
  rowContainer: {
    marginTop: 20,
    width: '80%',
    borderRadius: 5,
  },
  textInput: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10,
  },
  datePicker: {
   paddingTop: 15,
  },
  submitBtn: {
    marginTop: 15,
    backgroundColor: 'lightgray',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
  },
  userDataCon: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  }
});
