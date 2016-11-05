import React from 'react'

const handleGoTop = () => {
    window.scrollTo(0, 0)
}
const handleGoBack = () => {
    window.history.go(-1)
}

const Arrow = () => {
    return (
        <div className="arrow">
            <a className="go-top" href="javascript:;" onClick={handleGoTop} />
            <a className="go-back" href="javascript:;" onClick={handleGoBack} />
        </div>
    )
}

Arrow.propTypes = {}

export default Arrow
