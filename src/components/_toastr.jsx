import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {ToastMessage, ToastContainer} from 'react-toastr'
import {propTypes} from '../decorators'
var ToastMessageFactory = React.createFactory(ToastMessage.animation)

function mapStateToProps(state) {
    return {
        message: state.globals.message
    }
}
@connect(mapStateToProps)
@propTypes({
    message: PropTypes.object
})
export default class Toastr extends Component {
    componentDidUpdate(prevProps) {
        const { message, dispatch } = this.props
        const oldMessage = prevProps.message
        if (message.type !== '' && oldMessage.type === '') {
            const toastrRefs = this.container
            toastrRefs[message.type](message.title, message.content, {
                timeOut: 3000
            })
            console.log(1)
            dispatch({type: 'globals/clearMessage'})
        }
    }
    render() {
        return (
            <ToastContainer ref={r => { this.container = r }} toastMessageFactory={ToastMessageFactory} className="toast-top-center" />
        )
    }
}
