import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import  { useNavigate } from 'react-router-dom'; 
import { Layout, Button } from 'antd';
const { Header} = Layout;



function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector( (state) => state );

  const logout = () => {

    let body = {
      userId : userId,
    }

    axios.post('http://localhost:3001/logout', body).then((req) => {
      console.log(req);
      dispatch({type:'deleteId'});
      alert('로그아웃되었습니다.');
      navigate('/');
    })
  };

    return (
      <div>
        <Layout>
          <Header className="header" style={{backgroundColor:'white'}}>
            <div>
              <div className='Member' style={{float:'right'}}>
                {
                  userId === undefined
                  ?
                  <div><Link to={"/Login"}>LOGIN</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to={"/Join"}>JOIN</Link></div>
                  :
                  <div><span>{userId}님 환영합니다.</span> <Button type="link" onClick={() => logout()}>LOGOUT</Button></div>
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