import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {browserHistory} from 'dva/router'
import { edit } from '../services/admin'
import {propTypes} from '../decorators'

function mapStateToProps(state) {
    return {
        article: state.admin.article
    }
}

@connect(mapStateToProps)
@propTypes({
    article: PropTypes.object
})
export default class AdminArticleEdit extends Component {
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
    componentDidUpdate(prevProps) {
        if (!prevProps.article.data._id && this.props.article.data._id) {
            this.setState({
                title: this.props.article.data.title,
                category: this.props.article.data.category,
                content: this.props.article.data.content
            })
            // eslint-disable-next-line
            window.editEditor = editormd("edit-content", {
                width: "100%",
                height: 500,
                markdown: "",
                placeholder: '请输入内容...',
                path: '/static/editor.md/lib/',
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
    }
    handleSubmit(event) {
        event.preventDefault()
        const {params: {id, page}} = this.props
        const {title, category} = this.state
        // eslint-disable-next-line
        const content = editEditor.getMarkdown()
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
        edit({
            id, title, category, content
        }).then(({data}) => {
            if (data.code === 200) {
                this.props.dispatch({
                    type: 'globals/setMessage',
                    payload: '编辑成功'
                })
                browserHistory.push(`/admin/list/${page}`)
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
        const id = e.target.name,
            value = e.target.value
        const state = this.state
        state[id] = value
        this.setState(state)
    }
    render() {
        return (
            <div className="g-mn">
                <div className="box">
                    <form onSubmit={this.handleSubmit} id="article-edit" action="/api/" method="post">
                        <section id="edit-title">
                            <input value={this.state.title} onChange={this.handleChange} id="title" type="text" name="title" className="form-control" placeholder="请输入标题" />
                        </section>
                        <section id="edit-category">
                            <select value={this.state.category} onChange={this.handleChange} id="category" name="category" className="form-control">
                                <option value="">请选择分类</option>
                                <option value="1">生活</option>
                                <option value="2">工作</option>
                                <option value="3">其他</option>
                            </select>
                        </section>
                        <section id="edit-content">
                            <textarea value={this.state.content} onChange={this.handleChange} id="editor" name="content" className="form-control hidden" data-autosave="editor-content" />
                        </section>
                        <section id="edit-submit">
                            <button className="btn btn-success">编辑</button>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
}
