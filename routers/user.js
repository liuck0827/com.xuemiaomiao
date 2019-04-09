/**用户模块 */
const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');
const pool = require('../database/pool');
/** ===========登录功能===========*/
//请求登录页面
router.get('/login.html',(req,res)=>{
  res.render('login');
})

//登录功能 账户登录  /loginByAcount.do
router.post('/loginByAcount.do',(req,res)=>{
  var $acount = req.body.acount;
  var $pwd = req.body.pwd;
  pool.query('SELECT * FROM zp_user WHERE phone = ? or email = ?',[$acount,$acount],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({status:"0",msg:"该用户不存在"})
    }else{
      //验证密码
      if($pwd == result[0].upwd){
        res.send({status:"1",msg:"登录成功"});
      }else{
        res.send({status:"0",msg:"密码不正确"});
      }
    }
  }) 
});

//登录功能 手机登录  /loginByPhone.do
router.post('/loginByPhone.do',(req,res)=>{
  var $phone = req.body.phone;
  var $captcha = req.body.captcha;
  var $phoneCode = req.body.phoneCode;
  pool.query('SELECT * FROM zp_user WHERE phone = ?',[$phone],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({status:"0",msg:"该用户不存在"})
    }else{
      res.send({status:"1",msg:"登录成功"});
    }
  }) 
});

//请求注册页面
router.get('/register.html',(req,res)=>{
  res.render('register');
})

// 获取验证码
router.get('/getCaptcha.do',(req,res)=>{
  var captcha = svgCaptcha.create({ 
    inverse: false, // 翻转颜色 
    fontSize: 48, // 字体大小 
    noise: 2, // 噪声线条数 
    width: 100, // 宽度 
    height: 40, // 高度 
    size: 4,// 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
  }); 
  // 保存到session,忽略大小写 
  req.session = captcha.text.toLowerCase(); 
  //保存到cookie 方便前端调用验证
  res.cookie('captcha', req.session); 
  res.setHeader('Content-Type', 'image/svg+xml');
  res.write(String(captcha.data));
  res.end();
});

//获取手机验证码
router.get('/phoneCode.do',(req,res)=>{
  //随机生成4个0-9数字
  var code = "";
  for (let index = 0; index < 4; index++) {
    code += parseInt(Math.random()*10);   
  }
  //保存到session
  req.session = code;
  res.cookie('phoneCode', code);
  res.send(code);
  res.end();
});

//验证电话是否存在
router.get('/getPhone.do',(req,res)=>{
  //获取请求参数
  var phone = req.query.phone;
  //查询数据库
  pool.query('SELECT * FROM zp_user WHERE phone = ?',[phone],(err,result)=>{
    if(err) throw err;
    if(result.length==1){
      res.send({status:"1",msg:"该用户已注册"});
    }else{
      res.send({status:"0",msg:"该用户可以使用"});
    }
  })
});

//注册用户
router.post('/addUser.do',(req,res)=>{
  //获取参数对象
  var $phone = req.body.phone;
  var $pwd = req.body.pwd;
  var $captcha = req.body.captcha;
  var $phoneCode = req.body.phoneCode;
  //随机生成一个8位的用户名
  var uname = "";
  for (let index = 0; index < 8; index++) {
    uname+= parseInt(Math.random()*9);
  }
  //加入数据库
  pool.query('INSERT INTO zp_user VALUES(?,?,?,?,?,?,?,?)',[null,uname,$pwd,null,$phone,null,null,null],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows==1){
      res.send({status:"1",msg:$phone});
    }else{
      res.send({status:"0",msg:"系统繁忙，稍微再试"});
    }
  });

});

module.exports = router;