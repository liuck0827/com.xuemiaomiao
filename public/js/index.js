(function(){ 
  //加载特价商品
  function getSep(){
    ajax({
      url:"./getSep",
      type:"get",
      dataType:"json"
    }).then(function(data){
      //加载特价商品
      var sep = "";
      for (let index = 0; index < data.sep.length; index++) {
        let product = data.sep[index];
        sep+=`<li>
                <a href="${product.href}">
                  <div class="top">
                    <img src="${product.pic}" alt="">
                  </div>
                  <h6>${product.title}</h6>
                  <p class="special-alt">${product.sell_point}</p>
                  <p class="special-price">
                    <span>￥${product.sep_price}</span>
                    <del>￥${product.price}</del>
                  </p>
                  <img src="${product.label}">
                </a>
              </li>`;        
      }
      $(".special-content>ul").append("");
      $(".special-content>ul").append(sep);
      //加载自饮
      var drink = "";
      for (let index = 0; index < data.drink.length; index++) {
        let product = data.drink[index];
        drink += `<a href="${product.href}" class="float-left">
                    <img class="top_img" src="${product.pic}">
                    <p class="f-title">${product.title}</p>
                    <p class="s-title">${product.sell_point}</p>
                    <p class="price">￥${product.price}</p>
                    <img class="d_icon" src="${product.label}">
                  </a>`
        
      }
      $("#dr").append("");
      $("#dr").append(drink);
      //加载礼物
      var gift = "";
      for (let index = 0; index < data.gift.length; index++) {
        let product = data.gift[index];
        gift += `<a href="${product.href}" class="float-left">
                    <img class="top_img" src="${product.pic}">
                    <p class="f-title">${product.title}</p>
                    <p class="s-title">${product.sell_point}</p>
                    <p class="price">￥${product.price}</p>
                    <img class="d_icon" src="${product.label}">
                  </a>`
        
      }
      $("#gift").append("");
      $("#gift").append(gift);
      //加载茶具
      var tea_1 ="";
      for (let index = 0; index < data.tea_1.length; index++) {
        let product = data.tea_1[index];
        tea_1 += `<li class="float-left">
                    <a href="${product.href}">
                      <img src="${product.pic}">
                      <p class="f-title">${product.title}</p>
                      <p class="s-title">${product.sell_point}</p>
                      <p class="price">￥${product.price}</p>
                    </a>
                  </li>`
        
      }
      $("#tea_1").append("");
      $("#tea_1").append(tea_1);
      var tea_2 ="";
      for (let index = 0; index < data.tea_2.length; index++) {
        let product = data.tea_2[index];
        tea_2 += `<li class="float-left">
                    <a href="${product.href}">
                      <img src="${product.pic}">
                      <p class="f-title">${product.title}</p>
                      <p class="s-title">${product.sell_point}</p>
                      <p class="price">￥${product.price}</p>
                    </a>
                  </li>`
        
      }
      $("#tea_2").append("");
      $("#tea_2").append(tea_2);
      //加载热门商品
      var hot ="";
      for (let index = 0; index < data.hot.length; index++) {
        let product = data.hot[index];
        hot += `<li class="float-left">
                  <a href="${product.href}">
                    <img src="${product.pic}">
                    <p class="f-title">${product.title}</p>
                    <p class="s-title">来自o2jamcool的评价</p>
                    <p class="price">${product.sell_point}<b>|</b><span>￥${product.price}</span></p>
                  </a>
                </li>`
        
      }
      $("#hot").append("");
      $("#hot").append(hot);


    });
  }

  function time(){
    return new Promise((resove)=>{
      var fuTime = new Date(2019,2,20).getTime();
      var id = setInterval(function(){
        var now = new Date().getTime();
        var time =parseInt((fuTime - now)/1000);
        //获取剩余的天数
        var day = parseInt(time/(60*60*24));
        var hour = parseInt(time/(60*60))-day*24;
        var min = parseInt(time/60)-day*24*60-hour*60;
        var sec =  time-day*24*60*60-hour*60*60-min*60;
        $(".special span.day").html(day+"天");
        $(".special span.hour").html(hour);
        $(".special span.min").html(min);
        $(".special span.second").html(sec);
      },1000);
      if(time==0){
        resove(id);
      }
    }).then((id)=>{
      clearInterval(id);
    });

    
  }




  (function(){
    getSep();
    time();
  })();
})();