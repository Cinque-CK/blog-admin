import { Input } from 'antd';
import * as BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import * as React from 'react';
class Release extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    public render() {
    
        return (
            <div className="page--inner release-page--inner">
                <div className="form-wrap">
                    <div className="form-item">
                        <span className="label">Title:</span>
                        <Input />
                    </div>

                    <div className="form-item">
                        <BraftEditor onChange={this.onEditorChange} onRawChange={this.onEditorRawChange}/>
                    </div>
                </div>
            </div>
        );
    }

    private onEditorChange = (content: any) => {
        console.log(content);
    };

    private onEditorRawChange = (rawContent: any) => {
        console.log(rawContent);
    };
}

export default Release;
