import pathToRegexp from 'path-to-regexp'
import { article } from '../services/article'

export default {
    namespace: 'article',
    state: {
        data: {},
        next: {},
        prev: {},
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
                        payload: { id, pathname }
                    })
                }
            })
        },
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            const { pathname } = yield select(state => state.article)
            if (pathname !== payload.pathname ) {
                const { data } = yield call(article, payload)
                if (data) {
                    yield put({
                        type: 'querySuccess',
                        payload: {
                            data: data.data,
                            next: data.next,
                            prev: data.prev,
                            pathname: payload.pathname
                        }
                    })
                }
            }
        }
    },
    reducers: {
        querySuccess(state, action) {
            const { data, next, prev, pathname } = action.payload
            return {
                data,
                next,
                prev,
                pathname
            }
        }
    },
}
