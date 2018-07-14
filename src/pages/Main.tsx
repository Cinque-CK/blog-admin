import * as React from 'react';
import { Route } from 'react-router-dom';
import { Dropdown, Icon, Layout, Menu, Modal } from 'antd';
import * as classnames from 'classnames';
import { removeToken } from '../utils/lsUtil';
import Article from './Article';
import Release from './Release';
import User from './User';
import Gallery from './Gallery';
import Photo from './Photo';
import Category from './Category';
import Tag from './Tag';
import defaultAvatar from '../static/images/default_avatar.png';
import './Main.css'
const { Header, Content, Sider } = Layout;
const confirm = Modal.confirm;

interface IHomeRouterProps {
    match: any;
    history: any;
}
class Main extends React.Component<IHomeRouterProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false,
            selectedMenu: 'user',
            userName: '',
            avatarUrl: defaultAvatar
        };
    }

    private initPageInfo = ():void => {
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

    private initUser = ():void => {
        // todo call api: get account detail
        console.log('init user')
    }

    private onAvatarMenuItemClick = ({ key }: any) => {
        switch(key){
            case 'logout':
                this.emitLogout();
                break;
            default:
                return;
        }
    }

    private emitLogout = ():void => {
        confirm({
            title: 'Alert',
            content: 'Are you sure you want to logout?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                removeToken();
                window.location.hash = '/login';
            }
        });
    }

    private siderToggle = (): void => {
        const state: any = this.state;
        this.setState({
            collapsed: !state.collapsed
        });
    };

    private onSiderMenuItemClick = ({ key }: any) => {
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
        this.initPageInfo();
        this.initUser();
    }

    public render() {
        const state: any = this.state;
        const props: any = this.props;
        const menu = (
            <Menu onClick={this.onAvatarMenuItemClick}>
                <Menu.Item key="logout">
                    <span><Icon type="logout"/>Logout</span>
                </Menu.Item>
            </Menu>
          );
        return (
            <Layout className="page main-page" style={{ height: '100%' }}>
                <Sider className="ant-sider--cus" trigger={null} collapsible collapsed={state.collapsed}>
                    <Header className={classnames('sider__header',{collapsed: state.collapsed})}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <img className="avatar" src={state.avatarUrl} alt="avatar"/>
                        </Dropdown>
                        <Icon className={classnames('toggle-icon', {hidden: state.collapsed})} type={state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.siderToggle} />
                        <div className={classnames('toggle-trigger-wrap', {hidden: !state.collapsed})}>
                            <span className="toggle-trigger" onClick={this.siderToggle}/>
                        </div>
                    </Header>
                    <Menu theme="dark" mode="inline" selectedKeys={[state.selectedMenu]} onClick={this.onSiderMenuItemClick}>
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
                        <Menu.Item key="category">
                            <Icon type="profile" />
                            <span>CATEGORY</span>
                        </Menu.Item>
                        <Menu.Item key="tag">
                            <Icon type="tag-o" />
                            <span>TAG</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content className="ant-layout-content--cus" style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
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
