import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import Axios from 'axios';
import { keys } from '@material-ui/core/styles/createBreakpoints';
export default class carts extends Component {
  constructor()
  {
    super();
    this.state={
      products:[
      ],
      total_item:0,
      total_price:0,
      phone:0

  };


  }
  componentDidMount()
    {
      Axios.get(`https://shopping-api-with-jwt.herokuapp.com/carts/${this.props.match.params.id}`).then(
            (res) => {
              console.log(res)
              this.setState({
               products: res.data.cart,
               total_item:res.data.total_item,
               total_price:res.data.total_price,
               phone:res.data.phone
              });
            }
          );
        //   Axios.delete("https://shopping-api-with-jwt.herokuapp.com/carts/TEST",{
        //     headers:{
        //       token: window.localStorage.getItem("admin_token"),
        //   }
        // }).then((res)=>
        //   {
            
        //   }).catch(()=>{

        //   })

    }
    render() {     
     
      console.log(this.state.products)
      // const Image= <img style={{height:'100px',width:'100px'}} src={require('image')} />
      const Image= <img style={{height:'100px',width:'100px'}} src={require('../../asset/imgs/logo192.png')} />

        return (
          
            <div style={{ maxWidth: "100%" }}>
            <MaterialTable
               options={{
                selection: true,
                sorting:true
              }}
              columns={[
                { title: "Name", field: "name" },
                { title: "ID", field: "id" },
                { title: "Price", field: "price" },
                { title: "Quantity", field: "quantity" },
                {
                  title:"Image", marginLeft:'20px',
                  render: cart => <img src={cart.image} style={{width: 80, borderRadius: '',marginLeft:'0px'}}/>
                }
              ]}
              data={this.state.products
           
              }
              title={`Hóa đơn ID: ${this.props.match.params.id} - Total: ${this.state.total_item}
              - Total Price: ${this.state.total_price}
              - Phone: ${this.state.phone}
              `}
            />
          </div>
        )
    }
}

