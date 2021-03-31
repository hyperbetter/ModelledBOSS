/* 包含多个操作数据库集合数据的Model模块 */
/* 1.连接数据库 */
// 1.1 引入mongoose
const mongoose = require('mongoose')
// 1.2 连接指定数据库
mongoose.connect('mongodb://localhost:27017/gzhipin')
// 1.3 获取连接对象
const conn = mongoose.connection
// 1.4 绑定连接完成的监听
conn.on('connected' , () => {
  console.log('db connect success!');
})

/* 2.定义出对应特定集合的Model并向外暴露 */
// 2.1 定义Schema
const userSchema = mongoose.Schema({
  username:{type:String, required:true},
  password:{type:String, required:true},
  // 用户类型 dashen/laoban
  type:{type:String, required:true},
  // 头像名称
  header:{type:String},
  // 职位
  post:{type:String},
  // 个人或职位简介
  info:{type:String},
  // 公司名称
  company:{type:String},
  // 工资
  salary:{type:String}
})
// 2.2 定义Model
const UsreModel = mongoose.model('user' , userSchema)
// 2.3 向外暴露Model
exports.UsreModel = UsreModel

// 定义chats集合的文档结构
const chatSchema = mongoose.Schema({
  from: {type: String, required: true}, // 发送用户的id
  to: {type: String, required: true}, // 接收用户的id
  chat_id: {type: String, required: true}, // from和to组成的字符串
  content: {type: String, required: true}, // 内容
  read: {type:Boolean, default: false}, // 标识是否已读
  create_time: {type: Number} // 创建时间
})
// 定义能操作chats集合数据的Model
const ChatModel = mongoose.model('chat', chatSchema) // 集合为: chats
// 向外暴露Model
exports.ChatModel = ChatModel