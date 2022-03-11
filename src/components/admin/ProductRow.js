import React ,{useRef} from 'react'

export default function ProductRow(props) {
    // state={
    //     product:[
            
    //     ]
    // }
    const typingTimeoutRef = useRef(null)

    const handleDelete=()=>{

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            props.deleteProduct(props.product.id)

        }, 500)
    }
    const handleUpdate=()=>{
    props.updateIsEditing(props.product.id)
    }
    const {  name, price,id, image }=props.product
    
    return ( 

        
    <div className="table-rows">
            <div className="table-cell">{name}</div>
            <div className="table-cell">{price}$</div>
            <div className="table-cell">{id}</div>
            <div className="table-cell image-row"><img src={image ? image[0] : null}></img></div>
            <div className="table-cell">
                <div className="btn bg-color-primary mr-1" onClick={handleUpdate}>Edit</div>
                <div className="btn btn-danger" onClick={handleDelete}>Delete</div>
            </div>
        </div>
    )
}



