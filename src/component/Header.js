import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { Layout } from 'antd';
const { Header} = Layout;

function Nav() {
    return (
      <div>
        <Layout>
          <Header className="header" style={{backgroundColor:'white'}}>
            <div>
              <div className='Member' style={{float:'right'}}>
                <Link to={"/Login"}>LOGIN</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={"/Join"}>JOIN</Link>
              </div>
              <div className="Home">
                <Link to={"/"}>HOME</Link>
              </div>
            </div>
          </Header>
        </Layout>
      </div>
    )
}

export default Nav;