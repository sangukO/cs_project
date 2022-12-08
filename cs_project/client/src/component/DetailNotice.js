import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Button, Modal } from 'antd';
import {
  EditOutlined,
  OrderedListOutlined,
  DeleteOutlined,
  UndoOutlined,
  CheckOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import 'moment/locale/ko';


function Detail() {

  const params = useParams();
  const [noticeDetail, setNoticeDetail] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  let noticeDetailArry = [];
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);

  const getAdminData = () => {
    axios.get('/api/auth').then((res) => {
      if(!res.status === 200) {
          /** res 보고 예외처리 꼼꼼하게 */
          if(res.data.err.message) {
              alert(res.data.err.message);
          } else {
              alert("예외처리");
          }
      } else {
        setIsAdmin(res.data.isAdmin);
      }
    })
  }

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

  const showDeleteModal = (_id) => {
    setisDeleteModalOpen(true);
  }

  const onDeleteCancel = () => {
    setisDeleteModalOpen(false);
  };

  const onDeleteOk = () => {
    let body = {
      _id: params._id
    }
    axios.post('/api/noticeDelete', body).then((res) => {
      if(!res.status === 200) {
          /** res 보고 예외처리 꼼꼼하게 */
          if(res.data.err.message) {
              alert(res.data.err.message);
          } else {
              alert("예외처리");
          }
      } else {
        alert("삭제가 완료되었습니다.");
        navigate(`/Notice`);
      }
    })
  }
  
  useEffect(() => {
    getAdminData()
    // 공지 상세 데이터 불러오기
    getNoticeDetail()
  }, []);

  return (
        <div>
           {loading ? (
        <div></div>
        ) : (
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
                <div className='NoticeContent' style={{marginLeft:'5%', marginTop:'30px'}}><Viewer initialValue={noticeDetail.content}/></div>
              </div>
              <div style={{float:"right"}}>
              {
                isAdmin ? 
                <div>
                <div style={{float:"left"}}><Button type="primary" ghost onClick={() => navigate(`/Notice`)}><OrderedListOutlined />목록</Button></div>
                <div style={{float:"left", width:"20px", height:"5px"}}></div>
                <div style={{float:"left"}}><Link to={`/EditNotice/${noticeDetail._id}`}><Button type="primary"><EditOutlined />수정</Button></Link></div>
                <div style={{float:"left", width:"20px", height:"5px"}}></div>
                <div style={{float:"left"}}><Button type="ghost" danger onClick={() => showDeleteModal(noticeDetail._id)}><DeleteOutlined />삭제</Button></div>
                </div>
                : <div style={{float:"left"}}><Button type="primary" ghost onClick={() => navigate(`/Notice`)}><OrderedListOutlined />목록</Button></div>
                }
              </div>
            </div>
          </div>
        )}
          <Modal title="삭제하시겠습니까?" open={isDeleteModalOpen} onCancel={onDeleteCancel}
              footer={[
                  <Button key="back" onClick={onDeleteCancel}>
                  <UndoOutlined/>취소
                  </Button>,
                  <Button key="submit" type="primary" danger onClick={onDeleteOk}>
                  <CheckOutlined/>삭제
                  </Button>
              ]}
          >
            <div>
              <p>내용은 복구되지 않습니다.</p>
            </div>
          </Modal>
        </div>
    )
}

export default Detail;