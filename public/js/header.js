/**
 * 页头显示信息
 */
(function(){
  //获取菜单
  function menu(){
    ajax({
      url:"http://localhost:5050/getMenu.do",
      type:"get",
      dataType:"json"
    }).then(function(data){
      var html = "";
      for (const key in data) {
        html += `<dl class="list-info clearfix">
                    <dt class="big-title float-left">
                      <a href="${data[key][0]}">${key}</a>
                    </dt>
                    <dd class="sec-titles float-left clearfix">`;
        for (let index = 0; index < 4; index++) {
          let pro = data[key][1][index];
          html += `<a href="${pro.href}">${pro.cname}</a>`
          
        }

        html +=  `</dd>
                    <dd class="details">
                      <ul class="clearfix">`;
        for (let index = 0; index < data[key][1].length; index++) {
          let pro = data[key][1][index];
          html +=`<li class="float-left clearfix">
                  <a class="float-left" href="${pro.href}">
                    <img src="${pro.pic}">
                  </a>
                  <a class="float-left" href="${pro.href}">${pro.cname}</a>
                </li>`
          
        }               
        html+=`</ul>
            </dd>
          </dl>`;
      }
      $(".content-box").append("");
      $(".content-box").append(html);      
    });
  }

  function init(){
    menu();
  }

  init();
})();