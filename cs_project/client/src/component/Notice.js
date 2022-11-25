import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Button } from 'antd';
import 'antd/dist/antd.min.css';
import {
  FormOutlined
} from '@ant-design/icons';
import { Table } from 'antd';
import axios from 'axios';

function Notice() {

  let noticedataArry = [];
  const [noticeTableData, setNoticeTableData] = useState([]);

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
        <Link key={record.key} to={`/DetailNotice/${record._id}`} style={{color: 'black'}}>
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
    axios.post('/api/getNoticeInfo').then((res) => {
      if(!res.status === 200) {
          /** res 보고 예외처리 꼼꼼하게 */
          if(res.data.err.message) {
              alert(res.data.err.message);
          } else {
              alert("예외처리");
          }
      } else {
        noticedataArry = res.data.noticeInfo;
        getNoticeTableData(noticedataArry)
      }
    })
  }

  const getNoticeTableData = (noticedataArry) => {
    noticedataArry.map((data, i) => {
      let Notice = {
        "key": (i+1).toString(),
        "_id": noticedataArry[i]._id,
        "title": noticedataArry[i].title,
        "writer": noticedataArry[i].writer,
        "date":noticedataArry[i].date
      }
      setNoticeTableData(noticeTableData => [...noticeTableData, Notice])
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
              <div style={{float:"right", margin:'0 5px 20px 0'}}><Link to={"/WriteNotice"}><Button type="primary"><FormOutlined />작성</Button></Link></div>
              <Table style={{width:'100%', margin:'auto'}} columns={columns} dataSource={noticeTableData}/>
            </div>
        </div>
    )
}

export default Notice;