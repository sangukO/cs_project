import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Button } from 'antd';
import 'antd/dist/antd.min.css';
import { Table } from 'antd';
import axios from 'axios';

function Notice() {

  const [noticeData, setNoticeData] = useState([]);

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

  const columns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.key - b.key
    },
    {
      title: '공지사항',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => ( 
        <Link key={record.key} to={`/Detail/${record._id}`} style={{color: 'black'}}>
          {record.title}
        </Link>
      )
    },
    {
      title: '작성자',
      dataIndex: 'writer',
      key: 'writer',
    },
    {
      title: '작성 시각',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const getNotice = () => {
    dataNotice.map((data, i) => {
      let Notice = {
        "key": (i+1).toString(),
        "_id": dataNotice[i]._id,
        "title": dataNotice[i].title,
        "writer": dataNotice[i].writer,
        "date":dataNotice[i].date
      }
      setNoticeData(noticeData => [...noticeData, Notice])
    })
  }

  useEffect(() => {
    getNotice()
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
                    <Breadcrumb.Item>Notice</Breadcrumb.Item>
                  </Breadcrumb>
              </div>
              <div className="Margin" style={{height:"50px"}}></div>
              <div className="Title" style={{textAlign:'center'}}><h1>공지 목록</h1></div>
              <div style={{float:"right", margin:'0 5px 20px 0'}}><Link to={"/WriteNotice"}><Button type="primary">작성</Button></Link></div>
              <Table style={{width:'100%', margin:'auto'}} columns={columns} dataSource={noticeData}/>
            </div>
        </div>
    )
}

export default Notice;