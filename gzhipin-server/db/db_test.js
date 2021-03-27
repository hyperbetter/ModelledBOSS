// 加密函数
const md5 = require('blueimp-md5')

/* 1.连接数据库 */
// 1.1 引入mongoose
const mongoose = require('mongoose')
// 1.2 连接指定数据库(URL只有数据库是变化的) gzhipin_test是数据库名
mongoose.connect('mongodb://localhost:27017/gzhipin_test')
// 1.3 获取连接对象
const conn = mongoose.connection
// 1.4 绑定连接完成的监听(用来提示连接成功)
// 连接成功回调
conn.on('connected' , function () {
  console.log('数据库连接成功！！！');
})

/* 2.得到对应特定集合(相当于表)的Model 文档(相当于一条数据) */
// 2.1 定义Schema(约束，描述文档结构)
// 指定文档的结构：属性名/属性值的类型，是否是必须的，默认值
const userSchema = mongoose.Schema({
  username:{type:String,required:true},
  password:{type:String,required:true},
  type:{type:String,required:true},
  // 头像 不是必须的
  header:{type:String}
})

// 2.2 定义Model(与集合对应，可以操作集合 构造函数)
// 集合的名称为users
const UserModel = mongoose.model('user' , userSchema)

/* 3.通过Model或其实例对象对集合数据进行CRUD操作 */
// 3.1 通过Model实例的save()添加数据
function testSave () {
  // 创建UserModel的实例
  const userModel = new UserModel({
    username:'Tom',password:md5('123'),type:'dashen'
  })
  // 调用save()保存
  // user为返回的文档对象 err如果为null，说明添加成功
  userModel.save(function (err , user) {
    console.log('save' , err , user);
  })
}
// testSave()
// 3.2 通过Model的find()/findOne()查询多个或一个数据
function testFind() {
  // 查询多个：得到的是包含所有匹配文档对象的数组，如果没有匹配的就是[]
  // 如果不指定_id，则查询所有
  UserModel.find({_id:'605c8e89d6c97b375cbfcf41'} , function (err , users) {
    console.log('find()' , err , users);
  })
  // 查询一个：得到的是匹配的文档对象，如果没有匹配则返回null
  UserModel.findOne({_id:'605c8e89d6c97b375cbfcf41'} , function (err , user) {
    console.log('findOne()' , err , user);
  })
}
// testFind()
// 3.3 通过Model的findByIdAndUpdate()更新某个数据
// 返回一个已删除的对象
function testUpdate() {  
  UserModel.findByIdAndUpdate({_id:'605c8e89d6c97b375cbfcf41'}, {username:'Jack'}, function (err, oldUser) {
    console.log('findByIdAndUpdate()', err, oldUser);
  })
}
// testUpdate()
// 3.4 通过Model的remove()删除匹配的数据
// { ok: 1, n: 1/0, deletedCount: 1/0 } n代表删除的数据条数
function testDelete() {
  UserModel.remove({_id:'605c94158f920737e831c2fe'}, function (err, doc) {
    console.log('remove', err, doc);
  })
}
testDelete() 
