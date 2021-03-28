/* 
  包含了n个接口请求的函数 函数返回的对象是promise
*/

import ajax from './ajax'

// 注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 登录接口
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')
// 更新用户信息接口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')