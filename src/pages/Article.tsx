import * as React from 'react';
import { Button, Table, Icon, Modal } from 'antd';
const confirm = Modal.confirm;
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

    private onNewArticleClick = (): void => {
        const props: any = this.props;
        props.history.push(`release`);
    };

    private onEditClick = (id: number): void => {
        const props: any = this.props;
        props.history.push(`release/${id}`);
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
                title: 'Author',
                dataIndex: 'author',
                key: 'author'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: record => <span>{record === 1 ? 'Released' : 'Draft'}</span>
            },
            {
                title: 'Created',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            {
                title: 'Updated',
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
                        <Icon type="edit" onClick={this.onDeleteClick.bind(this, record.id)} />
                    </span>
                )
            }
        ];
        return (
            <div className="page--inner article-page--inner">
                <div className="">
                    <Button type="primary" onClick={this.onNewArticleClick}>
                        New
                    </Button>
                </div>
                <Table columns={columns} dataSource={state.articleList} />
            </div>
        );
    }
}

export default Article;
