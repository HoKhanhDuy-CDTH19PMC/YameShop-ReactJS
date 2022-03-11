import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from '@material-ui/core';
import{Row} from 'reactstrap'
export default function ContentHeader(props) {
    const handleClick = () => {
        props.toggleModal();
    }
        return (
            <React.Fragment>
            <div className="main-content">
                <div className="search-row">
                <FontAwesomeIcon icon={['fa' , 'search']} className="search-icon"/>
                <Input type="text" id="search-input" placeholder="Search">

                </Input>

                </div>

                     <h3 className="name">Products</h3>
                     <button className="btn btn-add" onClick={handleClick}>
                     <FontAwesomeIcon icon={['fa' , 'plus']}/>  Product
                     </button>
          </div>
     </React.Fragment>
        )
    }    



