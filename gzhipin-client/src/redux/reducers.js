import {combineReducers} from 'redux'
import {
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types'

const initUser = {
  username: '',
  type: '',
  msg: '', // 提示错误信息
  redirectTo: '' // 需要自动重定向的路由路径
}

// 产生user状态的reducer
function user (state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...action.data, redirectTo: '/' }
    case ERROR_MSG:
      return {...state, msg: action.data}
    default:
      return state
  }
}

export default combineReducers({
  user
})