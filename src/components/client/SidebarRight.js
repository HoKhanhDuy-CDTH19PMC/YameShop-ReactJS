import React from 'react'
import { 
    Row, 
    Col, 
} from 'reactstrap';
import ProductList  from './ProductList'
function SidebarRight(props) {
    return (
        <React.Fragment>
               <Col md={9} id="sidebar-right">
                                    <Row>
                               <ProductList ></ProductList>
                                    </Row>
                 </Col>
        </React.Fragment>
    )
}

export default SidebarRight
