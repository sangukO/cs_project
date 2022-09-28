import 'antd/dist/antd.min.css';
import {  Breadcrumb, Button, Form, Input, InputNumber, Radio } from 'antd';
import Header from "./Header";
import Nav from "./Nav";

function Join() {

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 12,
        },
        };
    
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values) => {
        console.log(values);
      };

    return (
        <div className="Join">
            <div className="Header"><Header/></div>
            <div className="Nav" style={{float:"left"}}><Nav/></div>
            <div className="Content" style={{float:"left", width:"80%"}}>
                <div className="Breadcrumb">
                    <Breadcrumb
                    style={{
                        margin: '20px 0 0 20px',
                    }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Join</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="Margin" style={{marginTop:'100px'}}></div>
                <div className="Title" style={{textAlign:'center'}}><h1>Join</h1></div>
                <div className="Form">
                    <Form style={{width:'50%', margin:'auto'}} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name={['user', 'username']}
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
                                <Radio value="M"> 남 </Radio>
                                <Radio value="F"> 여 </Radio>
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