import React from 'react'
import { NavLink,Link } from 'react-router-dom';
import { Button, 
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';

function Product(props) {
    const {name,image,price,id}=props;
    const handleAddToCart=()=>{
        props.addToCart({
            id,
            name,
            price, 
            image:image
        },1)
    }
    return (
        <React.Fragment>
             <Col md={3}>
                                     <Card>
                                    <CardImg top width="100%" src={image} />
                                    <CardBody>
                                    <CardTitle tag="h5" >
                                         <Link  to={`/products/${id}`}>{name}</Link>
                                    </CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">ID {id}</CardSubtitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Price: {price}</CardSubtitle>
                                    <Button onClick={handleAddToCart}>Add to cart</Button>
                                    </CardBody>
                                   </Card>
                                     </Col>
        </React.Fragment>
    )
}

export default Product
