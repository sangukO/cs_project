import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Button, Modal, Radio, Input, Form } from 'antd';
import 'antd/dist/antd.min.css';
import { Table } from 'antd';
import axios from 'axios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

function Notice() {

  const [writeForm] = Form.useForm();

  useEffect(() => {
    document.getElementById("focus").focus()
  }, []);

  return (
        <div>
          <div className="Header"><Header/></div>
            <div className="Nav" style={{float:"left"}}><Nav/></div>
            <div className="Content" style={{float:"left", width:"80%"}}>
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
                            placeholder="내용을 입력해주세요."
                            previewStyle="vertical" // 미리보기 스타일 지정
                            height="300px" // 에디터 창 높이
                            initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                            autofocus={false} // focus 해제
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
                        <div style={{float:"right", margin:'0 0 20px 0'}}><Link to={"/WriteNotice"}><Button type="primary">작성</Button></Link></div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Notice;