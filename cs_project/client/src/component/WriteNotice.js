import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Button, Modal, Radio, Input, Form } from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import moment from "moment";
import 'moment/locale/ko';

function WriteNotice() {

  const editorRef = useRef();
  const [writeForm] = Form.useForm();
  const navigate = useNavigate();
  const [writerName, setWriterName] = useState("");
  const userId = useSelector( (state) => state );

  /** 작성 중인 id의 작성자 이름 가져오기 */
  const getWriterNameData = () => {
    let body = {
      userId : userId,
    }

    axios.post('http://localhost:3001/getWriterName', body).then((res) => {
      let name = res.data.writerName
      setWriterName(name)
    })
  }

  /** 글 작성 버튼 클릭 */
  const onClickSubmit = () => {

    let body = {
      name : writerName,
      date : moment().format('YYYY/MM/DD HH:mm'),
      title : writeForm.getFieldValue(('title')),
      content : editorRef.current?.getInstance().getHTML()
    }
  
    console.log(body)
    // axios.post('http://localhost:3001/writeNotice', body).then((res) => {
    //   if(!res.data.success) {
    //       /** res 보고 예외처리 꼼꼼하게 */
    //       if(res.data.err.message) {
    //           console.log(res.data.err.message);
    //       } else {
    //           alert("예외처리");
    //       }
    //   } else {
    //       alert("작성이 완료되었습니다.");
    //       navigate(`/Notice`);
    //   }
    // })
  }

  useEffect(() => {
    // 글 제목 input에 autofocus
    document.getElementById("focus").focus()
    getWriterNameData()
  }, []);

  return (
        <div>
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
                    <Breadcrumb.Item><Link to={"/Notice"}>Notice</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Write</Breadcrumb.Item>
                  </Breadcrumb>
              </div>
              <div className="Margin" style={{height:"50px"}}></div>
              <div className="Title" style={{textAlign:'center', height:'63px'}}><h1>공지 작성</h1></div>
              <div className="Margin" style={{height:"50px"}}></div>
              <div className="Form">
                    <Form form={writeForm} style={{width:'80%', margin:'auto'}}
                        name="basic"
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                    autoComplete="off"
                    >
                        <Form.Item
                            label="제목"
                            name="title"
                            rules={[
                            {
                                message: 'Please input title!',
                            },
                            ]}
                        >
                            <Input id="focus" />
                        </Form.Item>

                        <Form.Item
                            label="내용"
                            name="content"
                            rules={[
                            {
                                message: 'Please input content!',
                            },
                            ]}
                        >
                          <Editor
                            ref={editorRef} // DOM 선택용 useRef
                            placeholder="내용을 입력해주세요."
                            previewStyle="vertical" // 미리보기 스타일 지정
                            height="300px" // 에디터 창 높이
                            initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                            autofocus={false} // focus 해제
                            hideModeSwitch={true} // 하단 타입 선택 탭 숨기기
                            language="ko-KR" // 한국어
                            toolbarItems={[
                              // 툴바 옵션 설정
                              ['heading', 'bold', 'italic', 'strike'],
                              ['hr', 'quote'],
                              ['ul', 'ol', 'task', 'indent', 'outdent'],
                              ['table', 'image', 'link'],
                              ['code', 'codeblock']
                            ]}
                          ></Editor>
                        </Form.Item>
                        <div style={{float:"right"}}>
                          <div style={{float:"left"}}><Button type="primary" ghost onClick={() => navigate(-1)}><CloseOutlined />취소</Button></div>
                          <div style={{float:"left", width:"20px", height:"5px"}}></div>
                          <div style={{float:"left"}}><Button type="primary" onClick={onClickSubmit}><CheckOutlined />작성</Button></div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default WriteNotice;