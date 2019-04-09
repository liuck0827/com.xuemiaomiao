/**
 * 注册页面相关的js
 */
(function(){
  "use strict";
  //手机格式
  const REG_PHONE = /^0?1[34578]\d{9}$/;
  //密码格式
  const REG_PWD = /^[a-zA-Z0-9]{6,16}$/;
  function checkAll(){
    var phone = $("input[name=phone]").val(),
        pwd = $("input[name=pwd]").val(),
        rePwd = $("input[name=rePwd]").val(),
        captcha = $("input[name=captcha]").val(),
        phone_code = $("input[name=phone_code]").val();
    var checkPhone = false,
        checkPwd = false,
        checkRePwd = false,
        checkCaptcha = false,
        checkPhoneCode = false;
    if(check_phone($("input[name=phone]"),phone)){
      checkPhone = true;
    }
    if(check_pwd($("input[name=pwd]"),pwd)){
      checkPwd = true;
    }
    if(check_rePwd($("input[name=rePwd]"),rePwd,pwd)){
      checkRePwd = true;
    }
    if(check_captcha($("input[name=captcha]"),captcha)){
      checkCaptcha = true;
    }
    if(check_phoneCode($("input[name=phone_code]"),phone_code)){
      checkPhoneCode = true;
    }
    //启用手机验证
    if(checkPhone && checkPwd && checkRePwd && checkCaptcha){
      $("a[data-togger=phone_code]").addClass("active");
    }else{
      $("a[data-togger=phone_code]").removeClass("active");
    }

    //启用注册按钮
    if(checkPhone && checkPwd && checkRePwd && checkCaptcha && checkPhoneCode){
      $("button").attr("disabled",false).addClass("active");
    }else{
      $("button").attr("disabled",true).removeClass("active");
    }
  }

  //提交表单
  $(".btn").click(function(){
    var obj = {};
    //验证表单元素不能为空
    for (let item of $("input[name]")) {     
      obj[item.name] = item.value;
      if(item.value==""){
        item.focus();
        return "";
      }      
    }
    //判断验证码的时间
    if($("a[data-togger=phone_code]").html().match("验证码")){
      //聚焦到手机验证输入框
      $("input[name=phone_code]").focus().val("");
      return "";
    }
    //发送请求，开始注册
    ajax({
      url:"./addUser.do",
      data:`phone=${obj.phone}&pwd=${obj.pwd}&rePwd=${obj.rePwd}&captcha=${obj.captcha}&phoneCode=${obj.phone_code}`,
      type: "post",
      dataType:"json"
    }).then((data)=>{
      //成功
      if(data.status==1){
        //隐藏注册栏
        $(".regist-box").css("display","none");
        $(".regist-success").css("display","block");
        $(".suc_phone").html(data.msg);
        //显示多少秒后继续购物
        simTimer({ele:$(".time"),count:5,time:1000}).then(function(id){
          clearInterval(id);
          location.href = "http://localhost:5050";
        });
      }
      if(data.status==0){

      }
    });
  });


  // 给输入框绑定失去焦点事件
  $("input[name]").blur(function(){
    checkAll();
  });


  //验证手机
  function check_phone(ele,value){
    if(value==""){
      return false;
    } 
    var flag = REG_PHONE.test(value)
    if(flag){
      //发送ajax请求
      ajax({
        url:"./getPhone.do",
        type:"get",
        dataType:"json",
        data:"phone="+value
      }).then(function(obj){
        if(obj.status==1){
          changeTipCss({ele,flag:false,fail_msg:obj.msg})
          return false;
        }else if(obj.status==0){
          changeTipCss({ele,flag,suc_msg:obj.msg});
        }
      });
    }else{
      changeTipCss({ele,flag,fail_msg:"请输入11位手机号"})
    }
    return flag;
  }
  //验证密码
  function check_pwd(ele,value){
    if(value==""){
      return false;
    }
    var flag = REG_PWD.test(value);
    changeTipCss({ele,flag,suc_msg:"密码正确",fail_msg:"请输入6-11位密码，只能包含[a-zA-Z_]"})
    return flag;
  }

  //验证确认密码
  function check_rePwd(ele,value,ori_value){
    if(value==""){
      return false;
    }
    var flag = value == ori_value;
    changeTipCss({ele,flag,suc_msg:"确认密码正确",fail_msg: "两次密码不一致"});
    return flag;
  }

  //验证图片验证码
  function check_captcha(ele,value){
    if(value==""){
      return false;
    }
    //获取缓存中的验证码
    var captcha = Utils.cookieToJson(document.cookie).captcha;
    var flag = value == captcha;
    changeTipCss({ele,flag,suc_msg:"验证码正确",fail_msg: "验证码与图片不符"});
    return flag;
  }

  //手机验证码
  function check_phoneCode(ele,value){
    if(value==""){
      return false;
    }
    //获取缓存中的验证码
    var phoneCode = Utils.cookieToJson(document.cookie).phoneCode;
    var flag = value == phoneCode;
    //获取phone_code的内容
    var $huoqu = $("a[data-togger=phone_code]").html();
    if(flag && $huoqu!="重新获取验证码" ){
      changeTipCss({ele,flag:true,suc_msg:"验证码正确"});
      return true;
    }else if(flag && $huoqu=="重新获取验证码" ){
      changeTipCss({ele,flag:false,fail_msg: "验证码已过期"});
    }else{
      changeTipCss({ele,flag:false,fail_msg: "验证码输入错误"});
    }
    return false;
  }
  /**
   * @description 该方法用于验证表单数据的格式后，显示信息的样式
   * @author kaikai
   * @date 2019-02-22
   * @param {obj} 
   *  { ele:表单对象,
   *    flag:验证格式后的结果,
   *    suc_msg:成功显示的信息,
   *    fail_msg:失败显示的信息,
   *    suc_color="green",
   *    fail_color="red"}
   * @returns 
   */
  function changeTipCss({ele,flag,suc_msg,fail_msg,suc_color="green",fail_color="red"}){
    //修改inupt成功或失败的样式
    ele.css("border-color", function () {
      return flag ? suc_color : fail_color;
    });
    //获取信息显示对象
    var $bro = ele.next();
    //修改颜色样式
    $bro.css("color", function () {
      return flag ? suc_color : fail_color;
    }).children().first().attr("class", "iconfont").addClass(function () {
      return flag ? "icon-form-true" : "icon-tishi";
    });
    $bro.children().last().html(function () {
      return flag ? suc_msg : fail_msg;
    });
  }

  //点击更换验证码
  // $("img[data-togger=changeCatch]").on("click",(e)=>{
  //   $(e.target).attr("src","./getCaptcha.do?"+Math.random());
  // })
  $("img[data-togger=changeCatch]").click(function(){
    $(this).attr("src","./getCaptcha.do?"+Math.random());
  });

  //获取手机验证码
  $("a[data-togger=phone_code]").click(function(){
    var $huoqu = $("a[data-togger=phone_code]").html();
    if($(this).hasClass("active")&& $huoqu.match("验证码")){
      //发送ajax请求
      ajax({url:"./phoneCode.do",type:"get"}).then(()=>{
        alert(Utils.cookieToJson(document.cookie).phoneCode);
        //请求成功之后，开始计时
        timer({ele:$(this),count:30,time:1000}).then((id)=>{
          clearInterval(id);
          $(this).html("重新获取验证码");
          var ele = $("input[name=phone_code]");
          changeTipCss({ele,flag:false,fail_msg:"验证码已过期"});
          //聚焦到手机验证输入框
          ele.focus().val("");
        });
      });
    }
  });

  //定义定时器
  function timer({ele,count,time}){
    ele.html(`剩余${count}秒`);
    return new Promise((end)=>{
      let id = setInterval(()=>{
        ele.html(`剩余${--count}秒`);
        if(count==0){
          end(id);
        }
      },time);
    })
  }

  function simTimer({ele,count,time}){
    ele.html(`${count}秒`);
    return new Promise((end)=>{
      let id = setInterval(()=>{
        ele.html(`${--count}秒`);
        if(count==0){
          end(id);
        }
      },time);
    })
  }


})()

