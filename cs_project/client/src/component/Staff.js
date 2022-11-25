import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
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
  const [dataTodo, setDataTodo] = useState([]);
  const [pieData, setPieDataState]  = useState([]);
  const [dataError, setDataError] = useState([]);
  const [staffName, setStaffName] = useState("");
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
  
  /** 사용자 정보를 가져온다 */
  const getUserInfo = () => {
    axios.post('http://localhost:3001/getUserInfo').then((res) => {
      if(!res.status === 200) {
          if(res.data.err.message) {
              alert(res.data.err.message);
          }
      } else {
        getTableData(res.data.userInfo);
      }
    })
  }

  /** 가져온 사용자 정보를 table 데이터로 저장 */
  const getTableData = (staffData) => {
    staffData.map((data, i) => {
      let dataValueUser = {
        "key":(i+1).toString(),
        "id":staffData[i].userId,
        "name":staffData[i].username,
      }; 
      setStaffData(staffData => [...staffData, dataValueUser]);
    })
  }

    /** 차트에 들어갈 데이터 가져오기 */
    const setPieData = (staffName) => {

      initDataError(staffName);
  
      axios.post('http://localhost:3001/getTodo').then((res) => {
        if(!res.status === 200) {
            if(res.data.err.message) {
                alert(res.data.err.message);
            }
        } else {
          setDataTodo(res.data.boardInfo);
        }
      })
    }
  
    /** 미완료 업무 리스트 초기화 */
    const initDataError = (staffName) => {
        let newDataError = dataError.filter((data) => data.name === staffName);	//filter 메소드 사용
        setDataError(newDataError);
    }

  /** 파이 차트 렌더링 */
  const setPieChart = () => {

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

    if(countError === 0) {
        let objectDataError = {
            "key":1,
            "date":"",
            "todo":"없음 ",
        };
        setDataError(dataError => [...dataError, objectDataError])
    }

    /** 차트 데이터 설정 */
    setPieDataState({
      labels: ['완료','진행중','미완료'],
      datasets: [
        {
          label: '# of Votes',
          data: [countSuccess, countWarning, countError],
          backgroundColor: [
            'rgba(120, 235, 120, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(120, 235, 120, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }

  const columns = [
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
    getUserInfo()
  }, []);

  useEffect(() => {
    setPieChart()
  }, [dataTodo]);

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
                <br/>
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