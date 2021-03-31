var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
// postman报错 提示找不到findOne这个属性 显然就是UserModel未定义
// const {UserModel, ChatModel} = require('../db/models')
// console.log(UserModel); // undefined
const models = require('../db/models')
const UserModel = models.UsreModel
const ChatModel = models.ChatModel

// 查询时过滤出指定的属性（这样前台得到的数据就不会有password和__v了）
const filter = {password:0, __v:0}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册register路由
router.post('/register', function(req, res) {
  // 读取请求参数数据
  const {username, password, type} = req.body
  // 判断用户是否已存在，如果存在返回提示错误的信息，反之保存
  // 查询（根据username）
  UserModel.findOne({username}, function(err, user) {
    if(user) {
      // code为1表示失败 0表示成功
      res.send({code:1, msg:'此用户已存在'})
    } else {
      new UserModel({username, type, password:md5(password)}).save(function (err ,user) {
        // 生成一个cookie(userid:user._id)，并交给浏览器保存
        // maxAge是cookie的生命周期，以毫秒为单位，当在该时间范围内，就不用重新登录
        res.cookie('userid', user._id, {maxAge:1000*60*60*24})
        // 返回包含user的json数据
        // 响应数据中不要携带password
        const data = {username, type, _id:user._id}
        res.send({code:0, data})
      })
    }
  })
})

// 登录login路由
router.post('/login', function (req, res) {
  const {username, password} = req.body
  // 根据username和password查询数据库users。如果没有找到，则返回提示错误信息，反之返回登录成功信息(包含user)
  UserModel.findOne({username, password:md5(password)}, filter, function (err, user) {
    if(user) {
      res.cookie('userid', user._id, {maxAge:1000*60*60*24})
      // 返回登录成功信息(包含user)
      res.send({code:0, data:user})
    } else {
      // 登录失败
      res.send({code:1, msg:'用户名或密码不正确！'})
    }
  })
})

// 更新用户信息的路由
router.post('/update', function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid
  // 如果不存在，直接返回一个提示信息
  if(!userid) {
    return res.send({code: 1, msg: '请先登陆'})
  }
  /* 
    存在，根据userid更新对应的user文档数据
    得到提交的用户数据
  */
  const user = req.body // 没有_id
  UserModel.findByIdAndUpdate({_id: userid}, user, function (error, oldUser) {
    if(!oldUser) {
      // 通知浏览器删除userid的cookie
      res.clearCookie('userid')
      // 返回一个提示信息
      res.send({code: 1, msg:'请先登陆'})
    } else {
      // 准备一个返回的user数据对象
      // assign用户合并多个对象，后面的对象会覆盖前面的
      const {_id, username, type} = oldUser
      const data = Object.assign({_id, username, type}, user)
      res.send({code: 0, data})
    }
  })
})

// 获取用户信息的路由(根据cookie中的userid)
router.get('/user', function(req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid
  // 如果不存在, 直接返回一个提示信息
  if(!userid) {
    return res.send({code: 1, msg: '请先登陆'})
  }
  // 根据userid查询对应的user
  UserModel.findOne({_id:userid}, filter, function(err, user) {
    if(user) {
      res.send({code:0, data:user})
    } else {
      // 通知浏览器删除userid cookie
      res.clearCookie('userid')
      res.send({code:1, msg:'请先登陆'})
    }
  })
})

// 获取用户列表（根据类型）
router.get('/userlist', function(req, res) {
  const {type} = req.query
  UserModel.find({type}, filter, function(err, users) {
    res.send({code:0, data:users})
  })
})

/*
获取当前用户所有相关聊天信息列表
 */
router.get('/msglist', function (req, res) {
  // 获取cookie中的userid
  const userid = req.cookies.userid
  // 查询得到所有user文档数组
  UserModel.find(function (err, userDocs) {
    // 用对象存储所有user信息: key为user的_id, val为name和header组成的user对象
    /*const users = {} // 对象容器
    userDocs.forEach(doc => { // doc就是user用户信息
      users[doc._id] = {username: doc.username, header: doc.header}
    })*/

    const users = userDocs.reduce((users, user) => {
      users[user._id] = {username: user.username, header: user.header}
      return users
    } , {})
    /*
    查询userid相关的所有聊天信息
      参数1: 查询条件
      参数2: 过滤条件
      参数3: 回调函数
    */
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
      // 返回包含所有用户和当前用户相关的所有聊天消息的数据
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})

/*
修改指定消息为已读
 */
router.post('/readmsg', function (req, res) {
  // 得到请求中的from和to
  const from = req.body.from
  const to = req.cookies.userid
  /*
  更新数据库中的chat数据
  参数1: 查询条件
  参数2: 更新为指定的数据对象
  参数3: 是否1次更新多条, 默认只更新一条
  参数4: 更新完成的回调函数
   */
  // 数据库默认只更新一条 {multi: true}可以同时更新多条数据
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified}) // 更新的数量
  })
})


module.exports = router;
