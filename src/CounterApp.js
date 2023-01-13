import React, { useReducer } from 'react'

const types={
    increment:'increment',
    decrement:'decrement',
    reset:'reset'
}

// otra ventaja es cuando tenemos varios reducers
// supongamos que tenemmos un reducer de un contador y otro de un usuario que necesiita ejecutar varias acciones
// cada vez que se incrementa, decrementa y resetea
// es combinar todos los reducers

const counterReducer=(state, action)=>{
    switch (action.type) {
        case types.increment:
            return state+1
        case types.decrement:
            return state-1
        case types.reset:
            return 0
        default:
            return state
    }
    // if (action.type==="increment") {
    //     return state+1;
    // }
    // else if(action.type==="decrement"){
    //     return state-1;
    // }
    // else if(action.type==="reset"){
    //     return 0;
    // }
    // return state
    // es importante dejar como valor por defecto el estado previo, porrque si por x razón
    //se manda a llamar una acción que no existe se modifica el state, y como no existe esa acción
    //se actualiza el state con el valor undefind
}
// en este caso la primemra vez va a leer un 0 y va a retornar un 0 y ese será el estado actual que tendrá el counter

const CounterApp = () => {
    /*
        const [state, setState]=useState(initialState)
        const [state, dispatch]=useReducer(reducer, initialState)
        dispatch se utiliza para disparar acciones para actualizar nuestro state
    */
//    Un reducer es una función pura
   const [counter, dispatch] = useReducer(counterReducer, 0)
    /*
    no va a interectuar con estados externos, perfectamente lo podemos crear fuera del componente o en un archivo separado
    */
//    ahora creamos unas acciones para modificar el contador utilizando el dispatch
  return (
    <div>
        <h1>Clicks:{counter}</h1>
        {/* 
            en el evento on click va una función que es el dispatch, este dispatch va a recibir un objeto
            y recuerda se debe de llamar como una función de tipo flecha para que solo se ejecute cuando le damos click al botón
        */}
        <button onClick={()=>{dispatch({type:types.increment})}}>Increment</button>
        <button onClick={()=>{dispatch({type:types.decrement})}}>Decrement</button>
        <button onClick={()=>{dispatch({type:types.reset})}}>Reset</button>
    </div>
  )
}

// 

export default CounterApp