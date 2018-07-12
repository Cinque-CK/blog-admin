import * as React from 'react';
import { Table } from 'antd';

class User extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            userList: []
        };
    }
    public render() {
        const state: any = this.state;
        const columns: object[] = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            }
        ];
        return (
            <div className="page--inner article-user--inner">
                <Table columns={columns} dataSource={state.userList} />
            </div>
        );
    }
}

export default User;