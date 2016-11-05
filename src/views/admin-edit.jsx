import React from 'react'
import {connect} from 'dva'

const Main = ({topics: {data}}) => {
    return (
        <div className="normal">
            <h1>Welcome to dva!</h1>
            <hr />
            <div dangerouslySetInnerHTML={{__html: data.content}} />
        </div>
    )
}

Main.propTypes = {}

function mapStateToProps({ topics }) {
    return { topics }
}

export default connect(mapStateToProps)(Main)
