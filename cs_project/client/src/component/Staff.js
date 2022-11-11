import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Modal } from 'antd';
import 'antd/dist/antd.min.css';
import {
  PieChartTwoTone
} from '@ant-design/icons';
import { Table } from 'antd';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function Staff() {

  ChartJS.register(ArcElement, Tooltip, Legend);
  const [staffData, setStaffData] = useState([]);
  const [pieData, setPieDataState]  = useState([]);
  const [dataError, setDataError] = useState([]);
  const [staffName, setStaffName] = useState("");
  const dataUser = [
    {
      _id:'sg231fsd3g4df5',
      userId:'userid',
      username:'점주',
    },
    {
      _id:'wq52r13a48',
      userId:'testaway',
      username:'오상욱',
    },
    {
      _id:'mhg132384tr',
      userId:'test',
      username:'김현호',
    },
    {
      _id:'456kfdghlsn21',
      userId:'testy',
      username:'김인하',
    },
  ];

  const dataTodo = [
    {
      "id":"1",
      "name":"점주",
      "date":"2022/10/03",
      "time": "점주",
      "todo":"물건 발주",
      "tag":"완료",
    },
    {
      "id":"2",
      "name":"오상욱",
      "date":"2022/10/04",
      "time": "평일 오후",
      "todo":"발주된 물건 검수",
      "tag":"완료",
    },
    {
      "id":"3",
      "name":"점주",
      "date":"2022/10/05",
      "time": "점주",
      "todo":"물건 발주",
      "tag":"완료",
    },
    {
      "id":"4",
      "name":"오상욱",
      "date":"2022/10/06",
      "time": "평일 오후",
      "todo":"발주된 물건 검수",
      "tag":"완료",
    },
    {
      "id":"5",
      "name":"김현호",
      "date":"2022/10/04",
      "time": "평일 야간",
      "todo":"새벽에 쓰레기통 비우기",
      "tag":"미완료",
    },
    {
      "id":"6",
      "name":"김인하",
      "date":"2022/10/08",
      "time": "주말 오전",
      "todo":"오전 물건 진열하기",
      "tag":"미완료",
    },
    {
      "id":"7",
      "name":"오상욱",
      "date":"2022/11/04",
      "time": "주말 오전",
      "todo":"테이블 청소하기",
      "tag":"미완료",
    },
    {
      "id":"8",
      "name":"점주",
      "date":"2022/11/07",
      "time": "점주",
      "todo":"빼빼로 발주하기",
      "tag":"완료",
    },
    {
      "id":"9",
      "name":"김현호",
      "date":"2022/11/09",
      "time": "평일 오후",
      "todo":"컵라면 용기 버리기",
      "tag":"완료",
    },
    {
      "id":"10",
      "name":"오상욱",
      "date":"2022/11/11",
      "time": "평일 저녁",
      "todo":"튀김기 청소하기",
      "tag":"진행중",
    },
    {
      "id":"11",
      "name":"점주",
      "date":"2022/11/01",
      "time": "점주",
      "todo":"물건 발주",
      "tag":"완료",
    },
    {
      "id":"12",
      "name":"오상욱",
      "date":"2022/11/02",
      "time": "평일 오후",
      "todo":"발주된 물건 검수",
      "tag":"완료",
    },
    {
      "id":"13",
      "name":"점주",
      "date":"2022/11/03",
      "time": "점주",
      "todo":"물건 발주",
      "tag":"완료",
    },
    {
      "id":"14",
      "name":"오상욱",
      "date":"2022/11/05",
      "time": "평일 오후",
      "todo":"발주된 물건 검수",
      "tag":"미완료",
    },
    {
      "id":"15",
      "name":"김현호",
      "date":"2022/11/05",
      "time": "주말 야간",
      "todo":"새벽에 쓰레기통 비우기",
      "tag":"진행중",
    },
    {
      "id":"16",
      "name":"김인하",
      "date":"2022/11/05",
      "time": "주말 오전",
      "todo":"오전 물건 진열하기",
      "tag":"진행중",
    },
    {
      "id":"17",
      "name":"오상욱",
      "date":"2022/11/06",
      "time": "주말 오전",
      "todo":"테이블 청소하기",
      "tag":"미완료",
    },
    {
      "id":"18",
      "name":"점주",
      "date":"2022/11/07",
      "time": "점주",
      "todo":"빼빼로 발주하기",
      "tag":"미완료",
    },
    {
      "id":"19",
      "name":"김현호",
      "date":"2022/11/09",
      "time": "평일 오후",
      "todo":"컵라면 용기 버리기",
      "tag":"진행중",
    },
    {
      "id":"20",
      "name":"오상욱",
      "date":"2022/11/11",
      "time": "평일 저녁",
      "todo":"튀김기 청소하기",
      "tag":"진행중",
    },
  ]

  const [isPieModalOpen, setisPieModalOpen] = useState(false);

  const showPieModal = (record) => {
    setStaffName(record.name);
    setPieData(record.name);
    setisPieModalOpen(true);
  };

  const onPieOk = () => {
    setisPieModalOpen(false);
  };

  const onPieCancel = () => {
    
    setisPieModalOpen(false);
  };
  
  const setPieData = (staffName) => {

    initDataError(staffName);

    let countSuccess = 0;
    let countWarning = 0;
    let countError = 0;

    dataTodo.map((data, i) => {
      if(dataTodo[i].name === staffName) {
        if(dataTodo[i].tag === "완료" ) {
          countSuccess += 1;
        }
        if(dataTodo[i].tag === "진행중" ) {
          countWarning += 1;
        }
        if(dataTodo[i].tag === "미완료" ) {
          countError += 1;
          let objectDataError = {
            "key":i.toString(),
            "date":dataTodo[i].date,
            "todo":dataTodo[i].todo,
        };
          setDataError(dataError => [...dataError, objectDataError])
        }
      }
    })

    setPieDataState({
      labels: ['완료','진행중','미완료'],
      datasets: [
        {
          label: '# of Votes',
          data: [countSuccess, countWarning, countError],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }

  /** 미완료 업무 리스트 초기화 */
  const initDataError = (staffName) => {
    const deletedDataError = dataError.filter((data) => data.name == staffName);	//filter 메소드 사용
    setDataError(deletedDataError);
  }

  const getTableData = (dataUser) => {
    dataUser.map((data, i) => {
      let dataValueUser = {
        "key":i.toString(),
        "_id":dataUser[i]._id,
        "id":dataUser[i].userId,
        "name":dataUser[i].username,
      };
      setStaffData(staffData => [...staffData, dataValueUser]);
    })
  }

  const columns = [
    {
      title: '_id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Chart',
      key: 'chart',
      render: (_, record, i) => (
        <div key={i} style={{display:"flex", justifyContent: "center"}}> 
        <PieChartTwoTone
        twoToneColor="#1890ff"
        onClick={()=>{showPieModal(record)}} 
        /> 
        </div> 
    ),
    },
  ];

  useEffect(() => {
    getTableData(dataUser)
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
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Staff</Breadcrumb.Item>
                  </Breadcrumb>
              </div>
              <div className="Margin" style={{height:"50px"}}></div>
              <div className="Title" style={{textAlign:'center'}}><h1>직원 목록</h1></div>
              <div style={{float:"right", margin:'0 5px 20px 0', height:'33px'}}></div>
              <Table style={{width:'100%', margin:'auto'}} columns={columns} dataSource={staffData}/>
            </div>
            <Modal title={staffName+"의 업무 그래프"} open={isPieModalOpen} onOk={onPieOk} onCancel={onPieCancel}>
              <Pie data={pieData} />
              <div className="ErrorList" style={{textAlign:'center'}}>
                <ul style={{listStyle: "none", paddingTop:"10px", paddingLeft:"0px"}}> 
                <span><strong>미완료 업무</strong></span>
                    {dataError.map((dataError, i) => (
                            <li key={i} style={{color:'black'}}>{dataError.date+" "+dataError.todo}</li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </div>
    )
}

export default Staff;