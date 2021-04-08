/*
  能发送ajax请求的函数模块 函数的返回值是promise对象
*/
import axios from 'axios'

export default function ajax(url, data={}, type='GET') { // 地址 请求参数 请求方法
  if(type==='GET') {
    // 拼接请求参数串
    let paramStr = ''
    // Object.keys(data) 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
    Object.keys(data).forEach(key => { // key可以理解成下标或属性名
      // username=admin&password=123456
      // key就是username data[key]就是admin password类似
      paramStr += key + '=' + data[key] + '&'
    })
    // 截去最后一个多余的&
    if(paramStr) {
      // substring(start,end) 方法用于 提取 字符串中介于两个指定下标之间的字符，包含start，不包含end(不是必须的)
      paramStr = paramStr.substring(0, paramStr.length-1)
    }
    // 使用axios发get请求
    return axios.get(url + '?' + paramStr)
  } else {
    // 使用axios发post请求
    return axios.post(url, data)
  }
}