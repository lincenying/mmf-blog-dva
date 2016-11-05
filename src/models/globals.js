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
        setMessage({ payload }, { put }) {
            let message = payload.message || {
                type: '',
                title: '',
                content: ''
            }
            if (typeof message === 'string') {
                message = {
                    type: 'success',
                    title: '',
                    content: message
                }
            }
            put({
                type: 'setMessageSuccess',
                payload: {
                    message
                }
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
        }
    },
}
