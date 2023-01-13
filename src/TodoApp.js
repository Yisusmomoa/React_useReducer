import React, { useReducer, useState } from 'react'

const types={
  add:'add',
  update:'update',
  delete:'delete'
}

const initialTodos=[
  {id:1, title:"Todo 1"},
  {id:2, title:"Todo 2"}
]
// el reducer se debe de mantener como una función pura, no debe utilizar ninguna función 
//con comportamiento aleatorio
const todoReducer=(state, action)=>{
  /*
  action={
    type:"delete",
    payload:1
  }
  */
 console.log(action)
  switch (action.type) {
    case types.delete:
      // debemos tener cuidado para no mutar el estado
      // usar métodos que no muten el estado, map, filter, reduce, find
      return state.filter(todo=>todo.id!==action.payload)
    case types.add:
      return [...state, action.payload]
      // en este caso no es recomendable usar push porque modifica el estado y es incorrecto usarlo en el contexto de un reducer
    default:
      return state
  }
}

const TodoApp = () => {
  const [todos, dispatch]=useReducer(todoReducer, initialTodos)
  const [text, setText]=useState("")
  const handleSubmit=(ev)=>{
    ev.preventDefault()
    dispatch({
      type:types.add,
      payload:{id:Date.now(), title:text}
    })
    setText("")
  }
  return (
    <div>
      <h2>Todo app</h2>
      <ul>
        {
          todos.map(todo=>(
            <li key={todo.id}>
              {todo.title}
              {/* Todo el objeto que se manda desd el dispatch es el action */}
              {/* si queremos mandar algún dato necesario para la actualización
              usamos el atributo payload*/}
              <button onClick={()=>{dispatch({
                type:types.delete,
                payload:todo.id
                })}}>Delete</button>
            </li>
          ))
        }
      </ul>
      <form onSubmit={handleSubmit}>
        <input placeholder='todo' value={text} 
        onChange={(ev)=>setText(ev.target.value)} />
      </form>
    </div>
  )
}

export default TodoApp