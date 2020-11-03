//feature-1


import React, { Component } from 'react'
//import data from './data.json'
import Products from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'
import store from './store'
import {Provider} from "react-redux"



export default class App extends Component {
  /*
  constructor(){
    super()
    this.state={
     /* products:data.products,
      size:"",
      sort:"",
      cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
    }
  }*/

  /*
  createOrder=(order)=>{
    alert(`Hello ${order.name} your address is taken....`);
  }
  removeFromCart=(product)=>{
    const cartItems=this.state.cartItems.slice();
    this.setState({
      cartItems:cartItems.filter((x)=> x._id!==product._id)
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x)=> x._id!==product._id)));
  }

  addToCart=(product)=>{
    const cartItems=this.state.cartItems.slice();
    let alreadyInCart=false;
    cartItems.forEach((item)=>{
      if(item._id===product._id){
        item.count++;
        alreadyInCart=true;
      }
    })
    if(!alreadyInCart){
      cartItems.push({...product,count:1})
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

  }*/
  /*
  sortProducts=(event)=>{
    const sort =event.target.value
    console.log(event.target.value)
    this.setState({ // we removed state here
      sort:sort,
      products:this.state.products.slice().sort((a,b)=>(
        sort==="lowest"?
        ((a.price < b.price) ? -1:1):
        sort==="highest"?
        ((a.price > b.price) ? -1:1):
        ((a._id > b._id) ? -1:1)
      ))
    })
    
  }
  sizeProducts=(event)=>{
    console.log(event.target.value)
    if(event.target.value==="ALL"){
      this.setState({
        size:event.target.value,
        products:data.products
      })
    }
    else{
      this.setState({
        size:event.target.value,
        products:data.products.filter((product)=>(
          product.availableSizes.indexOf(event.target.value) >=0
        ))
      })
    }
  }*/
  render() {
    return (
      <Provider store={store}>
      <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter>
             {/*count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              sizeProducts={this.sizeProducts}
             sortProducts={this.sortProducts}*/}
            </Filter>
            <Products 
            /*products={this.state.products} 
              addToCart={this.addToCart}*//>
          </div>
          <div className="sidebar">
            <Cart /*cartItems={this.state.cartItems} 
            removeFromCart={this.removeFromCart}
            createOrder={this.createOrder}*/ />
          </div>
        </div>

      </main>
      <footer>
        All rights reserved
      </footer>
    
    </div>
    </Provider>
    )
  }
}

 