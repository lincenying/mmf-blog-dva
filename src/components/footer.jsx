import React from 'react'
import {Link} from 'dva/router'

const Example = () => {
    return (
        <div className="g-ft">
            <span className="copy"><span title="Copyright">©</span> <Link to="index">M·M·F 小屋</Link> 2016.06</span>
            <span className="beian"><i /> <a target="_blank" rel="noopener noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=00000000000000">浙公网安备 00000000000000号</a></span>
        </div>
    )
}

Example.propTypes = {}

export default Example
