import React, { Component } from 'react';
import {
  NavBar,
  WingBlank,
  Button,
  List,
  InputItem,
  WhiteSpace,
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'

class Login extends Component {
  state = {
    // 用户名、密码、确认密码、用户角色(dashen/laoban)
    username: '', 
    password: '',
  }

  login = () => {
    this.props.login(this.state)
  }

  toRegister= () => {
    this.props.history.replace('/register')
  }

  // 处理输入数据：更新对应的状态
  handleChange = (name , val) => {
    this.setState({
      // 属性名不是name，而是name的值
      // 如果不加中括号 就是name了
      [name]: val
    })
  }

  render() {
    const {msg, redirectTo} = this.props.user
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null}
            <WhiteSpace/>
            <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username' , val)}}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入密码' type='password' onChange={val => {this.handleChange('password' , val)}}>密&nbsp;&nbsp;&nbsp;码</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
            <Button onClick={this.toRegister}>没有账户？</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login);