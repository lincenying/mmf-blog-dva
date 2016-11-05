import React from 'react'
import {connect} from 'dva'
import MainItem from "../components/main-item.jsx"
import Footer from '../components/footer.jsx'

const Main = ({dispatch, location: { pathname }, topics: {list, hasNext, curpage}}) => {
    const handleLoadMore = () => {
        dispatch({type: 'topics/query', payload: { page: curpage + 1, pathname }})
    }
    const lists = list.map(list => {
        return (
            <MainItem key={list._id} list={list} />
        )
    })
    const loadMore = hasNext ? <a onClick={handleLoadMore} href="javascript:;">加载更多</a> : <span>好厉害, 竟然翻到最后一页了...</span>
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

Main.propTypes = {}

function mapStateToProps({ topics }) {
    return { topics }
}

export default connect(mapStateToProps)(Main)
