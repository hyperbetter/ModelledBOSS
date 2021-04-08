/* 用户个人中心路由组件 */

import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {

  logout = () => {
    Modal.alert('退出', '确定退出登陆吗?', [
      {text: '取消'},
      {
        text: '确定',
        onPress: ()=> {
          // 干掉cookie中userid
          Cookies.remove('userid')
          // 干掉redux管理user
          this.props.resetUser()
        }
      }
    ])
  }

  updateInfo = () => {
    const {type} = this.props.user
    if(type==='laoban') {
      this.props.history.push('/laobaninfoupdate')
    } else {
      this.props.history.push('/dasheninfoupdate')
    }
    
  }

  render() {
    const {username, info, header, company, post, salary} = this.props.user
    return (
      <div style={{marginBottom:50, marginTop:50}}>
        <Result
          img={<img src={header ? require(`../../assets/images/${header}.png`) : require(`../../assets/images/头像0.png`)}
          style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />

        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {post}</Brief>
            <Brief>简介: {info}</Brief>
            {salary ? <Brief>薪资: {salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='primary' onClick={this.updateInfo}>修改个人信息</Button>
          <WhiteSpace/>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)