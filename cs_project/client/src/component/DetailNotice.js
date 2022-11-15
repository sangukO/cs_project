import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Button, Form } from 'antd';
import {
  EditOutlined,
  OrderedListOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import 'moment/locale/ko';

function Detail() {

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

  const params = useParams();
  const [noticeDetail, setNoticeDetail] = useState([]);
  const navigate = useNavigate();

  /** 공지 상세 데이터 불러오기 */
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
  
  useEffect(() => {
    // 공지 상세 데이터 불러오기
    getNoticeDetail()
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
                  <Breadcrumb.Item>{params._id}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="Margin" style={{height:"50px"}}></div>
            <div className="Title" style={{textAlign:'center', height:'63px'}}><h1>공지 조회</h1></div>
            <div className="Margin" style={{height:"50px"}}></div>
            <div className='NoticeDetail' style={{backgroundColor:'#fafafa', height:'100%',width:'100%', minHeight:'600px', paddingTop:'10px', marginBottom:'20px'}}>
              <div id='Wrap' style={{textAlign:'center'}}>
                <div className='NoticeWriter' style={{float:'left', width:'33%'}}>{noticeDetail.writer}</div>
                <div className='NoticeDate' style={{float:'left', width:'33%'}}>{noticeDetail.date}</div>
                <div className='Back' style={{float:'left', width:'33%'}}><Link to={`/Notice`} style={{color: 'grey'}}>목록</Link></div>
              </div>
              <br></br><hr/>
              <div className='NoticeTitle' style={{marginLeft:'5%', marginTop:'30px'}}><h2>{noticeDetail.title}</h2></div>
              <div className='NoticeContent' style={{marginLeft:'5%', marginTop:'30px'}}>{noticeDetail.content}</div>
            </div>
            <div style={{float:"right"}}>
              <div style={{float:"left"}}><Button type="primary" ghost onClick={() => navigate(`/Notice`)}><OrderedListOutlined />목록</Button></div>
              <div style={{float:"left", width:"20px", height:"5px"}}></div>
              <div style={{float:"left"}}><Link to={`/EditNotice/${params._id}`}><Button type="primary"><EditOutlined />수정</Button></Link></div>
            </div>
          </div>
        </div>
    )
}

export default Detail;