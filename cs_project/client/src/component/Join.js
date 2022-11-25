import 'antd/dist/antd.min.css';
import {  Breadcrumb, Button, Form, Input, InputNumber, Select } from 'antd';
import  { Link, useNavigate } from 'react-router-dom'; 
import { useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import axios from 'axios';

function Join() {
    const Option = Select.Option;
    const navigate = useNavigate();
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 12,
        },
        };
    const gradeData = ['직원', '점주', '점장'];
    const weekData = ['평일', '주말'];
    const timeData = ['오전', '점심', '저녁', '야간'];

    const validateMessages = {
        // 문법 경고 문구 무시 주석
        // eslint-disable-next-line
        required: '빈 칸을 채워주세요!',
        types: {
            // eslint-disable-next-line
            email: '유효한 이메일 형식이 아닙니다!',
            // eslint-disable-next-line
            number: '유효한 나이가 아닙니다!',
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
                            tooltip="알파벳, 숫자 조합만 사용 가능합니다."
                            hasFeedback
                            rules={[
                            {
                                required: true,
                            },
                            () => ({
                                // 유효성 검사 - 숫자, 알파벳만 가능
                                validator(_, value) {
                                  var pattern_num = /[0-9]/;  // 숫자 

                                  var pattern_eng = /[a-zA-Z]/;  // 알파벳
                        
                                  var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;  // 특수문자
                        
                                  var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;  // 한글 체크
                                  if ( (pattern_num.test(value)) || (pattern_eng.test(value)) ) {
                                    if(!(pattern_spc.test(value)) && !(pattern_kor.test(value)) ) {
                                      return Promise.resolve();
                                    } else{
                                      return Promise.reject(new Error('아이디 형식을 확인해주세요!'));
                                    }
                                  }
                                  else if (!value) {
                                    return Promise.reject();
                                  }
                                    return Promise.reject(new Error('아이디 형식을 확인해주세요!'));
                                  }
                                }),
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
                            () => ({
                                // 빈 값 검사
                                validator(_, value) {
                                  if (!value) {
                                    return Promise.reject(new Error('빈 칸을 채워주세요!'));
                                  }
                                  return Promise.resolve();
                                },
                              }),
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
                                  if (!value) {
                                    return Promise.reject(new Error('빈 칸을 채워주세요!'));
                                  }
                                  if (value && getFieldValue(['user', 'password']) && getFieldValue(['user', 'password']) === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('비밀번호를 확인해주세요!'));
                                },
                              }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'name']}
                            label="이름"
                            tooltip="한글 및 영어만 입력할 수 있습니다."
                            rules={[
                            {
                                required: true,
                            },
                            () => ({
                                // 유효성 검사 - 한글, 알파벳만 가능
                                validator(_, value) {
                                  var pattern_num = /[0-9]/;  // 숫자 

                                  var pattern_eng = /[a-zA-Z]/;  // 알파벳
                        
                                  var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;  // 특수문자
                        
                                  var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;  // 한글 체크
                                  if ( (pattern_kor.test(value)) || (pattern_eng.test(value)) ) {
                                    if(!(pattern_spc.test(value)) && !(pattern_num.test(value)) ) {
                                      return Promise.resolve();
                                    } else{
                                      return Promise.reject(new Error('이름을 확인해주세요!'));
                                    }
                                  }
                                  else if (!value) {
                                    return Promise.reject();
                                  }
                                    return Promise.reject(new Error('이름을 확인해주세요!'));
                                  }
                                }),
                            ]}
                        >
                            <Input placeholder='실명을 작성해주세요'/>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'age']}
                            label="나이"
                            rules={[
                            {
                                type: 'number',
                                required: true,
                            },
                            ]}
                        >
                            <InputNumber min={17} max={99}/>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'phone']}
                            label="전화번호"
                            rules={[
                            {
                                required: true,
                            },
                            ({ setFieldValue }) => ({
                                // 유효성 검사 - 숫자만 가능
                                validator(_, value) {
                                  var pattern_num = /[0-9]/;  // 숫자 
                                  setFieldValue( ['user', 'phone'], value.replace(/[^0-9]/g, '') ) // 정규식으로 제어
                                  if ( (pattern_num.test(value))) {
                                      return Promise.resolve();
                                  } else {
                                      return Promise.reject();
                                  }
                                },
                            }),
                            ]}
                        >
                            <Input type="text" placeholder='- 를 제외한 숫자만 입력'/>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'grade']}
                            label="파트"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                options={gradeData.map((grade) => ({ label: grade, value: grade }))}
                            >
                            </Select>
                            <Select
                                allowClear
                                options={weekData.map((week) => ({ label: week, value: week }))}
                            >
                            </Select>
                            <Select
                                allowClear
                                options={timeData.map((time) => ({ label: time, value: time }))}
                            >
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'gender']}
                            label="성별"
                        >
                            <Select
                                allowClear
                            >
                                <Option value="0">남자</Option>
                                <Option value="1">여자</Option>
                            </Select>
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