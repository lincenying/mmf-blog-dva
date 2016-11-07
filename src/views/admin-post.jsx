import React, {Component} from 'react'
import {connect} from 'dva'
import {browserHistory} from 'dva/router'
import { add } from '../services/admin'

@connect()
export default class AdminArticlePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            category: '',
            content: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        // eslint-disable-next-line
        window.articleEditor = editormd("post-content", {
            width: "100%",
            height: 500,
            markdown: "",
            placeholder: '请输入内容...',
            path: '../static/editor.md/lib/',
            toolbarIcons() {
                return [
                    "bold", "italic", "quote", "|",
                    "list-ul", "list-ol", "hr", "|",
                    "link", "reference-link", "image", "code", "code-block", "table", "|",
                    "watch", "preview", "fullscreen", "|",
                    "help"
                ]
            },
            watch : false,
            saveHTMLToTextarea : true,
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL : "/api/?action=upload"
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        const {title, category} = this.state
        // eslint-disable-next-line
        const content = articleEditor.getMarkdown()
        if (title === '' || category === '' || content === '') {
            this.props.dispatch({
                type: 'globals/setMessage',
                payload: {
                    type: 'error',
                    content: '请将表单填写完整!'
                }
            })
            return false
        }
        add({
            title, category, content
        }).then(({data}) => {
            if (data.code === 200) {
                this.props.dispatch({
                    type: 'globals/setMessage',
                    payload: '发布成功'
                })
                browserHistory.push('/admin/list')
            } else {
                this.props.dispatch({
                    type: 'globals/setMessage',
                    payload: {
                        type: 'error',
                        content: data.message
                    }
                })
            }
        })
    }
    handleChange(e) {
        const id = e.target.id,
            value = e.target.value
        const state = this.state
        state[id] = value
        this.setState(state)
    }
    render() {
        return (
            <div className="g-mn">
                <div className="box">
                    <form onSubmit={this.handleSubmit} id="article-post" action="/api/" method="post">
                        <section id="post-title">
                            <input value={this.state.title} onChange={this.handleChange} id="title" type="text" className="form-control" placeholder="请输入标题" />
                        </section>
                        <section id="post-category">
                            <select value={this.state.category} onChange={this.handleChange} id="category" name="category" className="form-control">
                                <option value="">请选择分类</option>
                                <option value="1">生活</option>
                                <option value="2">工作</option>
                                <option value="3">其他</option>
                            </select>
                        </section>
                        <section id="post-content">
                            <textarea id="editor" name="content" className="form-control hidden" data-autosave="editor-content" />
                        </section>
                        <section id="post-submit">
                            <input type="hidden" name="action" value="post" />
                            <button className="btn btn-success">发布</button>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
}
