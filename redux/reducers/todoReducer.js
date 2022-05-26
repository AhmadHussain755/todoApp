let initState = {
  todo: [],
};

function todoReducer(state = initState, action) {
  switch (action.type) {
    case 'TODO_DATA':
      console.log('reduxInspect, inReducer', action);

      return {
        ...state,
        todo: action.payload,
      };

    case 'DELETE_DATA':
      // filter the deleted record

      const newTodos = state.todo.filter(item => item.docId === action.payload);
      console.log(' newTodos', newTodos);
      return {
        ...state,
        todo: newTodos,
      };

    case 'UPDATE_TODO':
      const updateTodo = state.todo.map(item => {
        if (item.docId === action.payload.docId) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        todo: updateTodo,
      };
    default:
      return state;
  }
}

export default todoReducer;
