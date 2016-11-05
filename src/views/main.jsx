import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import ls from 'store2'
import {propTypes} from '../decorators'
import MainItem from "../components/main-item.jsx"
import Footer from '../components/footer.jsx'

function mapStateToProps(state) {
    return {
        posts: state.topics
    }
}

@connect(mapStateToProps)
@propTypes({
    posts: PropTypes.object
})
export default class Main extends Component {
    constructor(props) {
        super(props)
        this.handleLoadMore = this.handleLoadMore.bind(this)
    }
    componentDidMount() {
        const path = this.props.location.pathname
        const scrollTop = ls.get(path) || 0
        window.scrollTo(0, scrollTop)
    }
    handleLoadMore() {
        const {curpage} = this.props.posts
        const {pathname} = this.props.location
        this.props.dispatch({type: 'topics/query', payload: { page: curpage + 1, pathname }})
    }
    render() {
        const {list, hasNext} = this.props.posts
        const lists = list.map(list => {
            return (
                <MainItem key={list._id} list={list} />
            )
        })
        const loadMore = hasNext ? <a onClick={this.handleLoadMore} href="javascript:;">加载更多</a> : <span>好厉害, 竟然翻到最后一页了...</span>
        return (
            <div className="g-mn">
                <div className="posts">
                    {lists}
                </div>
                <div className="box m-page box-do">
                    <div className="w-icon w-icon-2" />
                    <div className="w-icon w-icon-3" />
                    {loadMore}
                </div>
                <Footer />
            </div>
        )
    }
}
