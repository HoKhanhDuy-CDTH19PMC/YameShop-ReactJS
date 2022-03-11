import Axios from 'axios'
import React from 'react'
import Product from './Product'
import API_CONSTANT from '../../asset/constant/api'
import {connect} from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";

class ProductList extends React.Component {
    
    state={
        products:[],
        loading:false
    }
    componentDidMount()
    {
        this.setState({
            loading:true
        })
        Axios.get(API_CONSTANT.DOMAIN + '/products').then(res=>{
            this.setState({
                products:res.data,
                loading:false
            })
            }).catch(err=>{
                console.log(err)
        })
    }
    render() {
        return (
            <>
            {
                this.state.loading && <div className="loading-ProductList d-flex justify-content-center align-items-center ">
                    <ClipLoader
          size={200}
          color={"blue"}
          loading={this.state.loading}
        /></div> 
            }
                {this.state.products.map((product, index) => {
                    return <Product addToCart={this.props.addToCart} key={`$product_${index}`} id={product.id} name={product.name} price={product.price} image={product.image ? product.image[0] : null}
                    ></Product>
                })}
            </>
        )
    }
}
const mapDispatchToProps=(disPatch)=>{
    return {
       addToCart:(product,quantity)=>{
          disPatch({type:"ADD_TO_CART", payload:{
              ...product,
              quantity
          }})
       }
        
    }
}
export default connect(null,mapDispatchToProps)(ProductList)


