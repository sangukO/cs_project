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

  const dataNotice = [
    {
      _id:"d6f4g3s1dg",
      writer:"점주",
      date:"2022/11/01 00:00",
      title:"포켓몬 빵 예약 판매 금지",
      content:"예약해달라고 해도 안 됩니다."
    },
    {
      _id:"7f9gh856",
      writer:"본사",
      date:"2022/11/07 00:00",
      title:"감사 캠페인 실천",
      content:"웃는 모습으로 근무하기"
    },
    {
      _id:"yu1mk3hg22",
      writer:"본사",
      date:"2022/11/07 12:00",
      title:"유니폼 및 명찰 착용 강화",
      content:"유니폼과 명찰 꼭 착용해주세요."
    },
    {
      _id:"98ytk74h2",
      writer:"점주",
      date:"2022/11/11 10:00",
      title:"빼빼로 판매 시 포장",
      content:"카운터 아래 종이봉투 있습니다."
    },
    {
      _id:"1y5dhf32u15",
      writer:"점주",
      date:"2022/11/11 13:00",
      title:"빼빼로 추가 진열",
      content:"오늘 끝나기 전까지 추가로 진열해주세요."
    },
    {
      _id:"12oyiug1h3",
      writer:"점주",
      date:"2022/11/12 00:00",
      title:"매장 청소 꼼꼼히 하기",
      content:"신경 써주세요."
    },
  ];

  const getNoticeDetail = () => {

    // 클릭한 공지와 _id가 같은 공지만 필터링
    const dataNoticeFilter = dataNotice.filter(({_id}) => _id === params._id);
      let Notice = {
        "_id": dataNoticeFilter[0]._id,
        "title": dataNoticeFilter[0].title,
        "writer": dataNoticeFilter[0].writer,
        "date":dataNoticeFilter[0].date,
        "content":dataNoticeFilter[0].content
      }
      setNoticeDetail(Notice)
  }

  /** 글 작성 버튼 클릭 */
  const onClickSubmit = () => {

    let body = {
      name : noticeDetail.writer,
      date : moment().format('YYYY/MM/DD HH:mm'),
      title : editForm.getFieldValue(('title')),
      content : editorRef.current?.getInstance().getHTML()
    }
  
    // axios.post('http://localhost:3001/writeNotice', body).then((res) => {
    //   if(!res.data.success) {
    //       /** res 보고 예외처리 꼼꼼하게 */
    //       if(res.data.err.message) {
    //           alert(res.data.err.message);
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