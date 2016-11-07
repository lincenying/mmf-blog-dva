import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {Link} from 'dva/router'
import {propTypes} from '../decorators'

function mapStateToProps(state) {
    return {
        posts: state.admin.posts
    }
}

@connect(mapStateToProps)
@propTypes({
    posts: PropTypes.object
})
export default class AdminArticleList extends Component {
    constructor(props) {
        super(props)
        this.handleDeleteArticle = this.handleDeleteArticle.bind(this)
        this.handleRecoverArticle = this.handleRecoverArticle.bind(this)
    }
    handleDeleteArticle(id) {
        this.props.dispatch({
            type: 'admin/deleteQuery',
            payload: { id }
        })
    }
    handleRecoverArticle(id) {
        this.props.dispatch({
            type: 'admin/recoverQuery',
            payload: { id }
        })
    }
    render() {
        const { posts } = this.props
        const lists = posts.list.map(item => {
            return (
                <li key={item._id} className="list-group-item">
                    <Link to={`/article/${item._id}`} target="_blank" rel='noopener noreferrer'>{item.title}</Link>
                    {
                        // eslint-disable-next-line
                        item.is_delete == "0" ?
                            <a onClick={this.handleDeleteArticle.bind(this, item._id)} href="javascript:;" className="badge badge-danger">删除</a> : <a onClick={this.handleRecoverArticle.bind(this, item._id)} href="javascript:;" className="badge badge-info">恢复</a>
                    }
                    <Link to={`/admin/edit/${item._id}/${posts.page}`} className="badge badge-success">编辑</Link>
                </li>
            )
        })
        return (
            <div className="g-mn">
                <div className="box">
                    <ul className="list-group">
                        {lists}
                    </ul>
                </div>
                <div className="box m-page box-do">
                    <div className="w-icon w-icon-2" />
                    <div className="w-icon w-icon-3" />
                    {posts.hasPrev ? <Link to={`/admin/list/${posts.page - 1}`} className="prev">上一页</Link> : ''}
                    {posts.hasNext ? <Link to={`/admin/list/${posts.page + 1}`} className="next">下一页</Link> : ''}
                </div>
            </div>
        )
    }
}
