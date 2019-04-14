const storage = window.localStorage

export const getTodo = () => (dispatch) => {
  if (storage.hasOwnProperty('todos')) {
    dispatch({
      type: 'GET_TODO',
      todos: JSON.parse(storage.getItem('todos'))
    })
  }
}

export const setTodo = (todo) => (dispatch) => {
  let payload = {
    id: Date.now().toString(16),
    title: todo,
    complete: false
  }
  if (storage.hasOwnProperty('todos')) {
    let todos = JSON.parse(storage.getItem('todos'))
    todos[payload.id] = {
      title: todo,
      complete: false
    }
    storage.setItem('todos', JSON.stringify(todos))
  } else {
    storage.setItem('todos', JSON.stringify({
      [payload.id]: {
        title: payload.title,
        complete: payload.complete
      }
    }))
  }
  dispatch({
    type: 'SET_TODO',
    todo: payload
  })
}

export const handleTodo = (id) => (dispatch) => {
  if (storage.hasOwnProperty('todos')) {
    let todos = JSON.parse(storage.getItem('todos'))
    todos[id].complete = !todos[id].complete
    storage.setItem('todos', JSON.stringify(todos))
  }
  dispatch({
    type: 'HANDLE_TODO',
    selector: id
  })
}

export const editTodo = (id, title) => (dispatch) => {
  if (storage.hasOwnProperty('todos')) {
    let todos = JSON.parse(storage.getItem('todos'))
    todos[id].title = title
    storage.setItem('todos', JSON.stringify(todos))
  }
  dispatch({
    type: 'EDIT_TODO',
    selector: id,
    title: title
  })
}

export const changeStatus = (status) => (dispatch) => {
  dispatch({
    type: 'CHANGE_STATUS',
    status: status
  })
}
