const initialState = {
  type: 0, // show all todo list by default
  todos: {}
}

export default (state = initialState, action) => {
  let updatedTodos = state.todos
  console.log(updatedTodos, action)
  switch (action.type) {
    case 'GET_TODO':
      return {
        ...state,
        todos: {...action.todos}
      }
    case 'SET_TODO':
      updatedTodos[action.todo.id] = {
        title: action.todo.title,
        complete: action.todo.complete
      }
      return {
        ...state,
        todos: {...updatedTodos}
      }
    case 'HANDLE_TODO':
      let status = updatedTodos[action.selector].complete
      updatedTodos[action.selector].complete = !status
      return {
        ...state,
        todos: {...updatedTodos}
      }
    case 'EDIT_TODO':
      updatedTodos[action.selector].title = action.title
      return {
        ...state,
        todos: {...updatedTodos}
      }
    case 'CHANGE_STATUS':
      return {
        ...state,
        type: action.status
      }
    default:
      return state
  }
}
