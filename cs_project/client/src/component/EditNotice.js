import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Button, Input, Form } from 'antd';
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

  const params = useParams();
  const editorRef = useRef();
  const [editForm] = Form.useForm();
  const navigate = useNavigate();
  const [noticeDetail, setNoticeDetail] = useState([]);
  const [editContent, setEditContent] = useState("");
  const [mountCount, setMountCount] = useState(0);
  let content = ""
  let noticeDetailArry = [];
  const [loading, setLoading] = useState(true);

  /** 공지 상세 데이터 불러오기 */
  const getNoticeDetail = () => {
    let body = {
      _id: params._id
    }

    axios.post('/api/getNoticeDetail', body).then((res) => {
      if(!res.status === 200) {
          /** res 보고 예외처리 꼼꼼하게 */
          if(res.data.err.message) {
              alert(res.data.err.message);
          } else {
              alert("예외처리");
          }
      } else {
        noticeDetailArry = res.data.noticeDetail;
        getNoticeDetailData(noticeDetailArry);
      }
    })
  }

  const getNoticeDetailData = (noticeDetailArry) => {
    let Notice = {
      "_id": noticeDetailArry._id,
      "title": noticeDetailArry.title,
      "writer": noticeDetailArry.writer,
      "date":noticeDetailArry.date,
      "content":noticeDetailArry.content
    }
    setNoticeDetail(Notice);
    setLoading(false);
  }

  /** 글 작성 버튼 클릭 */
  const onClickSubmit = () => {

    let body = {
      _id: params._id,
      writer: noticeDetail.writer,
      date: moment().format('YYYY/MM/DD HH:mm'),
      title: editForm.getFieldValue(('title')),
      content: editorRef.current?.getInstance().getHTML()
    }
  
    axios.post('/api/noticeUpdate', body).then((res) => {
      if(!res.data.success) {
          /** res 보고 예외처리 꼼꼼하게 */
          if(res.data.err.message) {
              alert(res.data.err.message);
          } else {
              alert("예외처리");
          }
      } else {
          alert("수정이 완료되었습니다.");
          navigate(`/DetailNotice/${params._id}`);
      }
    })
  }

  useEffect(() => {
    getNoticeDetail()
    // 글 제목 input에 autofocus
    document.getElementById("focus").focus()
  }, []);

  useEffect(() => {
    editForm.setFieldsValue({
      title : noticeDetail.title,
    })
    // editor에 내용 추가
    setEditContent(noticeDetail.content)
  }, [noticeDetail])

  useEffect(() => {
    // 첫 번째와 두 번째 렌더링은 에디터에 내용 추가 x
    if(mountCount != 2) {
      setMountCount(mountCount+1);
    } else if(mountCount == 2) {
      editorRef.current?.getInstance().setHTML(editContent);
    }
  }, [editContent])

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
                    <Breadcrumb.Item><Link to={`/DetailNotice/${params._id}`}>{params._id}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Edit</Breadcrumb.Item>
                  </Breadcrumb>
              </div>
              <div className="Margin" style={{height:"50px"}}></div>
              <div className="Title" style={{textAlign:'center', height:'63px'}}><h1>공지 수정</h1></div>
              <div className="Margin" style={{height:"50px"}}></div>
              <div className="Form">
                    <Form form={editForm} style={{width:'80%', margin:'auto'}}
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
                            previewStyle="vertical" // 미리보기 스타일 지정
                            height="300px" // 에디터 창 높이
                            initialValue={content}
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