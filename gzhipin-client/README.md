1. 下载蚂蚁金服移动端组件库
  npm i antd-mobile --save
2. 更改index.html的meta信息为兼容移动端的
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
3. 解决点击延迟0.3秒的问题，在index.html中引入fastclick.js
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
4. 实现组件的按需打包
1）下载依赖模块
  npm install babel-plugin-import@1.7.0 react-app-rewired@1.5.2 -D
2）定义加载配置的js模块：config-overrides.js（当前目录新建）
  const {injectBabelPlugin} = require('react-app-rewired'); 
  module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', {libraryName: 'antd-mobile', style: 'css'}], config);
    return config;
  }
* 修改配置：package.json
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
  }

5. 自定义主题（比如修改颜色）
1）下载依赖模块（要重新打包less）
  npm install less@2.7.3 less-loader@5.0.0 -D
2）重新配置config-overrides.js（覆盖之前的 见pdf）
3）如果要自定义其他颜色，可以在config-overrides.js中modifyVars的修改
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
4）需要注意的是 之后写样式的时候需要用less去写，否则你还需要下载css-loader等

6. 引入路由
  npm i --save react-router-dom@4.2.2
将Main.jsx设置为默认组件(即不为其设置path，而register.jsx和login.jsx要设置)

7. 引入redux
  npm i --save redux@3.7.2 react-redux@5.0.7 redux-thunk@2.2.0
  npm i --save-dev redux-devtools-extension@2.13.2
8. 注册、登录前台处理 --client
  npm i axios@0.18.0 --save
