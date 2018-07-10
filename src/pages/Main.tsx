import { Icon, Layout, Menu } from 'antd';
import * as React from 'react';
import { Route } from 'react-router-dom';

import Article from './Article';
import Release from './Release';
import User from './User';
const { Header, Content, Sider } = Layout;
interface IHomeRouterProps {
    match: any;
    history: any;
}
class Main extends React.Component<IHomeRouterProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false,
            selectedMenu: 'user'
        };
    }

    public componentWillMount() {
        const props: any = this.props;
        const path: string | undefined = window.location.hash.split('/')[2];
        const currentRoute: string | undefined = path || 'user';
        this.setState({ selectedMenu: currentRoute });
        if (!path) {
            let matchUrl: string = props.match.url;
            if (matchUrl.endsWith('/')) {
                matchUrl = matchUrl.slice(0, -1);
            }
            props.history.push(`${matchUrl}/user`);
        }
    }

    public render() {
        const state: any = this.state;
        const props: any = this.props;
        return (
            <Layout style={{ height: '100%' }}>
                <Sider trigger={null} collapsible collapsed={state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" selectedKeys={[state.selectedMenu]} onClick={this.onMenuItemClick}>
                        <Menu.Item key="user">
                            <Icon type="user" />
                            <span>User</span>
                        </Menu.Item>
                        <Menu.Item key="article">
                            <Icon type="file-text" />
                            <span>Article</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon className="trigger" type={state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <Route path={`${props.match.url}/user`} component={User} />
                        <Route path={`${props.match.url}/article`} component={Article} />
                        <Route path={`${props.match.url}/release`} component={Release} />
                    </Content>
                </Layout>
            </Layout>
        );
    }

    private toggle = (): void => {
        const state: any = this.state;
        this.setState({
            collapsed: !state.collapsed
        });
    };

    private onMenuItemClick = ({ key }: any) => {
        const props: any = this.props;
        const state: any = this.state;
        if (state.selectedMenu !== key) {
            this.setState({
                selectedMenu: key
            });
            props.history.push(`${props.match.url}/${key}`);
        }
    };
}

export default Main;
