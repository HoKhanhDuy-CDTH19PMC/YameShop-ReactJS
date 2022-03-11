import React from 'react'
import  './client.scss'
import NavClient from './NavClient';

import { 
    Container, 
    Row
} from 'reactstrap';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';

export default function ClientShopping(props) {
 
    return (
        <React.Fragment>
           <NavClient></NavClient>
          <Container >
             <Row className="mt-3">
               <SidebarLeft></SidebarLeft>
              <SidebarRight></SidebarRight>
             </Row>
          </Container>
        </React.Fragment>
      
    )
}
