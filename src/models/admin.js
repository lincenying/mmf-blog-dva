import pathToRegexp from 'path-to-regexp'
import { posts, article, deletes, recovers } from '../services/admin'

export default {
    namespace: 'admin',
    state: {
        posts: {
            list: [],
            hasNext: 0,
            hasPrev: 0,
            page: 1,
            pathname: ''
        },
        article: {
            data: {},
            pathname: ''
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({pathname}) => {
                const list = pathToRegexp(`/admin/list/:page`).exec(pathname)
                const edit = pathToRegexp(`/admin/edit/:id/:page`).exec(pathname)
                if (list) {
                    const page = list[1]
                    dispatch({
                        type: 'postsQuery',
                        payload: { page, pathname }
                    })
                } else if (edit) {
                    const id = edit[1]
                    dispatch({
                        type: 'articleQuery',
                        payload: { id, pathname }
                    })
                }
            })
        }
    },
    effects: {
        *postsQuery({ payload }, { call, put, select }) {
            const { pathname } = yield select(state => state.admin.posts)
            if (pathname !== payload.pathname ) {
                const { data } = yield call(posts, payload)
                if (data) {
                    yield put({
                        type: 'postsQuerySuccess',
                        payload: {
                            ...data.data,
                            ...payload
                        }
                    })
                }
            }
        },
        *articleQuery({ payload }, { call, put, select }) {
            const { pathname } = yield select(state => state.admin.article)
            if (pathname !== payload.pathname ) {
                const { data } = yield call(article, payload)
                if (data) {
                    yield put({
                        type: 'articleQuerySuccess',
                        payload: {
                            ...data,
                            ...payload
                        }
                    })
                }
            }
        },
        *deleteQuery({ payload }, { call, put }) {
            const { data } = yield call(deletes, payload)
            if (data) {
                yield put({
                    type: 'deleteQuerySuccess',
                    payload: {
                        id: payload.id
                    }
                })
            }
        },
        *recoverQuery({ payload }, { call, put }) {
            const { data } = yield call(recovers, payload)
            if (data) {
                yield put({
                    type: 'recoverQuerySuccess',
                    payload: {
                        id: payload.id
                    }
                })
            }
        }
    },
    reducers: {
        postsQuerySuccess(state, action) {
            const { list, page, pathname, hasNext, hasPrev } = action.payload
            const lists = page === 1 ? [].concat(list) : state.posts.list.concat(list)
            return {
                ...state,
                posts: {
                    list: lists,
                    page,
                    pathname,
                    hasNext,
                    hasPrev
                }
            }
        },
        articleQuerySuccess(state, action) {
            const { data, pathname } = action.payload
            return {
                ...state,
                article: {
                    data, pathname
                }
            }
        },
        deleteQuerySuccess(state, action) {
            const { id } = action.payload
            const list = state.posts.list
            const obj = list.find(ii => id === ii._id)
            obj.is_delete = 1
            return {
                ...state,
                posts: {
                    ...state.posts,
                    list
                }
            }
        },
        recoverQuerySuccess(state, action) {
            const { id } = action.payload
            const list = state.posts.list
            const obj = list.find(ii => id === ii._id)
            obj.is_delete = 0
            return {
                ...state,
                posts: {
                    ...state.posts,
                    list
                }
            }
        }
    },
}
