/**
 * 商品列表
 */
(function(){
  var gid = location.search.split("=")[1];
  function getGoods(){
    ajax({
      url:"./goods.do",
      data:"gid="+gid,
      type:"get",
      dataType:"json"
    }).then((data)=>{
      var title = "";
      if(data.pcat != ""){
        title+=`<li class="float-left">/</li>
                <li class="float-left">
                  <a href="${data.pcat[0].href}">${data.pcat[0].cname}</a>
                </li>`;
      }
      if(data.name != ""){
        title+=`<li class="float-left">/</li>
                <li class="float-left">
                  <a href="javascript:;">${data.name}</a>
                </li>`;
      }
      $(".now-page").append(title);
      var html =`<li class="float-left"><a id="all" href="${data.pcat[0].href}">全部</a></li>`;
      for (let index = 0; index < data.cat.length; index++) {
        var pro = data.cat[index];
        html+=`<li class="float-left"><a href="${pro.href}">${pro.cname}</a></li>`;
        
      }
      $("#list").append(html);
      var a = $("#list li a");
      for (let index = 0; index < a.length; index++) {
        if($(a[index]).html()==data.name){
          $(a[index]).addClass("on");
          break;
        }       
      }
      if(data.name==""){
        $("#all").addClass("on");
      }
      
    });
  }

  function getPinLei(){
    ajax({
      url:"./pinlei.do",
      data:"gid="+gid,
      type:"get",
      dataType:"json"
    }).then((data)=>{
      //过滤重复
      var obj = {};
      for (let index = 0; index < data.products.length; index++) {
        var pro = data.products[index];
        obj[pro.brand] = pro.brand;
        
      }
      var html = "";
      for (const key in obj) {
        html+=`<li class="float-left"><a href="javascript:;">${key}</a></li>`;
      }
      $("#brand").append(html);
      $("#brand li a").click(function(){
        $("#brand li a").removeClass("on");
        $(this).addClass("on");
      });

      //分页栏
      var page = Math.ceil(data.products.length/20);
      $("#page").html(`共${page}页`);
      var pg = `<li class="float-left"><a href="#">上一页</a></li>`;
      for (let index = 1; index <= page; index++) {
        pg+=`<li class="float-left on"><a href="#">${index}</a></li>`     
      }
      pg+=`            <li class="float-left"><a href="#">下一页</a></li>`;
      $("#page_list").append(pg);

      $("#page_list li").click(function(){
        $("#page_list li").removeClass("on");
        $(this).addClass("on");
      });
      console.log(data)
      //处理商品列表
      var list = ``;
      for (let index = 0; index < 20; index++) {
        var pro = data.products[index];
        list+=`<dl class="item float-left">
                  <dt>
                    <a href="${pro.href}">
                      <img src="${pro.pic}">
                    </a>
                  </dt>
                  <dd class="good-intr">
                    <p class="big-title">${pro.title}</p>
                    <p class="sec-title">${pro.sell_point}</p>
                    <p class="price">￥${pro.price}</p>
                    <p class="pinjia"><span>1394</span>人好评</p>
                  </dd>
                  <dd class="cart-show">
                    <p>加入购物车</p>
                  </dd>
                </dl>`;        
      }
      $("#goods_list").append(list);
    });
  }

  function init(){
    getGoods();
    getPinLei();
  }
  init();
})()