import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class SlideBar extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            open:'angle-double-left'
        }
    }
    onClick=()=>{
        this.props.toggleSidebar();
        if(this.state.open==='angle-double-left')
        {
            this.setState({
                open:'angle-double-right'
            })
        }
        else{
            this.setState({
                open:'angle-double-left'
            })
        }
    }
   
    render()
    {
        return ( <div  className= " content-admin">
        <button className="btn p-0 m-0"onClick={this.onClick} >
            <FontAwesomeIcon icon={['fas' , this.state.open]} />
            </button>
        <h3 className="mt-1">Admin</h3>
    </div>
)
}  
}

