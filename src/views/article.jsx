import React from 'react'
import {connect} from 'dva'
import {Link} from 'dva/router'

import Comment from './comment.jsx'
import Footer from '../components/footer.jsx'

const Article = ({article, location: { pathname }, params: { id }}) => {
    const prev = article.prev.prev_id ? <Link to={`/article/${article.prev.prev_id}`} className="prev">上一篇</Link> : <span className="prev">上一篇</span>
    const next = article.next.next_id ? <Link to={`/article/${article.next.next_id}`} className="next">下一篇</Link> : <span className="next">下一篇</span>
    return (
        <div className="g-mn">
            <div className="posts">
                <div className="m-post box article">
                    <a href="javascript:;" className="w-icon w-icon-1">&nbsp;</a>
                    <a href="javascript:;" className="w-icon2">&nbsp;</a>
                    <div className="info">
                        <a href="javascript:;">{article.data.creat_date}</a>
                        <a href="javascript:;">浏览: {article.data.visit}</a>
                        <a href="javascript:;" className="comnum">{article.data.comment_count}</a>
                    </div>
                    <div className="cont cont-1">
                        <div className="text">
                            <h2><Link to={`/article/${article.data._id}`}>{article.data.title}</Link></h2>
                            <div className="markdown-body" dangerouslySetInnerHTML={{__html: article.data.content}} />
                        </div>
                    </div>
                    <div className="info info-1" />
                </div>
            </div>
            <div className="box m-page box-do">
                <div className="w-icon w-icon-2" />
                <div className="w-icon w-icon-3" />
                {prev}
                {next}
            </div>
            <Comment pathname={pathname} id={id} />
            <Footer />
        </div>
    )
}

Article.propTypes = {
    article: React.PropTypes.object
}

function mapStateToProps({ article }) {
    return { article }
}

export default connect(mapStateToProps)(Article)
