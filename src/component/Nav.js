import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { LaptopOutlined, NotificationOutlined, UserOutlined, PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import Todo from "./Todo";
const { Header, Sider, Content } = Layout;
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
  getItem(<Link to={"/Todo"}>역할 관리</Link>, '2', <LaptopOutlined />),
  getItem('직원 목록', '3', <UserOutlined />),
  getItem('시간 관리', '4', <PieChartOutlined />),
  getItem('통합 관리', '5', <DesktopOutlined />),
];

function Nav() {
  const [collapsed, setCollapsed] = useState(false);
    return (
        <div>
            <Layout>
            <Header className="header">
              <div>
                <div className='Member' style={{float:'right'}}>
                  <Link to={"/Login"}>LOGIN</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to={"/Join"}>JOIN</Link>
                </div>
                <div className="Home">
                  <Link to={"/"}>HOME</Link>
                </div>
              </div>
            </Header>
            <Layout
              style={{
                minHeight: '94vh',
              }}
            >
              <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                  <div className="logo" />
                  <Menu theme="dark" mode="inline" items={items} />
              </Sider>
                <Layout
                style={{
                padding: '0 24px 24px',
                }}
                >
                    <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                      <Todo />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        </div>

    )
}

export default Nav;