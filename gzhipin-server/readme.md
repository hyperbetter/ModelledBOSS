0. 详细了解:https://blog.csdn.net/weixin_42780928/article/details/109445145
1. 搭建框架
  npx express-generator
  npm install
2. 如果需要修改框架的端口，去./bin/www中修改
3. 框架默认使用的视图引擎是 jade ，对应的文件是.jade的，更推荐使用 ejs的视图引擎
  安装 ejs： npm install ejs
  修改app.js的视图引擎部分
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    // app.set('view engine', 'jade');
    
    var ejs = require('ejs');  //引入的ejs插件
    app.engine('html', ejs.__express);
    app.set('view engine', 'html');
4. 接下来可以在views文件夹中添加html文件
5. 修改路由配置
6. 用nodemon代替npm运行
7. 使用mongoose操作数据库
  下载依赖包blueimp-md5（将明文密码转化为密文保存）
  npm i mongoose@5.0.16 blueimp-md5 --save
8. 注册、登录后台处理（连接数据库、创建路由、接口测试）--server
9. 注册、登录前台处理 --client
  npm i axios@0.18.0 --save