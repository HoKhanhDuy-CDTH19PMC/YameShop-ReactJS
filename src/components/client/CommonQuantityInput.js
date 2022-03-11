import React from 'react'
import { 
    Row, 
    Col, 
} from 'reactstrap';
import '../client/scss/commonInput.scss'
function CommonQuantityInput(props) {
    return (
        <React.Fragment>
            <Row className="quantityInput">
                <Col md={4} className="minus" onClick={()=>props.onChange &&props.onChange(-1,true)}>-</Col>
                <Col md={4} className="quantity">
                <input value={props.value || 0} onChange={(event)=>{props.onChange&&props.onChange(Number(event.target.value))}} ></input>
                </Col>
                <Col md={4} className="plus" onClick={()=>props.onChange &&props.onChange(1,true)}>+</Col>
            </Row>
        </React.Fragment>
    )
}

export default CommonQuantityInput
