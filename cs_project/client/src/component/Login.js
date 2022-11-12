import { useDispatch } from 'react-redux';
import 'antd/dist/antd.min.css';
import {  Breadcrumb, Button, Checkbox, Form, Input  } from 'antd';
import  { Link, useNavigate } from 'react-router-dom'; 
import Header from "./Header";
import Nav from "./Nav";
import axios from 'axios';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        let body = {
            userId : values.userId,
            password : values.password
        }
        axios.post('http://localhost:3001/login', body)
        .then((response) => {
            if (response.data.loginSuccess) {
                dispatch({type:'getId', userId: response.data.userId});
                navigate('/');
            }
            else {
                alert('Error');
            }
        });
    }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        
        <div className="Login">
            <div className="Header"><Header/></div>
            <div className="Nav" style={{float:"left"}}><Nav/></div>
            <div className="Content" style={{float:"left", width:"80%", paddingLeft:'5%', paddingRight:'5%'}}>
                <div className="Breadcrumb">
                    <Breadcrumb
                    style={{
                        margin: '20px 0 0 20px',
                    }}
                    >
                        <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Login</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="Margin" style={{marginTop:'100px'}}></div>
                <div className="Title" style={{textAlign:'center'}}><h1>Login</h1></div>
                <div className="Form">
                    <Form style={{width:'50%', margin:'auto'}}
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 12,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="아이디"
                            name="userId"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your userId!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="비밀번호"
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                            offset: 8,
                            span: 16,
                            }}
                        >
                            <Checkbox>아이디 기억하기</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                            offset: 10,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                            로그인
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default Login;