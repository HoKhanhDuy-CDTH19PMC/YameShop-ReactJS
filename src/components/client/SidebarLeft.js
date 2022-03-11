import React from 'react'
import { 
    Col, 
    ListGroup, 
    ListGroupItem, 

} from 'reactstrap';
function SidebarLeft() {
    return (
        <React.Fragment>
              <Col md={3} id="sidebar-left">
                                <ListGroup>
                                            <ListGroupItem>Áo thun </ListGroupItem>
                                            <ListGroupItem>Quần tây</ListGroupItem>
                                            <ListGroupItem>Túi xách</ListGroupItem>
                                            <ListGroupItem>Phụ kiện</ListGroupItem>
                                            <ListGroupItem>Sale</ListGroupItem>
                                    </ListGroup>
                 </Col>
        </React.Fragment>
    )
}

export default SidebarLeft