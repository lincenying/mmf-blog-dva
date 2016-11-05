import React from 'react'
import {Link} from 'dva/router'

const MenuAdmin = () => {
    return (
        <div className="box menu">
            <div className="m-nav">
                <ul className="menuOpen">
                    <li className="tag-all"><Link activeClassName="v-link-active" to="/" onlyActiveOnIndex><i />All</Link></li>
                    <li className="tag-life"><Link activeClassName="v-link-active" to={`/admin/list/1`}><i />List</Link></li>
                    <li className="tag-study"><Link activeClassName="v-link-active" to={`/admin/post`}><i />Post</Link></li>
                </ul>
            </div>
        </div>
    )
}

MenuAdmin.propTypes = {}

export default MenuAdmin
