import React, {Component} from 'react'
import {connect} from 'dva'
import {browserHistory} from 'dva/router'
import { login } from '../services/login'
import toastr from '../utils/toastr'

import '../assets/css/login.css'

@connect()
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember_me: 'on'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        const id = e.target.id,
            value = e.target.value
        const state = this.state
        state[id] = value
        this.setState(state)
    }
    handleSubmit(e) {
        e.preventDefault()
        const {username, password} = this.state
        if (username === '' || password === '') {
            toastr('请输入用户密和密码', 'error')
            return
        }
        login({
            ...this.state
        }).then(({data}) => {
            if (data.code === 200) {
                toastr('登录成功')
                setTimeout( () => {
                    browserHistory.push('/admin/list/1')
                }, 500)
            } else {
                toastr(data.message, 'error')
            }
        })
    }
    render() {
        return (
            <section className="container">
                <div className="login">
                    <h1>后台管理</h1>
                    <form onSubmit={this.handleSubmit} id="shake-setting" action="/api/" method="post">
                        <p><input value={this.state.username} onChange={this.handleChange} type="text" id="username" name="username" placeholder="请输入用户名" /></p>
                        <p><input value={this.state.password} onChange={this.handleChange} type="password" id="password" name="password" placeholder="请输入密码" /></p>
                        <p className="remember_me">
                            <label>
                                <input value={this.state.remember_me} onChange={this.handleChange} type="checkbox" id="remember_me" name="remember_me" />
                                保持登录
                            </label>
                        </p>
                        <p className="submit"><input type="submit" value="登录" /></p>
                    </form>
                </div>
            </section>
        )
    }
}
export default Login
