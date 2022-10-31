import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import { Layout, Button } from 'antd';
const { Header} = Layout;

function Nav() {

  const dispatch = useDispatch();
  const userId = useSelector( (state) => state );
  const userToken = useSelector( (state) => state );

  useEffect(() =>
    console.log(userToken)
  )

  const logout = () => {
    axios.get('http://localhost:3001/logout',{
      params: {
          "user._id" : userToken,
      }}).then(() => {
        dispatch({type:'deleteId'});
      }
      )
};

    return (
      <div>
        <Layout>
          <Header className="header" style={{backgroundColor:'white'}}>
            <div>
              <div className='Member' style={{float:'right'}}>
                {
                  userId === ""
                  ?
                  <div><Link to={"/Login"}>LOGIN</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to={"/Join"}>JOIN</Link></div>
                  :
                  <div><span>{userToken}님 환영합니다.</span> <Button type="link" onClick={logout()}>LOGOUT</Button></div>
                }

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