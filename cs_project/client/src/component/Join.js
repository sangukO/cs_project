import 'antd/dist/antd.min.css';
import {  Breadcrumb, Button, Form, Input, InputNumber, Radio } from 'antd';
import  { Link, useNavigate } from 'react-router-dom'; 
import Header from "./Header";
import Nav from "./Nav";
import axios from 'axios';

function Join() {
    const navigate = useNavigate();
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 12,
        },
        };
    
    const validateMessages = {
        // 문법 경고 문구 무시 주석
        // eslint-disable-next-line
        required: '${label} is required!',
        types: {
            // eslint-disable-next-line
            email: '${label} is not a valid email!',
            // eslint-disable-next-line
            number: '${label} is not a valid number!',
        },
        number: {
            // eslint-disable-next-line
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values) => {

        let body = {
            userId : values.user.userId,
            password : values.user.password,
            username : values.user.name,
            age : values.user.age,
            gender : values.user.gender,
            email : values.user.email,
            phone : values.user.phone
        }

        axios.post('http://localhost:3001/register', body).then((res) => {
                if(!res.data.sucess) {
                    /** res 보고 예외처리 꼼꼼하게 */
                    if(res.data.err.message) {
                        alert(res.data.err.message);
                    } else {
                        alert("예외처리");
                    }
                } else {
                    alert("회원가입이 완료되었습니다.");
                    navigate('/Login');
                }
            })
      };

    return (
        <div className="Join">
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
                        <Breadcrumb.Item>Join</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="Margin" style={{marginTop:'100px'}}></div>
                <div className="Title" style={{textAlign:'center'}}><h1>Join</h1></div>
                <div className="Form">
                    <Form style={{width:'50%', margin:'auto'}} {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name={['user', 'userId']}
                            label="아이디"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'password']}
                            label="비밀번호"
                            hasFeedback
                            rules={[
                            {
                                type: 'password',
                                required: true,
                            },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'passwordCk']}
                            label="비밀번호 확인"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                type: 'password',
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                              }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'name']}
                            label="이름"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'age']}
                            label="나이"
                            rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 99,
                                required: true,
                            },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'gender']}
                            label="성별"
                        >
                            <Radio.Group>
                                <Radio value="0"> 남 </Radio>
                                <Radio value="1"> 여 </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'email']}
                            label="이메일"
                            rules={[
                            {
                                type: 'email',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'phone']} label="전화번호">
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                            <Button type="primary" htmlType="submit">
                            회원가입
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Join;