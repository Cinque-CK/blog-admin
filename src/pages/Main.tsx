import * as React from 'react';
import { Route } from 'react-router-dom';
import { Icon, Layout, Menu } from 'antd';
import Article from './Article';
import Release from './Release';
import User from './User';
import Gallery from './Gallery';
import Photo from './Photo';
import Category from './Category';
import Tag from './Tag';
import './Main.css'
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

    public componentWillMount() {
        const props: any = this.props;
        const path: string | undefined = window.location.hash.split('/')[2];
        const currentRoute: string | undefined = path || 'user';
        switch (currentRoute) {
            case 'release':
                this.setState({ selectedMenu: 'article' });
                break;
            case 'photo':
                this.setState({ selectedMenu: 'gallery' });
                break;
            default:
                this.setState({ selectedMenu: currentRoute });
        }
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
            <Layout className="page main-page" style={{ height: '100%' }}>
                <Sider className="ant-sider--cus" trigger={null} collapsible collapsed={state.collapsed}>
                    <Menu theme="dark" mode="inline" selectedKeys={[state.selectedMenu]} onClick={this.onMenuItemClick}>
                        <Menu.Item key="user">
                            <Icon type="user" />
                            <span>USER</span>
                        </Menu.Item>
                        <Menu.Item key="article">
                            <Icon type="file-text" />
                            <span>ARTICLE</span>
                        </Menu.Item>
                        <Menu.Item key="gallery">
                            <Icon type="picture" />
                            <span>GALLERY</span>
                        </Menu.Item>
                    </Menu>
                    <div>
                        <Icon className="trigger" type={state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                    </div>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <div>avatar</div>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <Route path={`${props.match.path}/user`} component={User} />
                        <Route path={`${props.match.path}/article`} component={Article} />
                        <Route exact path={`${props.match.path}/release`} component={Release} />
                        <Route path={`${props.match.path}/release/:id`} component={Release} />
                        <Route path={`${props.match.path}/gallery`} component={Gallery} />
                        <Route exact path={`${props.match.path}/photo`} component={Photo} />
                        <Route path={`${props.match.path}/photo/id`} component={Photo} />
                        <Route path={`${props.match.path}/category`} component={Category} />
                        <Route path={`${props.match.path}/tag`} component={Tag} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Main;
