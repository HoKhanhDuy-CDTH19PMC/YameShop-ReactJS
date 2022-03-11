import React from 'react'
import { Button, Container,CardSubtitle } from 'reactstrap'
import {
    Col,
    Row,
    Spinner

} from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { withRouter } from 'react-router-dom'
import CommonQuantityInput from './CommonQuantityInput';
import ImgProductDetail from './ImgProductDetail';
import Axios from 'axios';
import API_CONSTANT from '../../asset/constant/api'
import NavClient from './NavClient';
import { connect } from 'react-redux';

class ProductDetail extends React.Component {
    state = {
        quantity: 1,
        product_detail: {
            id: null,
            name: '',
            image: []
        },
        loading: undefined
    }
    componentDidMount() {
        this.setState({
            loading: true,
        })
        Axios.get(`${API_CONSTANT.DOMAIN}/products/${this.props.match.params.id}`).then(res => {
            this.setState({
                product_detail: res.data,
                loading: false
            })
        }).catch(err => {
            console.log(err)
        })
    }

    handleChangeQuantity = (data, operator = false) => {
        if (operator) {
            return this.setState({
                quantity: this.state.quantity + data
            })
        }
        else {
            this.setState({
                quantity: data
            })
        }
    }
    handleAddToCart=()=>{
        this.props.addToCart({
            ...this.state.product_detail,
            image:this.state.product_detail.image[0]
        },this.state.quantity)
    }

    items = [
        "https://product.hstatic.net/1000351433/product/4a3c7686-0b83-4ab1-abff-de3d21a1758e_31d51d9c063940f09bddd0e5ac3475d3_grande.jpg",
        "https://product.hstatic.net/1000351433/product/4eee6a98-f7e1-4c2d-a132-b301793f3722_fae4260f34d14b4fb1817eeb2a69d7c7_grande.jpg",
        "https://product.hstatic.net/1000351433/product/e5c92366-2f71-425b-8d4b-49be6b8d2399_36fdea90d03a43cf8c53c7079f0c2db1_grande.jpg"
    ]
    render() {
        const { name, price, image,id } = this.state.product_detail
        return (
            <React.Fragment>
                <NavClient></NavClient>
                {this.state.loading === false ?
                    <Container id="productDetail">
                        <Row>
                            <Col md={5} id="left">
                                <ImgProductDetail items={image}></ImgProductDetail>
                            </Col>
                            <Col md={7} id="right">
                                <CardSubtitle className="productDetail-Name">
                                    {name}
                                </CardSubtitle>
                                <CardSubtitle tag="h5" className="mb-3 text-muted">Product ID {this.props.match.params.id}</CardSubtitle>
                                    <CardSubtitle tag="h5" className="mb-3 text-muted">Price: {price}$</CardSubtitle>
                                <CommonQuantityInput value={this.state.quantity} onChange={this.handleChangeQuantity}></CommonQuantityInput>
                                    <Button  color="warning"  onClick={this.handleAddToCart}>Add to cart</Button>
                            </Col>
                        </Row>
                    </Container> :
                    <div className="loading d-flex justify-content-center align-items-center">
                        <ClipLoader
                            size={200}
                            color={"#123abc"}
                            loading={this.state.loading} />
                    </div>}
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToCart: (product, quantity) => {
            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    ...product,
                    quantity
                }
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(withRouter(ProductDetail))

