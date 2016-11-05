import pathToRegexp from 'path-to-regexp'
import { topics } from '../services/topics'

export default {
    namespace: 'topics',
    state: {
        list: [],
        curpage: 1,
        pathname: '',
        hasNext: 0
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({pathname}) => {
                const category = pathToRegexp(`/category/:id`).exec(pathname)
                const search = pathToRegexp(`/search/:qs`).exec(pathname)
                let payload
                if (pathname === '/') {
                    payload = { page: 1, pathname }
                } else if (category) {
                    const id = category[1]
                    payload = { page: 1, pathname, id }
                } else if (search) {
                    const qs = search[1]
                    payload = { page: 1, pathname, qs }
                }
                if (payload) {
                    dispatch({
                        type: 'query',
                        payload
                    })
                }
            })
        },
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            const list = yield select(state => state.topics.list)
            const pathname = yield select(state => state.topics.pathname)
            if (!list.length || payload.page > 1 || pathname !== payload.pathname) {
                const { data } = yield call(topics, payload)
                if (data) {
                    yield put({
                        type: 'querySuccess',
                        payload: {
                            list: data.data.list,
                            hasNext: data.data.hasNext,
                            curpage: payload.page,
                            pathname: payload.pathname
                        }
                    })
                }
            }
        }
    },
    reducers: {
        querySuccess(state, action) {
            const { list, curpage, pathname, hasNext } = action.payload
            const lists = curpage === 1 ? [].concat(list) : state.list.concat(list)
            return {
                list: lists,
                curpage: curpage + 1,
                pathname,
                hasNext
            }
        }
    },
}
