import React,{useRef} from 'react'
import Content_Header from './ContentHeader'
import Empty from './Empty'
import Modal from './Modal'
import ProductRow from './ProductRow'
import Axios from 'axios'
import Swal from 'sweetalert2'
import MaterialTable from 'material-table'

export default class  Main extends React.Component {

    state={
        open:false,
        products :[
            // {
            //     id: "bcsd2j",
            //     name: "ABC 1",
            //     price: 20,
            //     img: "",
            //   },
            //   {
            //     id: "8sdsb2",
            //     name: "ABC 2",
            //     price: 20,
            //     img: "",
            //   },
            //   {
            //     id: "sdhsod",
            //     name: "ABC 3",
            //     price: 20,
            //     img: "",
            //   },
        ], isEditing:undefined //index
    }
    componentDidMount()
    {
        console.log("DID MOUNT")
        Axios.get("https://shopping-api-with-jwt.herokuapp.com/products").then(res=>{
            this.setState({
                products:res.data
            })
        }).catch(err=>{
            console.log(err)
        })
        Axios.post("https://shopping-api-with-jwt.herokuapp.com/products",{
              products: [
        
              ],
            },
            {
              headers: {
                token: window.localStorage.getItem("admin_token"),
              },
            }
          )
          .then((res) => {
            console.log("Cart", res);
          })
          .catch((err) => {
            console.log(err);
          });
    }
    
    addProduct=(name,price,id,image)=>{
         const product={
             name,
             price,
             id,
             image
         }
       this.setState({
         products:[...this.state.products,product]
       })
    Axios.post('https://shopping-api-with-jwt.herokuapp.com/products' ,{
        name,
        price,
        id,
        image
    },{
        headers:{
            token:window.localStorage.getItem('admin_token')
        }
    }).then(res=>{
        console.log(res)
        Swal.fire({
            title:"Create Successfully",
            timer:1700,
            icon:'success'
        })
    }).catch(err=>{
        console.log(err)
        Swal.fire({
            title:'Create Unsuccessfully',
            text:err.message,
            timer:1700,
            icon:'error'
        })
    })
    }
    updateProduct=(name,price,id,image)=>{
        Axios.patch(`https://shopping-api-with-jwt.herokuapp.com/products/${id}`,{
            id, 
            name,
            price,
            image
        },{
            headers:{
                token:window.localStorage.getItem('admin_token')
            }
        }).then(res=>{
            console.log(res)
            // Swal.fire({
            //     title:"Create Successfully",
            //     timer:1700,
            //     icon:'success'
            // })
        }).catch(err=>{
            console.log(err)
            // Swal.fire({
            //     title:'Create Unsuccessfully',
            //     text:err.message,
            //     timer:1700,
            //     icon:'error'
            // })
        })
        const new_products=[...this.state.products];
        new_products[this.state.isEditing]={
            ...new_products[this.state.isEditing],
            name,
            price,
            id,
            image
        }
        this.setState({
            products:new_products
        })
    }
    deleteProduct=(id)=>{
        Axios.delete(`https://shopping-api-with-jwt.herokuapp.com/products/${id}`,{
            headers:{
                token: window.localStorage.getItem("admin_token"),
            },
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
  
        const update_product=[...this.state.products].filter((product)=>{
            return product.id!==id
        })
        this.setState({
            products:update_product
        })
    }
     updateIsEditing=(id)=>{
        const product_index=this.state.products.findIndex((product)=>
        {
              return  product.id===id
        })
        this.setState({
            isEditing:product_index
        })
        this.toggleModal()

     }
    toggleModal=()=>{
        this.setState({
            open:!this.state.open
        })

    }
   
   
    clearIsEditing=()=>{
        this.setState({
            isEditing:undefined
        })
    }
    render(){
        return <>
        <main>
                       <Content_Header addProduct={this.addProduct} 
                       toggleModal={this.toggleModal}></Content_Header>
               <div className="table-headers">
                   <div className="table-header"> Name</div>
                   <div className="table-header">Price</div>
                   <div className="table-header">Id</div>
                   <div className="table-header">Image</div>
                   <div className="table-header">Action</div>
               </div>
               {/* <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                columns={[
                    { title: 'Adı', field: 'name' }
            
                ]}
                data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
                title="Demo Title"
                ></MaterialTable>
            </div> */}

                {
                    this.state.products.length>0?
                   this.state.products.map((product)=>{
                       return <ProductRow updateIsEditing={this.updateIsEditing} deleteProduct={this.deleteProduct} key={`Product_id_${product.id}`} product={product}/ >
                    }):<Empty/>
               } 
               {
           this.state.open?<Modal 
           updateProduct={this.updateProduct}
           clearIsEditing={this.clearIsEditing} 
           editingProduct={this.state.products[this.state.isEditing]}
            toggleModal={this.toggleModal} 
              addProduct={this.addProduct}/>:""
       }
       </main> 
       
   </>
              
    }

}



