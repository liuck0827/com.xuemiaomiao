/**
 * 登录 相关的js
 */
(function(){
  "use strict";
  //绑定失去焦点事件
  $(".login-method>li:first-child>input").blur(function(){
   
    checkAll_acount();
  });




  //登录功能
  $(".btn").click(function(){
    if($(".login-type>li").first().hasClass("on")){
      var $acount = $("#phoneOrEmail").val();
      var $pwd = $("#pwd").val();
      if($acount=="" || $pwd==""){
        return "";
      }
      $(".login-tips").css("display","none");
      var $li = $(".login-type>li.on>a").html();
      if($li == "账号登录"){
        ajax({
          url:"./loginByAcount.do",
          data:`acount=${$acount}&pwd=${$pwd}`,
          type:"post",
          dataType:"json"
        }).then(function(data){
          if(data.status==1){
            location.href = "http://localhost:5050";
          }else{
            $(".login-tips").css("display","block").children("span").html(data.msg);
          }
        });
      }
    }

    if($(".login-type>li").last().hasClass("on")){
      var $phone = $("input[name=phone]").val();
      var $captcha= $("input[name=captcha]").val();
      var $phoneCode= $("input[name=phoneCode]").val();
      if($("#msg").html().match("验证码")){
        $(".login-method").next().css("display","block").children().last().html("验证码已过期，请重新获取");
        $("input[name=phoneCode]").focus().val("");
      }else{
        ajax({
          url:"./loginByPhone.do",
          data:`phone=${$phone}&captcha=${$captcha}&phoneCode=${$phoneCode}`,
          type:"post",
          dataType:"json"
        }).then(function(data){
          if(data.status==1){
            location.href = "http://localhost:5050";
          }else{
            $(".login-tips").css("display","block").children("span").html(data.msg);
          }
        });
      }
    }



    
  });

  //点击登录方式，切换选择
  $(".login-type").on("click","li",function(){
    $(this).addClass("on").siblings().removeClass("on");
    $(".login-method>li").removeClass("active");
    if($(this).children().html()=="账号登录"){
      $(".login-method>li").first().addClass("active");
      checkAll_acount();
    }
    if($(this).children().html()=="短信登录"){
      $(".login-method>li").last().addClass("active");
      checkAll_message();
    }
    
  });

  //更换验证码
  $("img[data-togger=getCaptcha]").click(function(){
    $(this).prop("src","./getCaptcha.do?"+Math.random());
  });

  //验证用户输入框
  function vali_phoneOrEmail(ele,tip){
    //获取输入框内容
    var data = ele.val();
    //电话格式
    var phone = /^0?1[34578]\d{9}$/;
    var email = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
    var flag = phone.test(data) || email.test(data);
    if(data==""){
      return false;
    }
    //不满足格式要求
    if(!flag){
      //显示错误信息
      tip.css("display","block").children().last().html("用户名格式不正确");
      return false;
    }
    tip.css("display","none");
    return flag;
  }

  //验证密码框格式
  function vali_pwd(ele,tip){
    var data = ele.val();
    if(data==""){
      return false;
    }
    if(data.length<6){
      tip.css("display","block").children().last().html("密码长度不能小于6位");
      return false;
    }
    tip.css("display","none");
    return true;

  }

  //验证phone
  function vali_phone(ele,tip){
    //获取输入框内容
    var data = ele.val();
    //电话格式
    var phone = /^0?1[34578]\d{9}$/;
    var flag = phone.test(data);
    if(data==""){
      return false;
    }
    //不满足格式要求
    if(!flag){
      //显示错误信息
      tip.css("display","block").children().last().html("您输入的账号格式有误，请核实后重新输入");
      return false;
    }
    tip.css("display","none");
    return flag;
  }

 //验证验证码
 function vali_captcha(ele,tip){
  if(ele.val()==""){
    return false;
  }
  //获取缓存中的验证码
  var captcha = Utils.cookieToJson(document.cookie).captcha;
  var flag = ele.val() == captcha;
  if(!flag){
    tip.css("display","block").children().last().html("请输入正确的图片验证码!");
      return false;
  }
  return true;
 }

 //验证手机验证码
 function vali_phoneCode(ele,tip){
  if(ele.val()==""){
    return false;
  }
  //获取缓存中的验证码
  var phoneCode = Utils.cookieToJson(document.cookie).phoneCode;
  var flag = ele.val() == phoneCode;
  if(!flag){
    tip.css("display","block").children().last().html("您输入的短信验证码错误，请核对后重新输入");
      return false;
  }
  return true;
 }
 
 function checkAll_acount(){
   var $phoneOrEmail = $("#phoneOrEmail"),
       $pwd = $("#pwd"),
       $tip = $(".login-tips");
   var check_phoneOrEmail = false,
       check_pwd = false;       
   if(vali_phoneOrEmail($phoneOrEmail,$tip)){
     check_phoneOrEmail = true;
   } 
   if(vali_pwd($pwd,$tip)){
     check_pwd = true;
   }      
   if(check_pwd && check_phoneOrEmail){
     $(".btn").prop("disabled",false).addClass("show");
   }else{
     $(".btn").prop("disabled",true).removeClass("show");
   }
 }
 function checkAll_message(){
   var $phone = $("input[name=phone]"),
       $captcha = $("input[name=captcha]"),
       $phoneCode = $("input[name=phoneCode]"),
       $tip = $(".login-tips");
   var check_phone = false,
       check_captcha = false,      
       check_phoneCode = false;       
   if(vali_phone($phone,$tip)){
     check_phone = true;
   } 
   if(vali_captcha($captcha,$tip)){
     check_captcha = true;
   }      
   if(vali_phoneCode($phoneCode,$tip)){
      check_phoneCode = true;
   } 
   //启用短信验证
   if(check_phone && check_captcha){
    $("#msg").addClass("show")
   }else{
    $("#msg").removeClass("show")
   }

   //启用登录按钮
   if(check_phone && check_captcha && check_phoneCode){
     $(".btn").prop("disabled",false).addClass("show");
   }else{
     $(".btn").prop("disabled",true).removeClass("show");
   } 
 }

 $(".login-method>li:last-child>input").blur(function(){
   checkAll_message();
   if(!$("#msg").html().match("验证码")){
    $("#msg").removeClass("show");
   }
    if($(this).is("input[name=phoneCode]")){
      if($(this).val()=="" && $(this).next().html().match("验证码")){
        $(this).next().addClass("show");
      }
    }



  //  if($(this).next().hasClass("show")){
  //    if($(this).val() !="" ){
       
  //    }
  //  }
 });

 //获取手机验证码
 $("a[class=phone-check]").click(function(){
   if($(this).hasClass("show")){
    ajax({url:"./phoneCode.do",type:"get"}).then(()=>{
      alert(Utils.cookieToJson(document.cookie).phoneCode);
      $(this).removeClass("show");
      timer({ele:$(this),count:60,time:1000}).then((id)=>{
        clearInterval(id);
        $(this).html("重新获取验证码").addClass("show");
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



})()