/**
 * 醉品商城程序文件的入口
 */
//引入文件
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser');

//构建应用
const app = express();

//托管静态文件
app.use('/public',express.static('./public'));

//注册模板引擎
app.engine('html',ejs.renderFile);
app.set('views', './views')
app.set('view engine', 'html');

//设置post请求解析
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(cookieParse());

//监听端口5050
app.listen(5050,()=>{
  console.log("http://localhost:5050");
})


/** 分模块开发*/
//主页面

app.use('/',require('./routers/index.js'));
//用户模块
app.use('/user',require('./routers/user.js'));
//商品详情模块
app.use('/product',require('./routers/product.js'));


