import React, { useState } from 'react';
import Map from './Map';
import './App.css';
import { UserOutlined } from '@ant-design/icons';
import {Layout, Menu, theme, Button, Typography} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { Title }=Typography;
function getItem(label, key) {
  return {
    key,
    label
  };
}
const items = [
  getItem('Map', '1'),
  getItem('Locate Me', '2'),
  getItem('View', 'sub1'),
  getItem('Region', '9'),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider className='sider' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu className='menu' defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className='layout'>
        <Header className='header'
          style={{
            textAlign:'right',
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Title className='head-title'>MapUp</Title>
          <Button className='head-btn'>Login</Button>
          <UserOutlined className='profile'/>
        </Header>
        <Content className='content'
          style={{
            margin: '0 16px',
          }}
        >
          <Map />
        </Content>
        <Footer className='footer'
          style={{
            textAlign: 'center',
          }}
        >
          MapUp ©2023 Created by Vivek Bhatt
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;