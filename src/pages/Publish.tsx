import * as React from 'react';
import { Button, Input, Modal, Radio, Select } from 'antd';
import ReactQuill from 'react-quill';
import { getArticle, setArticle, removeArticle } from '../utils/lsUtil';
import 'react-quill/dist/quill.snow.css';
import './Publish.css';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

interface IComponentProps {
    match: any;
    history: any;
}
interface IComponentState {
    action: number, // 1-add 2-edit
    categories: object[],
    tags: object[],
    articleTitle: string,
    articleContent: string,
    articleCategory: string,
    articleTags: string[],
    articlePublicity: boolean
}
class Publish extends React.Component<IComponentProps, IComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            action: 1, // 1-add 2-edit
            categories: [],
            tags: [],

            articleTitle: '',
            articleContent: '',
            articleCategory: '',
            articleTags: [],
            articlePublicity: true
        };
        this.quillRef = React.createRef();
    }

    private quillRef: any;
    private autoSaveTimer: number | undefined = undefined;

    private getCategories = () => {
        console.log('categories')
    }

    private getTags = () => {
        console.log('tags')
    }

    private getArticleById = id => {
        console.log()
    }

    private onArticleTitleChange = e => {
        this.setState({
            articleTitle: e.target.value
        })
    }

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
        if (!this.autoSaveTimer) {
            this.autoSaveTimer = window.setInterval(()=>{
                const {articleTitle, articleContent, articleCategory, articleTags, articlePublicity} = this.state;
                setArticle(JSON.stringify({
                    articleTitle, articleContent, articleCategory, articleTags, articlePublicity
                }))
            },120000)
        }
    }

    private onArticleCategoryChange = value => {
        this.setState({
            articleCategory: value
        })
    }

    private onArticleTagsChange = value => {
        this.setState({
            articleTags: value
        })
    }

    private onArticlePublicityChange = e => {
        this.setState({
            articlePublicity: e.target.value
        })
    }

    private onSaveDraftClick = () => {
        console.log('save draft');
        clearInterval(this.autoSaveTimer)
    }

    private onPublishClick = () => {
        console.log('publish article')
        clearInterval(this.autoSaveTimer)
    }

    public componentWillMount(){
        this.getCategories();
        this.getTags();
        const props = this.props;
        const id = props.match.params.id;
        if(!!id){
            // todo: call api - get article detail by id
            this.getArticleById(id);
            this.setState({
                action: 2
            })
        } else {
            // check exist article in localstorage
            const lsArticle = getArticle();
            if(lsArticle){
                confirm({
                    title: 'Info',
                    content: 'The last article is not saved, continue to edit?',
                    okText: 'Continue',
                    cancelText: 'New',
                    onOk:() => {
                        const {articleTitle, articleContent, articleCategory, articleTags, articlePublicity} = JSON.parse(lsArticle);
                        this.setState({
                            articleTitle, articleContent, articleCategory, articleTags, articlePublicity
                        })
                    },
                    onCancel:() => {
                        return;
                    },
                });
            }
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
            <div className="page--inner publish-page--inner">
                <h3>{state.action === 1 ? 'New Article' : 'Edit Article'}</h3>
                <div className="page-content">
                    <div className="page-content__body">
                        <div className="form-item">
                            <Input placeholder="Title" size="large" onChange={this.onArticleTitleChange}/>
                        </div>
                        <ReactQuill
                            className="quill-editor"
                            ref={ref => {
                                this.quillRef = ref;
                            }}
                            value={state.articleContent}
                            modules={modules}
                            theme="snow"
                            onChange={this.onArticleContentChange}
                        />
                    </div>
                    <div className="page-content__sider page-content__sider--right">
                        <div className="form-item">
                            <span className="label">Category</span>
                            <Select className="full-width" value={state.articleCategory} onChange={this.onArticleCategoryChange}>
                                {/* {
                                    state.categories.map(category => <Option key={category.id} value={category.name}>{category.name}</Option>)
                                } */}
                                <Option key="0">Techblog</Option>
                                <Option key="1">Travels</Option>
                                <Option key="2">Jotting</Option>
                            </Select>
                        </div>
                        <div className="form-item">
                            <span className="label">Tags</span>
                            <Select
                                className="full-width"
                                mode="multiple"
                                value={state.articleTags}
                                onChange={this.onArticleTagsChange}
                            >
                                {/* {
                                    state.tags.map(tag => <Option key={tag.id} value={tag.name}>{tag.name}</Option>)
                                } */}
                                <Option key="0">reactjs</Option>
                                <Option key="1">javascript</Option>
                                <Option key="2">html</Option>
                                <Option key="3">nodejs</Option>
                                <Option key="4">koa</Option>
                            </Select>
                        </div>
                        <div className="form-item">
                            <span className="label">Publicity</span>
                            <RadioGroup onChange={this.onArticlePublicityChange} value={state.articlePublicity}>
                                <Radio value={true}>Public</Radio>
                                <Radio value={false}>Private</Radio>
                            </RadioGroup>
                        </div>
                        <div className="form-item form-item--inline">
                            <Button className="ant-btn--cus full-width" onClick={this.onSaveDraftClick} size="large">Save as draft</Button>
                        </div>
                        <div className="form-item form-item--inline">
                            <Button className="ant-btn--cus full-width" type="primary" onClick={this.onPublishClick} size="large">Publish</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Publish;
