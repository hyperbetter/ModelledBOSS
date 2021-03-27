var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
// postman报错 提示找不到findOne这个属性 显然就是UserModel未定义
// const {UserModel} = require('../db/models')
// console.log(UserModel); // undefined
const UserModel = require('../db/models').UsreModel
// 查询时过滤出指定的属性（这样得到的数据就不会有password和__v了）
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


module.exports = router;