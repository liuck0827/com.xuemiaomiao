/**
 * 商品详情
 */
(function(){
  var lid = location.search.split('=')[1];
  //显示商品详情
  function getDetails(){
    ajax({
      url:"./getDetails.do",
      data:"lid="+lid,
      type:"get",
      dataType:"json"
    }).then((data)=>{
      console.log(data);
      //加载图片
      var pic = ``;
      var pics = data.pics;
      for (let index = 0; index < pics.length; index++) {
        pic+=`<li><a href="javascript:;"><img src="${pics[index].pic}"></a></li>`        
      }
      $("#lg_pic").prop("src",pics[0].pic);
      $("#sm_pic").prop("src",pics[0].pic);
      $("#nav").append(`<li class="float-left">
                          <p>${data.product[0].title}</p>
                          <p class="price">￥<span>${data.product[0].sep_price.toFixed(2)}</span></p>
                        </li>`)
      $("#pics").append(pic).children().first().addClass("on");
      $("#pics li").click(function(){
        $("#pics li").removeClass("on");
        $(this).addClass("on")
        $("#lg_pic").prop("src",$(this).children().children().prop("src"))
      });
      //加载详情图片
      var p_detail = ``;
      var p_details = data.p_details;
      for (let index = 0; index < p_details.length; index++) {
        p_detail += `<img src="${p_details[index].pic}">`;        
      }
      $("#p_details").append(p_detail);

      //加载详情
      var pro = data.product[0];
      var details = `<h1>${pro.title}</h1>
                      <p class="sec-title">${pro.sell_point}</p>
                      <ul class="price-list">
                        <li class="clearfix">
                          <span class="float-left">市场价</span>
                          <span class="float-left">￥&nbsp;<del>${pro.price.toFixed(2)}</del></span>
                        </li>
                        <li class="clearfix">
                          <span class="float-left">醉品价</span>
                          <span class="float-left"><i>￥</i>&nbsp;${pro.sep_price.toFixed(2)}</span>
                        </li>
                        <li class="clearfix">
                          <span class="float-left">促销</span>
                          <div class="float-left">
                            <p><span>包邮</span>全场在线支付满59元免运费</p>
                            <p><span>直降</span>已优惠97.00元</p>
                          </div>
                        </li>
                      </ul>
                      <ul class="pingpai-list clearfix">
                        <li class="float-left">
                          <span>品牌</span>
                          <span>${pro.brand}</span>
                        </li>
                        <li class="float-left">
                          <span>净含量</span>
                          <span>${pro.specification}g</span>
                        </li>
                        <li class="float-left">
                          <span>商品编号</span>
                          <span>${pro.lid}</span>
                        </li>
                      </ul>
                      <ul class="cart">
                        <li class="clearfix">
                          <span class="float-left">数量</span>
                          <div class="float-left">
                            <button>-</button>
                            <input type="text" value="1">
                            <button>+</button>
                          </div>
                        </li>
                        <li>
                          <a href="#">加入购物车</a>
                        </li>
                      </ul>`;
      $("#detail").prepend(details);  
      //简介
      $("#intoduce").append(`<li class="float-left"><span>规格：</span>${pro.specification}g/盒<span></span></li>  
                            <li class="float-left"><span>产地：</span>${pro.origin}<span></span></li>  
                            <li class="float-left"><span>食品生产许可证：</span>${pro.license}<span></span></li>  
                            <li class="float-left"><span>采摘季节：</span>${pro.harvest_season}<span></span></li>  
                            <li class="float-left"><span>储藏方法：</span>${pro.storage}<span></span></li>  
                            <li class="float-left"><span>保质期：</span>${pro.quality_time}个月<span></span></li>  
                            <li class="float-left"><span>等级：</span>${pro.level}<span></span></li>  
                            <li class="float-left"><span>包装规格：</span>${pro.pack_specification}<span></span></li>  `);
      



    });
  }

  function init(){
    getDetails();
  }

  init();


})()