import React, {useState} from 'react';
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Button, Modal, Radio, Input, Form } from 'antd';
import 'antd/dist/antd.min.css';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Table, Tag } from 'antd';

function Todo() {

  const [writeForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const [isWriteModalOpen, setisWriteModalOpen] = useState(false);
  const [writeValue, setWriteValue] = useState("진행중");

  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [editValue, setEditValue] = useState("진행중");

  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);

  const showWriteModal = () => {
    writeForm.setFieldsValue({
      tag: "진행중",
    });
    setisWriteModalOpen(true);
  };

  const onWriteStateChange = (e) => {
    setWriteValue(e.target.value);
  };

  const onWriteOk = () => {
    setisWriteModalOpen(false);
  };

  const onWriteCancel = () => {
    setisWriteModalOpen(false);
  };

  const showEditModal = (record) => {
    editForm.setFieldsValue({
      name : record.name,
      time : record.time,
      todo : record.todo,
      tag: record.tag[0],
    })
    setisEditModalOpen(true);
  };

  const onEditStateChange = (e) => {
    setEditValue(e.target.value);
  };

  const onEditOk = () => {
    setisEditModalOpen(false);
  };

  const onEditCancel = () => {
    setisEditModalOpen(false);
  };

  const showDeleteModal = () => {
    setisDeleteModalOpen(true);
  }

  const onDeleteOk = () => {
    setisDeleteModalOpen(false);
  };

  const onDeleteCancel = () => {
    setisDeleteModalOpen(false);
  };
  
  const data = [
    {
        "id":"1",
        "name":"점주",
        "date":"2022/10/03",
        "time": "점주",
        "todo":"물건 발주",
        "tag":["success"],
    },
    {
        "id":"2",
        "name":"오상욱",
        "date":"2022/10/04",
        "time": "평일 오후",
        "todo":"발주된 물건 검수",
        "tag":["success"],
    },
    {
        "id":"3",
        "name":"점주",
        "date":"2022/10/05",
        "time": "점주",
        "todo":"물건 발주",
        "tag":["success"],
    },
    {
        "id":"4",
        "name":"오상욱",
        "date":"2022/10/06",
        "time": "평일 오후",
        "todo":"발주된 물건 검수",
        "tag":["warning"],
    },
    {
        "id":"5",
        "name":"김현호",
        "date":"2022/10/04",
        "time": "평일 야간",
        "todo":"새벽에 쓰레기통 비우기",
        "tag":["error"],
    },
    {
        "id":"6",
        "name":"김인하",
        "date":"2022/10/08",
        "time": "주말 오전",
        "todo":"오전 물건 진열하기",
        "tag":["warning"],
    },
  ]
  
  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
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
          
          {tag.map((tag) => {
            let color = tag === 'success' ? 'success' : 'error';
            let icon = tag === 'success' ? <CheckCircleOutlined /> : <CloseCircleOutlined />;
            let tagName = tag === 'success' ? '완료' :  '미완료';


            if (tag === 'warning') {
              color = 'warning';
              tagName = '진행중';
              icon = <SyncOutlined spin />;
            }
  
            return (
              <Tag key={tag.id} color={color} icon={icon}>
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
                    <Breadcrumb.Item>ToDo</Breadcrumb.Item>
                  </Breadcrumb>
              </div>
              <div className="Title" style={{textAlign:'center'}}><h2>할 일 목록</h2></div>
              <div style={{float:"right", margin:'0 5px 20px 0'}}><Button type="primary" onClick={showWriteModal}>작성</Button></div>
              <Table style={{width:'100%', margin:'auto'}} columns={columns} dataSource={data} />
            </div>
            <Modal title="할 일 작성" open={isWriteModalOpen} onOk={onWriteOk} onCancel={onWriteCancel}>
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
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="시간"
                            name="time"
                            rules={[
                            {
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input />
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
            <Modal title="할 일 수정" open={isEditModalOpen} onOk={onEditOk} onCancel={onEditCancel}>
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
                            <Input className='name'/>
                        </Form.Item>

                        <Form.Item
                            label="시간"
                            name="time"
                            rules={[
                            {
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input className='time'/>
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
            <Modal title="삭제하시겠습니까?" open={isDeleteModalOpen} onOk={onDeleteOk} onCancel={onDeleteCancel}>
              <div>
                <p>내용은 복구되지 않습니다.</p>
              </div>
            </Modal>
        </div>
    )
}

export default Todo;