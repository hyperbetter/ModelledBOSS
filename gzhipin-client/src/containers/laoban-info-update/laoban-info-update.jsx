/* 老板主界面路由容器组件 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button, Icon} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

class LaobanInfoUpdate extends Component {
  state = {
    header: '',
    post: '',
    info: '',
    company: '',
    salary: ''
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
    
    return (
      <div>
        <NavBar icon={<Icon type='left'/>} onLeftClick={()=> this.props.history.goBack()}>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem onChange={val => {this.handleChange('post', val)}}>招牌岗位：</InputItem>
        <InputItem onChange={val => {this.handleChange('company', val)}}>公司名称：</InputItem>
        <InputItem onChange={val => {this.handleChange('salary', val)}}>职位薪资：</InputItem>
        <TextareaItem title='职位要求' rows={3} onChange={val => {this.handleChange('info', val)}}/>
        <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(LaobanInfoUpdate)