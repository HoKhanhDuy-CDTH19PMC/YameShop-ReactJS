import React from 'react'
import {Link} from 'react-router-dom'
import {NavbarBrand} from 'reactstrap'
function Navbar() {
    return (
        <div className="sticky-top">
                <div className="row col-md-12  m-0" id="navbarAD" >
                <NavbarBrand>
                                    <Link exact to="/products" >All Products</Link>
                </NavbarBrand>
                </div>
        </div>
    )
}

export default Navbar
