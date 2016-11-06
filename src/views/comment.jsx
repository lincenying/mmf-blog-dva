import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {propTypes} from '../decorators'
import CommentItem from "../components/comment-item.jsx"

function mapStateToProps({comment}) {
    return { comment }
}

@connect(mapStateToProps)
@propTypes({
    comment: PropTypes.object
})
export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            content: ''
        }
        this.handlePostComment = this.handlePostComment.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        const id = e.target.id,
            value = e.target.value
        const state = this.state
        state[id] = value
        this.setState(state)
    }
    handlePostComment() {
        const {id, dispatch} = this.props
        const {username, content} = this.state
        dispatch({type: `comment/postComment`, payload: {
            id, username, content
        }})
        this.setState({username: '', content: ''})
    }
    render() {
        const {comment: {list, hasNext, page}, id, pathname} = this.props
        const lists = list.map(list => {
            return (
                <CommentItem key={list._id} list={list} />
            )
        })
        const more = hasNext ?
            <div className="bcmtmore s-bd2">
                <div className="bcmtlsta">
                    <a onClick={this.dispatch({type: 'comment/query', payload: {id, page: page + 1, pathname }})} href="javascript:;" className="s-fc2 ztag">查看更多</a>
                </div>
            </div> : ''
        return (
            <div className="box">
                <div className="comment">
                    <div className="nctitle">评论</div>
                    <div className="bcmt">
                        <div className="s-fc0 ztag ztag_tips">由于该用户的权限设置，您暂时无法进行评论...</div>
                        <div className="bcmtadd">
                            <input value={this.state.username} onChange={this.handleChange} id="username" type="text" className="form-control" placeholder="请输入昵称" />
                            <textarea value={this.state.content} onChange={this.handleChange} id="content" className="form-control" placeholder="请输入评论内容" />
                            <div className="bcmtbtn">
                                <span className="ztag ztag_tips">提示</span>
                                <button onClick={this.handlePostComment} className="s-bd1 s-fc1 s-bg1 ztag">发布</button>
                                <div className="txt s-fc0" />
                            </div>
                        </div>
                        <div className="bcmtlst">
                            <ul className="clearfix ztag">
                                {lists}
                            </ul>
                        </div>
                        {more}
                    </div>
                </div>
            </div>
        )
    }
}
