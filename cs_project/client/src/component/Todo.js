import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Button, Modal, Radio, Input, Form, Select,DatePicker } from 'antd';
import 'antd/dist/antd.min.css';
import {
    UndoOutlined,
    CheckOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    EditOutlined,
    DeleteOutlined,
    FormOutlined
} from '@ant-design/icons';
import { Table, Tag } from 'antd';
import axios from 'axios';
import moment from 'moment';

function Todo() {

  const [writeForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [todoData, setTodoData] = useState([]);
  const [_idOfTodo, set_idOfTodo] = useState("");
  const [writerName, setWriterName] = useState("");

  let dataArry = [];

  const weekData = ['평일', '주말'];
  const timeData = ['오전', '점심', '저녁', '야간'];

  const [isWriteModalOpen, setisWriteModalOpen] = useState(false);
  const [writeValue, setWriteValue] = useState("진행중");

  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [editValue, setEditValue] = useState("진행중");

  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);

  const [userId, setUserId] = useState("");

  const loginCheck = () => { // 페이지에 들어올때 사용자 체크

	};

  const setName = () => {

    if (localStorage.getItem('userId') !== null && localStorage.getItem('token') !== null) {
      setUserId(localStorage.getItem('userId'));
    }

    let body = {
      userId : localStorage.getItem('userId'),
    }

    axios.post('/api/getWriterName', body).then((res) => {
      setWriterName(res.data.writerName)
    })
  }

  const showWriteModal = () => {
    writeForm.setFieldsValue({
      name : writerName,
      tag: "진행중",
      week: "",
      time: "",
    });
    setisWriteModalOpen(true);
  };

  const onWriteStateChange = (e) => {
    setWriteValue(e.target.value);
  };

  const onWriteOk = () => {

    let body = {
      name : writeForm.getFieldValue(('name')),
      date : writeForm.getFieldValue(('date')).format('YYYY/MM/DD'),
      time : writeForm.getFieldValue(('week'))+" "+writeForm.getFieldValue(('time')),
      todo : writeForm.getFieldValue(('todo')),
      tag : writeForm.getFieldValue(('tag'))
    }
    axios.post('/api/board', body).then((res) => {
      if(!res.data.success) {
          /** res 보고 예외처리 꼼꼼하게 */
          if(res.data.err.message) {
              alert(res.data.err.message);
          } else {
              alert("예외처리");
          }
      } else {
          alert("작성이 완료되었습니다.");
          setisWriteModalOpen(false);

      }
    })
  };

  const onWriteCancel = () => {
    setisWriteModalOpen(false);
  };

  const showEditModal = (record) => {
    if(record.tag[0]==="success") {
      editForm.setFieldsValue({
        name : record.name,
        date : moment(record.date, 'YYYYMMDDHHmmss'),
        week : record.time.split(" ")[0],
        time : record.time.split(" ")[1],
        todo : record.todo,
        tag : "완료",
      })
    }
    if(record.tag[0]==="warning") {
      editForm.setFieldsValue({
        name : record.name,
        date : moment(record.date, 'YYYYMMDDHHmmss'),
        week : record.time.split(" ")[0],
        time : record.time.split(" ")[1],
        todo : record.todo,
        tag : "진행중",
      })
    }
    if(record.tag[0]==="error") {
      editForm.setFieldsValue({
        name : record.name,
        date : moment(record.date, 'YYYYMMDDHHmmss'),
        week : record.time.split(" ")[0],
        time : record.time.split(" ")[1],
        todo : record.todo,
        tag : "미완료",
      })
    }
    set_idOfTodo(record._id);
    setisEditModalOpen(true);
  };

  const onEditStateChange = (e) => {
    setEditValue(e.target.value);
  };

  const onEditOk = () => {
    let body = {
      _id : _idOfTodo,
      name : editForm.getFieldValue(('name')),
      date : editForm.getFieldValue(('date')).format('YYYY/MM/DD'),
      time : editForm.getFieldValue(('week'))+" "+editForm.getFieldValue(('time')),
      todo : editForm.getFieldValue(('todo')),
      tag : editForm.getFieldValue(('tag'))
    }

    axios.post('/api/update', body).then((res) => {
      if(!res.data.success) {
          /** res 보고 예외처리 꼼꼼하게 */
          if(res.data.err.message) {
              alert(res.data.err.message);
          } else {
              alert("예외처리");
          }
      } else {
          alert("수정이 완료되었습니다.");
      }
    })
    setisEditModalOpen(false);
  };

  const onEditCancel = () => {
    setisEditModalOpen(false);
  };
  const showDeleteModal = (record) => {
    set_idOfTodo(record._id);
    setisDeleteModalOpen(true);
  }

  const onDeleteOk = () => {
    let body = {
      _id : _idOfTodo
    }
    axios.post('/api/delete', body).then((res) => {
      if(!res.data.success) {
          /** res 보고 예외처리 꼼꼼하게 */
          if(res.data.err.message) {
              alert(res.data.err.message);
          } else {
              alert("예외처리");
          }
      } else {
          alert("삭제가 완료되었습니다.");
      }
    })

    setisDeleteModalOpen(false);
  };

  const onDeleteCancel = () => {
    setisDeleteModalOpen(false);
  };
  
  const getTodo = () => {
    axios.post('/api/getTodo').then((res) => {
      dataArry = res.data.boardInfo;
      getTableData(dataArry);
    })
  }

  const getTableData = (dataArry) => {
    dataArry.map((data, i) => {
            if(dataArry[i].tag === "완료") {
                let dataValue = {
                    "key":(i+1).toString(),
                    "id":(i+1).toString(),
                    "_id":dataArry[i]._id,
                    "name":dataArry[i].name,
                    "date":dataArry[i].date,
                    "time": dataArry[i].time,
                    "todo":dataArry[i].todo,
                    "tag":["success"]
                };
                setTodoData(todoData => [...todoData, dataValue]);
            }
            if(dataArry[i].tag === "미완료") {
                let dataValue = {
                    "key":(i+1).toString(),
                    "id":(i+1).toString(),
                    "_id":dataArry[i]._id,
                    "name":dataArry[i].name,
                    "date":dataArry[i].date,
                    "time": dataArry[i].time,
                    "todo":dataArry[i].todo,
                    "tag":["error"]
                };
                setTodoData(todoData => [...todoData, dataValue]);
            }
            if(dataArry[i].tag === "진행중") {
                let dataValue = {
                    "key":(i+1).toString(),
                    "id":(i+1).toString(),
                    "_id":dataArry[i]._id,
                    "name":dataArry[i].name,
                    "date":dataArry[i].date,
                    "time": dataArry[i].time,
                    "todo":dataArry[i].todo,
                    "tag":["warning"]
                };
                setTodoData(todoData => [...todoData, dataValue]);
            }
    })
  }

  const columns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.key - b.key
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '시간',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '할 일',
      dataIndex: 'todo',
      key: 'todo',
    },
    {
      title: '상태',
      dataIndex: 'tag',
      key: 'tag',
      render: (_, { tag }) => (
        <>
          
          {tag.map((tag, i) => {
            let color = tag === 'success' ? 'success' : 'error';
            let icon = tag === 'success' ? <CheckCircleOutlined /> : <CloseCircleOutlined />;
            let tagName = tag === 'success' ? '완료' :  '미완료';


            if (tag === 'warning') {
              color = 'warning';
              tagName = '진행중';
              icon = <SyncOutlined spin />;
            }
  
            return (
              <Tag key={i} color={color} icon={icon}>
                {tagName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, i) => (
        <div key={i} style={{display:"flex", justifyContent: "center"}}> 
        <EditOutlined 
        style={{ color: "black" }} 
        onClick={()=>{showEditModal(record)}} 
        /> 
        <div style={{width:"30px",height:"1px"}}></div>
        <DeleteOutlined 
        style={{ color: "red"}} 
        onClick={()=>{showDeleteModal(record)}} 
        /> 
        </div> 
    ),
    },
  ];

  useEffect(() => {
    loginCheck()
    setName()
    getTodo()
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
                    <Breadcrumb.Item>ToDo</Breadcrumb.Item>
                  </Breadcrumb>
              </div>
              <div className="Margin" style={{height:"50px"}}></div>
              <div className="Title" style={{textAlign:'center'}}><h1>할 일 목록</h1></div>
              <div style={{float:"right", margin:'0 5px 20px 0'}}><Button type="primary" onClick={showWriteModal}><FormOutlined />작성</Button></div>
              <Table style={{width:'100%', margin:'auto'}} columns={columns} dataSource={todoData}/>
            </div>
            <Modal forceRender title="할 일 작성" open={isWriteModalOpen} onCancel={onWriteCancel}
                footer={[
                    <Button key="back" onClick={onWriteCancel}>
                    <UndoOutlined/>취소
                    </Button>,
                    <Button key="submit" type="primary" onClick={onWriteOk}>
                    <CheckOutlined/>작성
                    </Button>
                ]}
            >
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
                            tag : writeValue,
                        }}
                    autoComplete="off"
                    >
                        <Form.Item
                            label="이름"
                            name="name"
                            rules={[
                            {
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <Input readOnly={true} />
                        </Form.Item>

                        <Form.Item
                            label="날짜"
                            name="date"
                        >
                            <DatePicker size='middle' style={{ width: '100%' }} format={'YYYY/MM/DD'} />
                        </Form.Item>

                        <Form.Item
                            label="요일"
                            name='week'
                        >
                            <Select
                                allowClear
                                options={weekData.map((week) => ({ label: week, value: week }))}
                            >
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="시간"
                            name='time'
                        >
                            <Select
                                allowClear
                                options={timeData.map((time) => ({ label: time, value: time }))}
                            >
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="할 일"
                            name="todo"
                            rules={[
                            {
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="상태"
                            name="tag"
                        >
                            <Radio.Group value={writeValue} onChange={onWriteStateChange}>
                                <Radio value="진행중">진행중</Radio>
                                <Radio value="완료">완료</Radio>
                                <Radio value="미완료">미완료</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <Modal forceRender title="할 일 수정" open={isEditModalOpen} onCancel={onEditCancel}
                footer={[
                    <Button key="back" onClick={onEditCancel}>
                    <UndoOutlined/>취소
                    </Button>,
                    <Button key="submit" type="primary" onClick={onEditOk}>
                    <CheckOutlined/>수정
                    </Button>
                ]}
            >
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
                            label="이름"
                            name="name"
                            rules={[
                            {
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <Input readOnly={true} className='name'/>
                        </Form.Item>

                        <Form.Item
                            label="날짜"
                            name="date"
                        >
                            <DatePicker size='middle' style={{ width: '100%' }} format={'YYYY/MM/DD'} />
                        </Form.Item>

                        <Form.Item
                            label="요일"
                            name='week'
                        >
                            <Select
                                allowClear
                                options={weekData.map((week) => ({ label: week, value: week }))}
                            >
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="시간"
                            name='time'
                        >
                            <Select
                                allowClear
                                options={timeData.map((time) => ({ label: time, value: time }))}
                            >
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="할 일"
                            name="todo"
                            rules={[
                            {
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input className='todo' />
                        </Form.Item>

                        <Form.Item
                            label="상태"
                            name="tag"
                        >
                            <Radio.Group onChange={onEditStateChange} value={editValue}>
                                <Radio value="진행중"> 진행중 </Radio>
                                <Radio value="완료"> 완료 </Radio>
                                <Radio value="미완료"> 미완료 </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
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

export default Todo;