import React, {Component, PropTypes} from 'react'
import {Link} from 'dva/router'

import {propTypes} from '../decorators'

@propTypes({
    list: PropTypes.object
})
export default class MainItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMore: 0
        }
        this.handleOpen = this.handleOpen.bind(this)
    }
    handleOpen() {
        this.setState({showMore: !this.state.showMore})
    }
    render() {
        const item = this.props.list
        const btn = this.state.showMore ?
            <a onClick={this.handleOpen} className="less" href="javascript:;">收起 ↑</a> : <a onClick={this.handleOpen} className="more" href="javascript:;">展开 ↓</a>
        return (
            <div className="index m-post box article">
                <a href="javascript:;" className="w-icon w-icon-1">&nbsp;</a>
                <a href="javascript:;" className="w-icon2">&nbsp;</a>
                <div className="info">
                    <a href="javascript:;">{item.creat_date || item.created_at}</a>
                </div>
                <div className="cont cont-1">
                    <div className="text">
                        <h2><Link to={`/article/${item._id}`}>{item.title}</Link></h2>
                        <div className={!this.state.showMore ? "markdown-body showless" : "markdown-body"} dangerouslySetInnerHTML={{__html: item.html}} />
                        <div className="more-less">{btn}</div>
                    </div>
                </div>
                <div className="info info-1" />
            </div>
        )
    }
}
