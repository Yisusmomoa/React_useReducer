import React, { useReducer } from 'react'

const types={
    increment:"increment",
    decrement:"decrement"
}
// es una función pura y el action es un objeto
function reducer(state, action) {
    switch (action.type) {
        case types.increment:
            return state+1
        case types.decrement:
            return state-1
        default:
            return state
    }
}
export const Counter = () => {
    const [state, dispatch] = useReducer(reducer, 0)
  return (
    <div>
        <h1>Count {state}</h1>
        <button onClick={()=>dispatch({type:types.increment})}>Increment</button>
        <button onClick={()=>dispatch({type:types.decrement})}>Decrement</button>
    </div>
  )
}
