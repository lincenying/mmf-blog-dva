import React, {Component} from 'react'
import Toastr from '../components/_toastr.jsx'

import '../html/css/login.css'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember_me: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit() {

    }
    render() {
        return (
            <section className="container">
                <div className="login">
                    <h1>后台管理</h1>
                    <form onSubmit={this.handleSubmit} id="shake-setting" action="/api/" method="post">
                        <p><input type="text" id="username" name="username" placeholder="请输入用户名" /></p>
                        <p><input type="password" id="password" name="password" placeholder="请输入密码" /></p>
                        <p className="remember_me">
                            <label>
                                <input value="on" type="checkbox" id="remember_me" name="remember_me" />
                                保持登录
                            </label>
                        </p>
                        <p className="submit"><input type="submit" value="登录" /></p>
                    </form>
                </div>
                <Toastr />
            </section>
        )
    }
}
