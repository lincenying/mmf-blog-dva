export default {
    namespace: 'globals',
    state: {
        message: {
            type: '',
            content: '',
            title: ''
        }
    },
    subscriptions: {

    },
    effects: {
        *setMessage({ payload }, { put }) {
            let message = payload.message
            if (typeof message === 'string') {
                message = {
                    type: 'success',
                    title: '',
                    content: message
                }
            }
            yield put({
                type: 'setMessageSuccess',
                payload: {
                    message
                }
            })
        },
        *clearMessage({ payload }, { put }) {
            yield put({
                type: 'clearMessageSuccess',
                payload: {}
            })
        }
    },
    reducers: {
        setMessageSuccess(state, action) {
            const { message } = action.payload
            return {
                ...state,
                message: {
                    ...message
                }
            }
        },
        clearMessageSuccess() {
            return {
                message: {
                    type: '',
                    content: '',
                    title: ''
                }
            }
        }
    },
}
