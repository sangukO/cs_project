import {Link} from "react-router-dom"
import 'antd/dist/antd.min.css';
import {  Button, Form, Input, InputNumber  } from 'antd';
import Nav from "./Nav"

function Join() {

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
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
            <div className="NavDiv"><Nav/></div>
            <div className="Margin" style={{marginTop:'100px'}}></div>
            <div className="Title" style={{textAlign:'center'}}><h1>Join</h1></div>
            <div className="Form">
                <Form style={{width:'500px', margin:'auto'}} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['user', 'name']}
                        label="Name"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                        {
                            type: 'email',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'age']}
                        label="Age"
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
                    <Form.Item name={['user', 'website']} label="Phone">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Join;