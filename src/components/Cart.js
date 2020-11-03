import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import { removeFromCart } from '../actions/cartActions'
import {connect} from 'react-redux'
import {createOrder,clearOrder} from '../actions/orderActions'
import Modal from "react-modal"
import Zoom from 'react-reveal/Zoom'

class Cart extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            email:"",
            address:"",
            showCheckout:false
        }
    }

    handleInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    createOrder=(e)=>{
        e.preventDefault();
        const order={
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems,
            total:this.props.cartItems.reduce((a,c)=> a+c.price*c.count,0)
        }
        this.props.createOrder(order);
    }
    closeModal=()=>{
      this.props.clearOrder();  
    }
    render() {
        const {cartItems,order}=this.props
        return (
            <div>
              <div>
                {
                cartItems.length===0?
                <div className="cart cart-header">Cart is empty</div>:
                <div className="cart cart-header">You have {cartItems.length} items in the cart</div>
                }
             </div>
             {order && (
                <Modal 
                  isOpen={true}
                  onRequestClose={this.closeModal}>
                <Zoom>
                    <button className="close-modal" onClick={this.closeModal}>X</button>
                    <div className="order-details">
                        <h2 className="success-message">Your order has been placed</h2>
                        <h2>Order Id {order._id}</h2>
                        <ul>
                            <li>
                                <div className="arrange">
                                    <div>Name:</div>
                                    <div>{order.name}</div>
                                 </div>
                            </li>
                            <li>
                                 <div className="arrange">
                                    <div>Email:</div>
                                    <div>{order.email}</div>
                                </div>
                            </li>
                            <li>
                                <div className="arrange">
                                    <div>Address:</div>
                                    <div>{order.address}</div>
                                </div>
                            </li>
                            <li>
                                <div className="arrange">
                                    <div>Total:</div>
                                    <div>{formatCurrency(order.total)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="arrange">
                                    <div>Cart Items:</div>
                                    <div>{order.cartItems.map(x=>(
                                    <div> 
                                        {x.count} {"x"} {x.title}
                                    </div>
                                ))}</div>
                                </div>
                            </li>

                        </ul>
                     </div>
                </Zoom>
             
                </Modal>
             )}
             <div className="mycart">
                <Fade left cascade>
                <ul className="cart-items">
                    {cartItems.map((item)=>(
                        <li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div>
                                <div>{item.title}</div>
                                <div className="right">
                                    {formatCurrency(item.price)} x {item.count} {" "}
                                    <button onClick={()=> this.props.removeFromCart(item)}>Remove</button>
                                </div>
                               
                            </div>
                        </li>
                    ))}
                </ul>
                </Fade>
             </div>
             {cartItems.length!==0 &&(
               <div>
                    <div className="cart">
                    <div className="total">
                     <div>
                        Total: {""}
                        {formatCurrency(cartItems.reduce((a,c)=> a+c.price*c.count,0))}
                      </div>
                    <button onClick={()=> {this.setState({showCheckout:true})}} 
                    className="button-primary">Proceed</button>
                     </div>
                    </div>
             {this.state.showCheckout && (
                 <Fade right cascade>
                 <div className="cart">
                    <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                            <li>
                                <label>Email</label>
                                <input type="email" name="email" required onChange={this.handleInput}/>
                            </li>
                            <li>
                                <label>Name</label>
                                <input type="text" name="name" required onChange={this.handleInput}/>
                            </li>
                            <li>
                                <label>Address</label>
                                <input type="text" name="address" required onChange={this.handleInput}/>
                            </li>
                            <li>
                                <button classname="button-primary" type="submit">Checkout</button>
                            </li>
                        </ul>  
                    </form>
                 </div>
                 </Fade>
             )}
             </div>
             )}
             
            </div>

        )
    }
}

export default connect((state)=>({
    order:state.order.order,
    cartItems:state.cart.cartItems
    
}),{
    removeFromCart,
    createOrder,
    clearOrder
}
)(Cart);