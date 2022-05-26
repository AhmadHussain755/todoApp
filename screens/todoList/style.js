import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  headerText: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  listCon: {
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 30,
    paddingBottom: 20,
  },
  detailCon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
  },
  descriptionText: {
    width: '50%',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  timeText: {
    paddingHorizontal: 20,
  },
  updateBtn: {
    backgroundColor: 'yellow',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },
  deleteBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  addButton: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'orange',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
  },
  userDataCon: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  }
});
