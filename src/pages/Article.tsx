import { Button, Table } from 'antd';
import * as React from 'react';

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
    public render() {
        const state: any = this.state;
        const columns: object[] = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
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

    private onNewArticleClick = (): void => {
        const props: any = this.props;
        props.history.push(`${props.match.url}/release`);
    };
}

export default Article;
