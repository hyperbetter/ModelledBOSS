1. 下载蚂蚁金服移动端组件库
  npm i antd-mobile --save
2. 更改index.html的meta信息为兼容移动端的
```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
```
3. 解决点击延迟0.3秒的问题，在index.html中引入fastclick.js
```
<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
<script>
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body); 
    }, false);
  }
  if(!window.Promise) {
    document.writeln('<scriptsrc="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js" '+'>'+'<'+'/'+'script>');
  }
</script>
```
4. 实现组件的按需打包
1）下载依赖模块
```
  npm install babel-plugin-import@1.7.0 react-app-rewired@1.5.2 -D
```
2）定义加载配置的js模块：config-overrides.js（当前目录新建）
```
  const {injectBabelPlugin} = require('react-app-rewired'); 
  module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', {libraryName: 'antd-mobile', style: 'css'}], config);
    return config;
  }
```
* 修改配置：package.json
```
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
  }
```
5. 自定义主题（比如修改颜色）
* 下载依赖模块（要重新打包less）
```
  npm install less@2.7.3 less-loader@5.0.0 -D
```
* 重新配置config-overrides.js（覆盖之前的 见pdf）
* 如果要自定义其他颜色，可以在config-overrides.js中modifyVars的修改
```
  {
    loader: require.resolve('less-loader'),
    options: {
      // theme vars, also can use theme.js instead of this.
      modifyVars: {
        "@brand-primary": "#1cae82", // 正常
        "@brand-primary-tap": "#1DA57A", // 按下
      },
    },
  }
```
4）需要注意的是 之后写样式的时候需要用less去写，否则你还需要下载css-loader等

6. 引入路由
```
  npm i --save react-router-dom@4.2.2
```
将main.jsx设置为默认组件(即不为其设置path，而register.jsx和login.jsx要设置)

7. 引入redux
```
  npm i --save redux@3.7.2 react-redux@5.0.7 redux-thunk@2.2.0
  npm i --save-dev redux-devtools-extension@2.13.2
```
8. 注册、登录前台处理 --client
  npm i axios@0.18.0 --save

9. 用代理来处理跨域的问题（3000端口到4000端口）
在package.json中添加如下配置：
```
  "proxy": "http://localhost:4000"         
```
代理将3000端口的请求转发给了4000端口，又将4000端口的响应数据返回给了3000端口

10. 其他
* 在actions.js中使用dispatch(action)方法，它可以触发reducers的调用
* react-redux：UI组件和容器组件：
  Provider：让所有组件都可以得到state数据
  connect(用于包装 UI 组件生成容器组件)

11. 引入图片(webpack打包不仅支持ES6，还支持commonjs)
  require(`./images/头像${i+1}.png`)

12. 操作前端的cookie
npm i --save js-cookie

13. 退出登录
  使用Modal来调出提示框信息

14. 不足的地方：如果用户存在没有信息完善的情况 可能会报错（报找不到图片的错误）
```javascript
  <Header thumb={require(`../../assets/images/${user.header}.png`)} extra={user.username}/>
```
修改之后就不会报错了
```javascript
// 原来用户没有完善头像 则自动使用默认头像0
  {user.header ? <Header thumb={require(`../../assets/images/${user.header}.png`)} extra={user.username}/> : <Header thumb={require(`../../assets/images/头像0.png`)}  extra={user.username}/>}
```

15. 前台和后台都需要下载socket.io
  npm i socket.io@2.1.0 --save
* socket.io 是一个能实现多人远程实时通信(聊天)的库
* 它包装的是H5 WebSocket 和轮询, 如果是较新的浏览器内部使用WebSocket，如果浏览器不支持, 那内部就会使用轮询实现实时通信
* 包含2个包:
    socket.io: 用于服务器端
    socket.io-client: 用于客户端
* 基本思想: 远程自定义事件机制
  on(name, function(data){}): 绑定监听
  emit(name, data): 发送消息
* io: 服务器端核心的管理对象
  socket: 客户端与服务器的连接对象
* 在服务器端的./bin/www 中需要引入
  require('../socketIO/test')(server)

16. 添加聊天的页面的动画效果
npm i rc-queue-anim@1.5.0 --save
