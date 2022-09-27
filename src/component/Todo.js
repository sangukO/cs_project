import React from 'react';
import 'antd/dist/antd.css';
import { Space, Table, Tag } from 'antd';

const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '나이',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '할 일',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '상태',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
  
            if (tag === 'loser') {
              color = 'volcano';
            }
  
            return (
              <Tag color={color} key={tag}>
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
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

function Todo() {
    return (
        <div>
            <div className="Title" style={{textAlign:'center'}}><h2>할 일 목록</h2></div>
            <Table columns={columns} dataSource={data} />;
        </div>
    )
}

export default Todo;