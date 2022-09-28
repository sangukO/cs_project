import React, {useState} from 'react';
import Header from "./Header";
import Nav from "./Nav";
import { Breadcrumb, Button, Modal, Radio, Input, Form } from 'antd';
import 'antd/dist/antd.min.css';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';

const columns = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
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
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag === '완료' ? 'success' : 'error';
          let icon = tag === '완료' ? <CheckCircleOutlined /> : <CloseCircleOutlined />;

          if (tag === '진행중') {
            color = 'warning';
            icon = <SyncOutlined spin />;
          }

          return (
            <Tag color={color} key={tag} icon={icon}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>수정</a>
        <a>삭제</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: '오상욱',
    time: '평일 오후',
    todo: '발주된 물건 검수',
    tags: ['완료'],
  },
  {
    key: '2',
    name: '김현호',
    time: '평일 야간',
    todo: '새벽에 쓰레기통 비우기',
    tags: ['미완료'],
  },
  {
    key: '3',
    name: '김은하',
    time: '주말 오전',
    todo: '오전 물건 진열하기',
    tags: ['진행중'],
  },
];

function Todo() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('W');

  const showModal = () => {
    console.log(value);
    setIsModalOpen(true);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = () => {
    setIsModalOpen(false);
  };

  const onFinishFailed = () => {
      setIsModalOpen(false);
  };

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
              <div style={{float:"right", margin:'0 5px 20px 0'}}><Button type="primary" onClick={showModal}>작성</Button></div>
              <Table style={{width:'100%', margin:'auto'}} columns={columns} dataSource={data} />
            </div>
            <Modal title="할 일 작성" open={isModalOpen} onOk={onFinish} onCancel={onFinishFailed}>
            <div className="Form">
                    <Form style={{width:'80%', margin:'auto'}}
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
                            name="status"
                        >
                            <Radio.Group onChange={onChange}>
                                <Radio value='W'> 진행중 </Radio>
                                <Radio value={2}> 완료 </Radio>
                                <Radio value={3}> 미완료 </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default Todo;