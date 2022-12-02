import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import  { useNavigate } from 'react-router-dom'; 
import { Layout, Button } from 'antd';
const { Header} = Layout;



function Nav() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  const loginCheck = () => { // 페이지에 들어올때 사용자 체크
    axios.get('/api/auth').then((res) => {
      if(!res.status === 200) {
          /** res 보고 예외처리 꼼꼼하게 */
          if(res.data.err.message) {
              alert(res.data.err.message);
          } else {
              alert("예외처리");
          }
      } else {
        setUserId(res.data.userId);
      }
    })
	};

  const logout = () => {

    let body = {
      userId : userId
    }

    axios.post('/api/logout', body).then((req) => {
      alert('로그아웃되었습니다.');
      navigate('/');
    })
  };

  useEffect(()=>{
    loginCheck()
  },[])

    return (
      <div>
        <Layout>
          <Header className="header" style={{backgroundColor:'white'}}>
            <div>
              <div className='Member' style={{float:'right'}}>
                {
                  userId
                  ?
                  <div><span>{userId}님 환영합니다.</span> <Button type="link" onClick={() => logout()}>LOGOUT</Button></div>
                  :
                  <div><Link to={"/Login"}>LOGIN</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to={"/Join"}>JOIN</Link></div>
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