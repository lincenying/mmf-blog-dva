import pathToRegexp from 'path-to-regexp'
import { comment, postComment } from '../services/comment'

export default {
    namespace: 'comment',
    state: {
        list: [],
        hasNext: 0,
        page: 1,
        pathname: ''
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({pathname}) => {
                const match = pathToRegexp(`/article/:id`).exec(pathname)
                if (match) {
                    const id = match[1]
                    dispatch({
                        type: 'query',
                        payload: { id, pathname, page: 1 }
                    })
                }
            })
        },
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            const { pathname, page } = yield select(state => state.comment)
            if (pathname !== payload.pathname ) {
                const { data } = yield call(comment, payload)
                if (data) {
                    yield put({
                        type: 'querySuccess',
                        payload: {
                            list: data.data.list,
                            hasNext: data.data.hasNext,
                            page,
                            pathname: payload.pathname
                        }
                    })
                }
            }
        },
        *postComment({ payload }, { call, put }) {
            if (payload.content === '') {
                yield put({
                    type: 'globals/setMessage',
                    payload: {
                        type: 'error',
                        content: '请输入评论内容'
                    }
                })
            } else {
                const { data } = yield call(postComment, payload)
                if (data) {
                    yield put({
                        type: 'postSuccess',
                        payload: {
                            list: [data.data]
                        }
                    })
                    yield put({
                        type: 'globals/setMessage',
                        payload: '评论发表成功'
                    })
                }
            }
        }
    },
    reducers: {
        querySuccess(state, action) {
            const { list, hasNext, page, pathname } = action.payload
            const lists = page === 1 ? [].concat(list) : state.list.concat(list)
            return {
                list: lists,
                hasNext,
                page: page + 1,
                pathname
            }
        },
        postSuccess(state, action) {
            const { list } = action.payload
            const lists = list.concat(state.list)
            return {
                ...state,
                list: lists
            }
        }
    },
}
