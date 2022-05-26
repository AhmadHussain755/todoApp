let initState = {
  user: {},
  isLoading: true,
  userLogs: {},
};

function authReducer(state = initState, action) {
  switch (action.type) {
    case 'USER_DATA':
      console.log('reduxInspect, inReducer', action);

      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

export default authReducer;
