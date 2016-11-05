import React from 'react'
import {Link, browserHistory} from 'dva/router'

const MenuFront = () => {
    const handleSearch = e => {
        var qs = e.target.value
        if (e.keyCode === 13 && qs !== '') {
            browserHistory.push('/search/'+qs)
        }
    }
    return (
        <div className="box menu">
            <div className="m-sch">
                <input onKeyUp={handleSearch} id="search_content" className="sch" type="text" name="q" placeholder="记得按回车哦" />
            </div>
            <div className="m-nav">
                <ul className="menuOpen">
                    <li className="tag-all"><Link activeClassName="v-link-active" to="/" onlyActiveOnIndex><i />All</Link></li>
                    <li className="tag-life"><Link activeClassName="v-link-active" to={`/category/1`}><i />Life</Link></li>
                    <li className="tag-study"><Link activeClassName="v-link-active" to={`/category/2`}><i />Study</Link></li>
                    <li className="tag-other"><Link activeClassName="v-link-active" to={`/category/3`}><i />Other</Link></li>
                </ul>
            </div>
        </div>
    )
}

MenuFront.propTypes = {}

export default MenuFront
