/* 大神主界面路由容器组件 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {NavBar, InputItem, Button, TextareaItem, Icon} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

class DashenInfo extends Component {
  state = {
    header: '',
    post: '',
    info: ''
  }
  // 更新header状态
  setHeader = (header) => {
    this.setState({header})
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  save = () => {
    this.props.updateUser(this.state)
    const {header, type} = this.props.user
    if(header) {
      const path = type==='dashen' ? '/dashen' : '/laoban'
      this.props.history.replace(path)
    }
  }

  render() {
    // 如果信息已经完善, 自动重定向到对应主界面
    /* const {header, type} = this.props.user
    if(header) { // 说明信息已经完善
      const path = type==='dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path}/>
    } */
    return (
      <div>
        <NavBar icon={<Icon type='left'/>} onLeftClick={() => this.props.history.goBack()}>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem onChange={val => {this.handleChange('post', val)}}>求职岗位：</InputItem>
        <TextareaItem title="个人介绍:" onChange={val => {this.handleChange('info', val)}}>个人介绍：</TextareaItem>
        <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(DashenInfo)