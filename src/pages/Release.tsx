import * as React from 'react';
import { Input } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface IHomeRouterProps {
    match: any;
}
class Release extends React.Component<IHomeRouterProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            action: 1, // 1-add 2-edit
            articleContent: ''
        };
        this.quillRef = React.createRef();
    }

    private quillRef: any;

    private imageHandler = (image, callback) => {
        const range = this.quillRef.getEditor().getSelection();
        const value = prompt('What is the image URL');
        if (value) {
            this.quillRef.getEditor().insertEmbed(range.index, 'image', value, 'user');
        }
    };

    private onArticleContentChange = value => {
        this.setState({
            articleContent: value
        })
    }

    public componentWillMount(){
        const props = this.props;
        if(props.match.params.id){
            // todo: call api - get article detail by id
            this.setState({
                action: 2
            })
        }
    }

    public render() {
        const state:any = this.state;
        const modules = {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ font: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ script: 'sub' }, { script: 'super' }],
                    [{ indent: '-1' }, { indent: '+1' }],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ['link', 'image'],
                    ['clean']
                ],
                handlers: {
                    image: this.imageHandler
                }
            }
        };
        return (
            <div className="page--inner release-page--inner">
                <div className="form-wrap">
                    <div className="form-item">
                        <span className="label">Title:</span>
                        <Input />
                    </div>
                    <div className="form-item">
                        <ReactQuill
                            ref={ref => {
                                this.quillRef = ref;
                            }}
                            value={state.articleContent}
                            modules={modules}
                            theme="snow"
                            onChange={this.onArticleContentChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Release;
