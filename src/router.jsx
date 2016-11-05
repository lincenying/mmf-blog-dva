import React from 'react'
import {Router, Route, IndexRoute} from 'dva/router'

import cookies from 'js-cookie'
import ls from 'store2'

import NotFound from './views/404.jsx'
import App from './views/app.jsx'
import Main from './views/main.jsx'
import Article from './views/article.jsx'
import AdminArticleList from './views/admin-list.jsx'
import AdminArticlePost from './views/admin-post.jsx'
import AdminArticleEdit from './views/admin-edit.jsx'

const checkLogin = (nextState, replace, callback) => {
    var token = cookies.get('user')
    if (!token) {
        replace('/')
    }
    callback()
}
const savePosition = router => {
    const scrollTop = document.body.scrollTop
    const path = router.location.pathname
    if (path) {
        if (scrollTop) ls.set(path, scrollTop)
        if (ls.get(path) && !scrollTop) ls.remove(path)
    }
}
const goScrollTop = () => {
    window.scrollTo(0, 0)
}
export default({history}) => {
    return (
        <Router history={history}>
            <Route name="index" needLogin="0" path="/" component={App}>
                <IndexRoute component={Main} onLeave={savePosition} />
                <Route name="category" path="/category/:id" component={Main} onLeave={savePosition} />
                <Route name="search" path="/search/:qs" component={Main} onLeave={savePosition} />
                <Route name="article" path="/article/:id" component={Article} onEnter={goScrollTop} />
            </Route>
            <Route name="admin" needLogin="1" path="/admin" onEnter={checkLogin} component={App}>
                <Route name="list" path="/admin/list(/:page)" component={AdminArticleList} />
                <Route name="post" path="/admin/post" component={AdminArticlePost} />
                <Route name="post" path="/admin/edit/:id/:page" component={AdminArticleEdit} />
            </Route>
            <Route component={NotFound} path="*" />
        </Router>
    )
}
