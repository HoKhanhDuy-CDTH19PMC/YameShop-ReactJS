import React from 'react'
import './admin.scss'
import SlideBar from './SlideBar'
import Main from './Main'
import Navbar from './Navbar'

import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css'
import Axios from 'axios'
import { ListGroupItem,DropdownToggle,
    UncontrolledDropdown,
    DropdownItem,
} from 'reactstrap'
export default class ShoppingAdmin extends React.Component {
    state = {
        sidebar_open: true,
        total_cart:[],
        toggle:true
    }
    // pt moi phai dung arrow de co bien this
    toggleSidebar = () => {
        this.setState(
            {
                sidebar_open: !this.state.sidebar_open
            }
        )
    }
    componentDidMount()
    {
        Axios.get("https://shopping-api-with-jwt.herokuapp.com/carts",
        {
        }).then((res)=>{
            this.setState({
                total_cart:res.data
            })
        }).catch((err)=>{
            console.log(err)
        })
        const token=window.localStorage.getItem('admin_token');
        if(!token)
        {
            this.props.history.push('/admin/login')
        }
    }
 
    render() {
      

        return (
            <div>
                <Navbar></Navbar>
                <main className="container-fluid">
                    <div className="row">
                        <div className="col-md-2  slide-bar" id="slide-bar" style={{ 'display': this.state.sidebar_open ? 'block' : 'none' }}>
                        <DropdownToggle nav caret color="black" className="content-order">
                                Order
                        </DropdownToggle>


                          {
                              this.state.total_cart.map((cart)=>{
                                    return (
                                                 <ListGroupItem right>
                                            <Link  to={`/carts/${cart.id}`}>
                                             {cart.id}
                                         </Link>
                                        </ListGroupItem>
                                    )
                              })
                          }
                           
                        </div>
                        <div className={this.state.sidebar_open ? "col-md-10": "col-md-12"}>
                            <SlideBar toggleSidebar={this.toggleSidebar}></SlideBar>
                            <Main></Main>
                        </div>
                    </div>
                </main>
           
            </div>
        )
    }
}

