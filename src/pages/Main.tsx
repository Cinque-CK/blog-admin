import {Breadcrumb, Icon, Layout, Menu} from 'antd';
import * as React from 'react';

const {Header, Content, Sider} = Layout;
class Main extends React.Component {
    public render() {
        return (
            <Layout style={{
                height: '100%'
            }}>
                <Header className="header">
                    <div className="logo">BLOG MANAGEMENT</div>
                </Header>
                <Layout>
                    <Sider
                        width={200}
                        style={{
                        background: '#fff'
                    }}>
                        <Menu
                            className="ant-menu--cus"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            theme="dark"
                            style={{
                            height: '100%',
                            borderRight: 0
                        }}>
                            <Menu.Item key="1">
                                <span><Icon type="user"/>nav 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout
                        style={{
                        padding: '0 24px 24px'
                    }}>
                        <Breadcrumb
                            style={{
                            margin: '16px 0'
                        }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}>
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Main;