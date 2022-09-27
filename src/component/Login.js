import 'antd/dist/antd.min.css';
import {  Button, Checkbox, Form, Input  } from 'antd';
import Nav from "./Nav"

function Login() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="Login">
            <div className="NavDiv"><Nav/></div>
            <div className="Margin" style={{marginTop:'100px'}}></div>
            <div className="Title" style={{textAlign:'center'}}><h1>Login</h1></div>
            <div className="Form">
                <Form style={{width:'500px', margin:'auto'}}
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
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
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
    )
}
export default Login;