import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
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
  getItem(<Link to={"/Notice"}>공지 목록</Link>, '/Notice', <NotificationOutlined />),
  getItem(<Link to={"/Todo"}>업무 관리</Link>, '/Todo', <LaptopOutlined />),
  getItem(<Link to={"/Calendar"}>일정 관리</Link>, '/Calendar', <CalendarOutlined />),
  getItem(<Link to={"/Staff"}>직원 목록</Link>, '/Staff', <UserOutlined />)
];

function Nav() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const getURL = () => {
    return(location.pathname);
  }

  useEffect(() => {
    getURL()
  }, []);

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
            <Menu theme="light" mode="inline" items={items} defaultSelectedKeys={getURL()}/>
          </Sider>
        </Layout>
      </div>
    )
}

export default Nav;