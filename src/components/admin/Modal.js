import React, { Component } from 'react'

import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
export default class Modal extends Component {
    state={
        name:"Product new",
        price:"Price",
        id:"ID",
        image_one:"//bizweb.dktcdn.net/thumb/large/100/331/067/products/115844444-311743083208439-6108934669943805257-n.jpg?v=1595330674000",
        image_two:"//bizweb.dktcdn.net/thumb/large/100/331/067/products/115844444-311743083208439-6108934669943805257-n.jpg?v=1595330674000",
        image_three:"//bizweb.dktcdn.net/thumb/large/100/331/067/products/115844444-311743083208439-6108934669943805257-n.jpg?v=1595330674000"
    }
    handleClose=()=>{
        this.props.toggleModal()
    }
    componentDidMount()
    {
        if(this.props.editingProduct)
        {
             const{name,price,id}=this.props.editingProduct
             console.log("MODAL EDIT")
             this.setState({
                 name,
                 price,
                 id
             })
        }
        else{
            console.log("MODAL CREATE")
        }
    }
    componentDidUpdate()
    {
        console.log("DID UPDATE")

    }
    componentWillUnmount()
    {
        console.log("DID UNMOUNT")
        this.props.clearIsEditing()

    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault()

        const{name,price,id,image_one,image_two,image_three}=this.state
        const image=[image_one,image_two,image_three]
        if(this.props.editingProduct)
        {
            this.props.updateProduct(name,price,id,image)
        }
        else{
            this.props.addProduct(name,price,id,image)
        }

        this.props.toggleModal()
    }
    render() {
        const {name,price,id,image_one,image_two,image_three}=this.state
        return ( <React.Fragment>
            <div className="modal">

                         <div className="content-modal p-2">
                             <button className="close btn btn-primary" onClick={this.handleClose}>
                             <FontAwesomeIcon icon={['fa' , 'times-circle']} /></button>
                             <h3 className="content-modal-header">{this.props.editingProduct?'Update':'Create'} Product</h3>
                             <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label ><h3>Product</h3></label>
                        <input type="text" className="form-control"  name="name"value={name} onChange={this.handleChange}/>
                        <label ><h3>Price</h3></label>
                        <input type="text" className="form-control"   name="price"value={price}  onChange={this.handleChange} />
                        <label ><h3>ID</h3></label>
                        <input type="text" className="form-control"   name="id"value={id}  onChange={this.handleChange} />
                        <label ><h3>Product Image</h3></label>
                        <input type="text" className="form-control" name="image_one" placeholder="Product Image 1" value={image_one} onChange={this.handleChange}/>
                        <label ><h3>Product Image</h3></label>
                        <input type="text" className="form-control" name="image_two" placeholder="Product Image 2" value={image_two} onChange={this.handleChange}/>
                        <label ><h3>Product Image</h3></label>
                        <input type="text" className="form-control" name="image_three" placeholder="Product Image 3" value={image_three} onChange={this.handleChange}/>
                    </div>
                    <div className="row-submit">
                    <button type="submit" className="btn  cl-pri" id="submit">
                        {this.props.editingProduct?"UPDATE":"ADD"}
                        </button>
                    </div>
                    </form>
                         </div>
            </div>                
        </React.Fragment>
        )
    }
}

