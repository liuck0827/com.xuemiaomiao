(function(window){
  //初始化
  function innit(){
    Object.seal(Utils);
    window.Utils = Utils;
  };

  var Utils = {
  //将cookie字符串装换成对象
  cookieToJson :function(cookieStr){
    let obj = {}
    //判断缓存字符串中是否含有分号
    if(cookieStr.match(';')){
      //按照;拆分字符串
      let cookieArr = cookieStr.split('; ');
      cookieArr.forEach(ele => {
        let arr = ele.split('=');
        obj[arr[0]] = arr[1];
      });
    }else{
      let cookieArr = cookieStr.split('=');
      obj[cookieArr[0]] = cookieArr[1];
    }
    return obj;
  }

} 
innit();
})(window);


