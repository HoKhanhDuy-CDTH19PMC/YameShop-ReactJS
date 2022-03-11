import React from 'react';
import ShoppingAdmin from './components/admin/ShoppingAdmin.js';
import ClientShopping from './components/client/ClientShopping.js';
import ProductDetail from './components/client/ProductDetail.js';
import Carts from './components/admin/Carts.js';

import Cart from './components/client/Cart.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/admin/Login.js';
import {createStore} from 'redux'
import {Provider} from 'react-redux'  
import Home from './components/client/Home.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCode, faHighlighter,faAngleDoubleLeft,
  faAngleDoubleRight,
  faAlignJustify,
  faPlus, 
  faTimesCircle,faCartPlus,
  faSearch,
  faMapMarker
 } from '@fortawesome/free-solid-svg-icons'

library.add(  faCode,
  faHighlighter,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAlignJustify,
  faPlus,
  faTimesCircle,
  faCartPlus,
  faSearch,
  faMapMarker
  )
function App() {
  const initState ={
    cart:[
 
    ]
   
  }
  const root_reducer = function(state = initState,action){
    console.log(state,action)
    if(action.type==="ADD_TO_CART")
    {
      const exist_product_index=state.cart.findIndex(product=>product.id===action.payload.id)
      let new_cart;
      if(exist_product_index<0)
      {
        new_cart=
        [
          ...state.cart,
          {
            ...action.payload,
            id_cart:Date.now()
          }
        ]
      }
      else
      {
        new_cart=[...state.cart];
        new_cart[exist_product_index].quantity= new_cart[exist_product_index].quantity+action.payload.quantity
      }
      return {
        ...state,
       cart:new_cart
      }
    }else if(action.type==="UPDATE_CART")
    {
      const exist_product_index=state.cart.findIndex(product=>product.id_cart===action.payload.id_cart)
      const new_cart=[...state.cart]
      new_cart[exist_product_index].quantity=action.payload.quantity
      return {
        ...state,
        cart:new_cart
      }
    }else if(action.type==="DELETE_CART")
    {
      const new_cart=state.cart.filter(product=>{
        return product.id_cart!==action.payload
      })
      return {
        ...state,
        cart:new_cart
      }
    }else if(action.type==="CLEAR_CART")
    {
      return{
        ...state,
        cart:[]
      }
    }
    return  state
  }

  const store = createStore(root_reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
    )

  return (
<Provider store={store}>
<Router>
      <div>
        <Switch>
          <Route exact path="/">
              <Home></Home>
          </Route>
            <Route  path="/admin/login" component={Login}> 
            </Route>
            <Route path="/admin" component={ShoppingAdmin}>
            </Route>
            <Route path="/cart">
                <Cart/>
            </Route>
            <Route path="/products/:id">
                 <ProductDetail/>
            </Route>    
            <Route path='/products'>
               <ClientShopping></ClientShopping>
            </Route>
            <Route path="/carts/:id" render={props=>
            <Carts {...props} ></Carts>} >
            </Route>
            </Switch>
      </div>
    </Router>
</Provider>
  );
}

export default App;
