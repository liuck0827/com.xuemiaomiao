/**
 * 首页
 */
const express = require('express');
const router = express.Router();
const pool = require('../database/pool');

//首页
router.get('/',(req,res)=>{
  res.render('main.html');
});

//获取特价商品
router.get('/getSep',(req,res)=>{
  var sql = "SELECT * FROM zp_index_product WHERE categroy = ?";
  var data = {
    sep:[],
    drink:[],
    gift:[],
    tea_1:[],
    tea_2:[],
    hot:[]
  }
  pool.query(sql,["sep"],(err,result)=>{
    if(err) throw err;
    data.sep = result;
    pool.query(sql,["drink"],(err,result)=>{
      if(err) throw err;
      data.drink = result;
      pool.query(sql,["gift"],(err,result)=>{
        if(err) throw err;
        data.gift = result;
        pool.query(sql,["tea_1"],(err,result)=>{
          if(err) throw err;
          data.tea_1 = result;
          pool.query(sql,["tea_2"],(err,result)=>{
            if(err) throw err;
            data.tea_2 = result;
            pool.query(sql,["hot"],(err,result)=>{
              if(err) throw err;
              data.hot = result;            
              res.send(data);
            });
          });
        });
      });
    });
  });
});

//获取菜单
router.get('/getMenu.do',(req,res)=>{
   var sql = "SELECT * FROM zp_nav WHERE pid = ?";
   var menu = {
     
  }
   pool.query(sql,[0],(err,result)=>{
    if(err) throw err;
    // menu.nav_first =  result;
    var n = result.length;
    for (let index = 0; index < result.length; index++) {
      (function(i,el,sql){        
        pool.query(sql,[el[i].catId],(err,r)=>{
          menu[el[i].cname] = [];
          menu[el[i].cname].push(el[i].href);
          menu[el[i].cname].push(r);
          if(n==Object.keys(menu).length){
            res.send(menu);
          }          
        });
      })(index,result,sql);     
    }
   });
});









module.exports = router;