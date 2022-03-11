import React, { Component, useRef } from 'react'
import {


  Container
  , Row,
  Col,
  CardBody,
  CardTitle,
  Button,
  Card,
  CardImg,  
  CardSubtitle

} from 'reactstrap';
import Empty from '../admin/Empty'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'font-awesome/css/font-awesome.min.css'
import NavClient from './NavClient';
import CommonQuantityInput from './CommonQuantityInput';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import Axios from 'axios'
class CardProduct extends React.Component {
  state = {
    quantity: 0,
  }
  componentDidMount() {
    this.setState({ quantity: this.props.product.quantity })
  }
  handleChangeQuantity = (data, operator = false) => {
    if (operator) {
      if (this.state.quantity === 1 && data === -1) {
        this.handleDelete()
      }
      return this.setState({
        quantity: this.state.quantity + data
      }, () => {
        this.props.updateCart(this.props.product.id_cart, this.state.quantity)
      })
    }
    if (data === 0 || data < 0) {
      //delete
      this.handleDelete()
    }
    this.setState({
      quantity: data
    }, () => {
      this.props.updateCart(this.props.product.id_cart, this.state.quantity)
    })
  }
  handleDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.deleteCart(this.props.product.id_cart)
        Swal.fire(
          {
            title: "Deleted!",
            showCancelButton: false,
            timer: 1000,
            icon: "success",
            timerProgressBar: true
          }

        )
      }
    })
  }
  render() {
    const { name, price, quantity, image, id, card_id } = this.props.product;
    return <Row className="cart">
      <Col md={4}>
        <img src={image}></img>

      </Col>
      <Col md={7} className="p-4 info-cart">
      <Card>
                                    <CardBody>
                                    <CardTitle tag="h5" >{name}
                                    </CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">ID: {id}</CardSubtitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Price: {price}</CardSubtitle>
                                    <CommonQuantityInput className="" value={this.state.quantity} onChange={this.handleChangeQuantity}></CommonQuantityInput>
                                    </CardBody>
                                    
                                   </Card>
        {/* <Row tag="h4"></Row>
        <Row tag="h5" color="secondary" className="text-warning">Price {price}$</Row> */}
    
      </Col>
    </Row>
  }
}
class CheckoutModal extends React.Component {
  state = {
    full_name: "",
    phone: "",
    address: ""
  }
  
  handleClose = () => {
    this.props.toggleModal()
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
 handleCreateCarts =  ( )=>
 {
     const typingTimeoutRef = useRef(null)
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(() => {
          Axios.post('https://shopping-api-with-jwt.herokuapp.com/carts',{
            ...this.state,
            cart:[
              ...this.props.cart
            ],
            total_item:this.props.total_item,
            total_price:this.props.total_price,
            headers:{
              token: window.localStorage.getItem("admin_token"),
          }
           }
        ).then((res)=>{
              console.log(res)
           }).catch((err)=>{
             console.log(err)
           })
        }, 500)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    
    Axios.post('https://shopping-api-with-jwt.herokuapp.com/carts',{
      ...this.state,
      cart:[
        ...this.props.cart
      ],
      total_item:this.props.total_item,
      total_price:this.props.total_price
    }).then(res=>{
      Swal.fire({
            title: "Checkout Success",
            showCancelButton: true,
            timer: 1000,
            icon: "success",
            timerProgressBar: true
      }).then(()=>{
        this.props.clearCart()
        this.handleClose()
      })

      console.log(res)
    }).catch(err=>{
      Swal.fire({
        title: "Checkout Unsuccess",
        showCancelButton: true,
        timer: 1000,
        icon: "error",
        timerProgressBar: true
  })
      console.log(err)
    })
    // const { name, price, id } = this.state
    // if (this.props.editingProduct) {
    //   this.props.updateProduct(name, price, id)
    // }
    // else {
    //   this.props.addProduct(name, price, id)
    // }

    // this.props.toggleModal()
  }
  render() {
    const{full_name,phone,address}=this.state
   return <div className="modal">

      <div className="content-modal p-2">
        <button className="close btn btn-primary" onClick={this.handleClose}>
          <FontAwesomeIcon icon={['fa', 'times-circle']} /></button>
        <h3 className="content-modal-header">
          {/* {this.props.editingProduct ? 'Update' : 'Create'}  */}
          
          Checkout</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label ><h3>Full Name</h3></label>
            <input type="text" className="form-control" name="full_name"placeholder="Full Name" value={full_name} onChange={this.handleChange} />
            <p>Check name</p>
            <label ><h3>Phone</h3></label>
            <input type="text" className="form-control" name="phone" placeholder="Phone"value={phone} onChange={this.handleChange} />
            <p>Check phone</p>
            <label ><h3>Address</h3></label>
            <input type="text" className="form-control" name="address"placeholder="Address" value={address} onChange={this.handleChange} />

          </div>
          <div className="row-submit">
            <Button type='submit' color='warning'>Checkout</Button>
            {/* <button type="submit" className="btn  cl-pri" id="submit">
              {this.props.editingProduct ? "UPDATE" : "ADD"}
            </button> */}
          </div>
        </form>
      </div>
    </div>
  }
}
class Cart extends Component {
  state={
    open:false,
  }
  toggleModal=()=>{
    this.setState({
      open:!this.state.open
    })
  }
  render() {
    return (
      <React.Fragment>
        <NavClient></NavClient>
        <Container>
          <Row>
            <Col md={8} className="Product-Card">
              {this.props.cart.length > 0 ?
                this.props.cart.map(product => {
                  return <CardProduct deleteCart={this.props.deleteCart} updateCart={this.props.updateCart} product={product} key={product.id_cart} />
                }) :
                <Empty></Empty>
                }
            </Col>
            <Col md={3} className="Product-Total">
              <CardBody>
                <CardTitle tag="h4">Total Items: {this.props.total_item}</CardTitle>
                <CardTitle tag="h4" className="text-warning">Total Price: {this.props.total_price}$</CardTitle>
                <Button color="warning" onClick={this.toggleModal}>Checkout</Button>
              </CardBody>
            </Col>

          </Row>
        </Container>
        {
          this.state.open?<CheckoutModal  total_item={this.props.total_item}
          total_price={this.props.total_price}
          cart={this.props.cart} 
          clearCart={this.props.clearCart}
           toggleModal={this.toggleModal}></CheckoutModal>:''
        }

      </React.Fragment>
    )

  }

}
const mapStateToProps = state => {
  const total_item = state.cart.reduce((sum, product) => {
    return sum = product.quantity + sum
  }, 0)
  const total_price = state.cart.reduce((sum, product) => {
    return sum = product.quantity * product.price + sum
  }, 0)
  return {
    cart: state.cart,
    total_item,
    total_price
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateCart: (id_cart, quantity) => {
      dispatch({
        type: "UPDATE_CART",
        payload: {
          id_cart,
          quantity
        }
      })
    },
    deleteCart: id_cart => {
      dispatch({
        type: "DELETE_CART",
        payload: id_cart
      })
    },clearCart:()=>
    {
      dispatch({
        type:"CLEAR_CART"
      })
    }
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
