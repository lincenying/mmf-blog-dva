import {browserHistory} from 'dva/router'
import { login } from '../services/login'

export default {
    namespace: 'globals',
    state: {
        message: {
            type: '',
            content: ''
        }
    },
    subscriptions: {

    },
    effects: {
        *setMessage({ payload }, { put }) {
            let message = payload || {
                type: '',
                content: ''
            }
            if (typeof message === 'string') {
                message = {
                    type: 'success',
                    content: message
                }
            }
            yield put({
                type: 'setMessageSuccess',
                payload: message
            })
        },
        *login({payload}, {put, call}) {
            if (payload.username === '' || payload.password === '') {
                yield put({
                    type: 'setMessageSuccess',
                    payload: {
                        type: 'error',
                        content: '请输入用户名和密码'
                    }
                })
            } else {
                const {data} = yield call(login, payload)
                if (data.code === 200) {
                    yield put({
                        type: 'setMessageSuccess',
                        payload: {
                            type: 'success',
                            content: '登录成功'
                        }
                    })
                    setTimeout(() => {
                        browserHistory.push('/admin/list')
                    }, 1000)
                } else {
                    yield put({
                        type: 'setMessageSuccess',
                        payload: {
                            type: 'error',
                            content: data.message
                        }
                    })
                }
            }
        }
    },
    reducers: {
        setMessageSuccess(state, action) {
            return {
                ...state,
                message: {
                    ...state.message,
                    ...action.payload
                }
            }
        }
    },
}
