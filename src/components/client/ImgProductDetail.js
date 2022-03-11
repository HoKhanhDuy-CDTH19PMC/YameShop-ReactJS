import React, { Component } from 'react'
import { Row,Container,Col } from 'reactstrap'

export default class ImgProductDetail extends Component {
    state={
        items:[
        ],
        selected:0
    }
    componentDidMount()
    {
        this.setState({
            items:this.props.items
        })
    }
    handleSelect(index)
    {
        this.setState({
            selected:index
        })
    }
    render() {
        return (
            <React.Fragment>
                <Container fluid>
                        <Row><img src={(typeof this.state.items) !=='string'?this.state.items[this.state.selected]:this.state.items}></img></Row>
                       {(typeof this.state.items) !=='string'
                       && <Row className="mt-3 img-content">
                        {this.state.items.map((items,index)=>{
                            return<Col className="img-items" md={4} onClick={()=>{this.handleSelect(index)}}>
                                <img src={items} key={index}></img>
                            </Col>
                        })}
                    </Row>  }               
                </Container>
            </React.Fragment>
        )
    }
}
