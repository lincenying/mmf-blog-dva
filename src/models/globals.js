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
