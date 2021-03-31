module.exports = function (server) {
  // 得到IO对象
  const io = require('socket.io')(server)

  // 监视客户端与服务器的连接，当有一个用户连接上时回调
  io.on('connection', function (socket) {
    console.log('socketio connected')

    // 绑定监听, 接收客户端发送的消息
    socket.on('sendMsg', function (data) {
      console.log('服务器接收到客户端发送的消息', data)
      // 处理数据
      data.name = data.name.toUpperCase()
      // 服务器向客户端发送消息
      // socket.emit('receiveMsg', data) // 发送给当前socket对应的客户端
      io.emit('receiveMsg', data) // 发送给所有连接上服务器的客户端
      console.log('服务器向客户端发送消息', data)
    })
  })
}