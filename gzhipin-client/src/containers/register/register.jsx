import React, { Component } from 'react';
import {
  NavBar,
  WingBlank,
  Button,
  List,
  InputItem,
  WhiteSpace,
  Radio
} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'


const ListItem = List.Item

class Register extends Component {
  state = {
    // 用户名、密码、确认密码、用户角色(dashen/laoban)
    username: '', 
    password: '',
    password2: '',
    type: 'laoban'
  }

  register = () => {
    this.props.register(this.state)
  }

  toLogin = () => {
    this.props.history.replace('./login')
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
    const {type} = this.state
    const {msg, redirectTo} = this.props.user
    // 如果redirectTo有值，就需要重定向到指定的路由
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
            <InputItem placeholder='请输入确认密码' type='password' onChange={val => {this.handleChange('password2' , val)}}>确认密码</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户角色</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='dashen'} onChange={() => this.handleChange('type' , 'dashen')}>大神</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='laoban'} onChange={() => this.handleChange('type' , 'laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)