import * as React from 'react';
import { Button, Input, Icon, Modal, Table } from 'antd';
const confirm = Modal.confirm;
const Search = Input.Search;
interface IHomeRouterProps {
    match: any;
    history: any;
}

class Article extends React.Component<IHomeRouterProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            articleList: []
        };
    }

    private onSearchClick = (value):void => {
        console.log(value)
    }

    private onNewArticleClick = (): void => {
        const props: any = this.props;
        props.history.push(`publish`);
    };

    private onEditClick = (id: number): void => {
        const props: any = this.props;
        props.history.push(`publish/${id}`);
    };

    private onDeleteClick = (id: number): void => {
        confirm({
            title: 'Alert',
            content: 'Are you sure delete this article?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                // TODO: call delete article api
                console.log(id);
            }
        });
    };

    public render() {
        const state: any = this.state;
        const columns: object[] = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category'
            },
            {
                title: 'Tag',
                dataIndex: 'tag',
                key: 'tag'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: record => <span>{record === 1 ? 'Published' : 'Draft'}</span>
            },
            {
                title: 'Create Time',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            {
                title: 'Update Time',
                dataIndex: 'updateTime',
                key: 'updateTime'
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: record => (
                    <span>
                        <Icon type="edit" onClick={this.onEditClick.bind(this, record.id)} />
                        <Icon type="delete" onClick={this.onDeleteClick.bind(this, record.id)} />
                    </span>
                )
            }
        ];
        return (
            <div className="page--inner article-page--inner">
                <div className="page--inner__header">
                    <div className="search-wrap">
                        <Search placeholder="search by title..." onSearch={this.onSearchClick} enterButton size="large"/>
                    </div>
                    <div className="btn-wrap">
                        <Button type="primary" onClick={this.onNewArticleClick} size="large">
                            New
                        </Button>
                    </div>
                </div>
                <Table columns={columns} dataSource={state.articleList} bordered />
            </div>
        );
    }
}

export default Article;
