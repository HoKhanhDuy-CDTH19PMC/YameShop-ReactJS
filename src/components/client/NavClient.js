import React from 'react'
import{Link} from 'react-router-dom'
import { 
    Navbar,
    Collapse, 
    Container, 
    DropdownItem, 
    DropdownMenu,
    NavbarText, 
    DropdownToggle, 
    Nav, 
    NavbarBrand, 
    NavbarToggler, 
    NavItem, 
    NavLink, 
    UncontrolledDropdown,
    Button, 
} from 'reactstrap';
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function NavClient(props) {
    const toggle=true;
    const isOpen=true;
    return (
      <React.Fragment>
             <Container fluid={true} className="sticky-top">
                                <Navbar id="navbar" light expand="md">
                                  <NavLink>
                                    <Link exact to="/">HOME</Link>
                                  </NavLink>
                            <NavLink >
                                <Link to="/admin">ADMIN</Link>
                            </NavLink>
                            {/* <NavbarToggler onClick={toggle} /> */}
                            <Collapse isOpen={isOpen} navbar className="d-flex">
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                <NavLink >
                                  <Link to="/products/">PRODUCTS</Link>
                                  </NavLink>
                                </NavItem>
                                {/* <NavLink >
                                  <Link to="/cart">Cart</Link>
                                </NavLink> */}
                   
                            </Nav>
                            <NavbarBrand>
                            <NavLink >
                                  <Link to="/cart">
                                  <Button outline={false} color="white" className="cart-btn">
                          
                          <span className="badger">{props.cart_total}</span>
                        <FontAwesomeIcon icon={['fa' , 'cart-plus',]} size='lg' className="cart-plus" /> </Button> 
                                  </Link>
                                </NavLink>
                      
                            </NavbarBrand>

                            </Collapse>
                        </Navbar>
        </Container>
      </React.Fragment>
    )
}
const mapStateToProps=(state)=>{
const  total=state.cart.reduce((sum,product)=>{
    return sum=product.quantity+sum
  },0)
  return {
    cart_total:total
  }
}
export default connect(mapStateToProps)(NavClient)
