import types from "../types"

export const initalProductState={
    products:[
        {id:1,title:'Product 1'},
        {id:2, title:'Product 2'}
    ],
    cart:[
        
    ],
    activeProduct:{
        id:2, title:"Product 2"
    }
}

// minuto 48
// recibe el estado previo y el acción a ejecutar
const productReducer=(state, action)=>{
    console.log(action)
    switch (action.type) {
        case types.productShow:
            return {
                ...state,
                activeProduct:state.products.find(product=>product.id===action.payload)
            }
        case types.productAddToCart:
            const newProduct=action.payload;
            const productExist=state.cart.find(product=>product.id===newProduct.id)
            return productExist
            ?{
                ...state,
                cart:state.cart.map(product=>
                        product.id===newProduct.id
                        ?{...product, quantity:product.quantity+1}
                        :product
                    )
            }
            : {
                ...state,
                cart:[
                    ...state.cart,
                    {...action.payload, quantity:1}
                ]
                // cart:state.cart.concat(action.payload)
            }
        case types.productRemoveFromCart:
            return {
                ...state,
                cart:state.cart.filter(product=>product.id!==action.payload)
            }
        case types.productRemoveOneFromCart:{
            const idProduct=action.payload;
            const deleteProduct=state.cart.find(product=>product.id===idProduct);

            return deleteProduct.quantity>1
            ?{
                ...state,
                cart:state.cart.map(product=>
                        product.id===action.payload
                        ?{...product, quantity:product.quantity-1}
                        :product
                    )
            }
            :{
                ...state,
                cart:state.cart.filter(product=>
                        product.id!==idProduct
                    )
            }
        }
        default:
            return state
    }
    
}

export default productReducer