import React, { useReducer } from 'react'
import productReducer, { initalProductState } from './reducers/productReducer'
import types from './types'

const ProductApp = () => {
  const [productstate, productDispatch]=useReducer(productReducer, initalProductState)
  const {products, cart, activeProduct}=productstate
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          products.map(product=>(
            <li key={product.id}>
              {product.title}
              <button onClick={()=>productDispatch({
                type:types.productAddToCart,
                payload:product
              })}>Add to cart</button>

              <button onClick={()=>productDispatch({
                type:types.productShow,
                payload:product.id
              })}>Show</button>
            </li>
          ))
        }
      </ul>
      <hr/>
      <h2>Cart</h2>
      <ul>
        {
          cart.map(product=>(
            <li key={product.id}>
              {product.title} - quantity: {product.quantity}
              <button onClick={()=>productDispatch({
                type:types.productRemoveFromCart,
                payload:product.id
              })}>
                Remove all
              </button>
              <button onClick={()=>productDispatch({
                type:types.productRemoveOneFromCart,
                payload:product.id
              })}>Remove 1</button>
            </li>
          ))
        }
      </ul>
      <hr/>
      <h2>Preview</h2>
      <p>Titulo: {activeProduct.title}</p>
    </div>
  )
}

export default ProductApp