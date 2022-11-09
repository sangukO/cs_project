import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { LaptopOutlined, NotificationOutlined, UserOutlined, CalendarOutlined, DesktopOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('공지 목록', '1', <NotificationOutlined />),
  getItem(<Link to={"/Todo"}>업무 관리</Link>, '2', <LaptopOutlined />),
  getItem(<Link to={"/Calendar"}>일정 관리</Link>, '3', <CalendarOutlined />),
  getItem('직원 목록', '4', <UserOutlined />),
  getItem('통합 관리', '5', <DesktopOutlined />),
];

function Nav() {
  const [collapsed, setCollapsed] = useState(false);
    return (
      <div>
        <Layout
          style={{
            minHeight: '94vh',
            width:'20%'
          }}
        >
          <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="logo" />
            <Menu  theme="light" mode="inline" items={items} defaultChecked={1}/>
          </Sider>
        </Layout>
      </div>
    )
}

export default Nav;