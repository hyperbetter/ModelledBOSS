const {ChatModel} = require('../db/models')
module.exports = function (server) {
  const io = require('socket.io')(server)

  // 监视客户端与服务器的连接
  io.on('connection', function (socket) {
    console.log('有一个客户端连接上了服务器')

    // 绑定监听, 接收客户端发送的消息
    socket.on('sendMsg', function ({from, to, content}) {
      console.log('服务器接收到客户端发送的消息', {from, to, content})
      // 处理数据(保存消息)
      // 准备chatMsg对象的相关数据
      const chat_id = [from, to].sort().join('_')// (进行排序可以保证得到的字符串相同，无论是from_to还是to_from)
      const create_time = Date.now()
      new ChatModel({from, to, content, chat_id, create_time}).save(function (error, chatMsg) {
        // 向所有连接上的客户端发消息（弊端：包括那些不是目标的用户，只不过没有显示在页面上而已）
        io.emit('receiveMsg', chatMsg)
      })
    })
  })
}