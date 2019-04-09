/**
 * 商品详情
 */
const express = require('express');
const router = express.Router();
const pool = require('../database/pool');

router.get("/product_details.html",(req,res)=>{
  res.render('goods_details');
});

router.get("/goods_list.html",(req,res)=>{
    res.render('goods_list');
})

router.get("/goods.do",(req,res)=>{
  var gid = req.query.gid;
  var data = {
    name:"",
    pcat:"",
    cat:[]
  }
  var sql = "SELECT * FROM zp_nav WHERE catId = ?";
  pool.query(sql,[gid],(err,result)=>{
    // console.log(data[result[0].cname]="")
    if(result[0].pid==0){
      data.pcat = result;
      var sql = "SELECT * FROM zp_nav WHERE pid = ?";
      pool.query(sql,[gid],(err,result)=>{
        data.cat = result;
        res.send(data);
      });
    }else{
      data.name = result[0].cname;
      var sql_pname = "SELECT * FROM zp_nav WHERE catId = ?"
      pool.query(sql_pname,[result[0].pid],(err,result)=>{
        data.pcat = result;
        var sql = "SELECT * FROM zp_nav WHERE pid = (SELECT pid FROM zp_nav WHERE catId = ?)";
          pool.query(sql,[gid],(err,result)=>{
          data.cat = result;
          res.send(data);
        });
      });      
    }
  });
});

router.get("/pinlei.do",(req,res)=>{
  var gid = req.query.gid;
  var data = {
    count:0,
    products:[]
  }
  var sql = "SELECT * FROM zp_nav WHERE catId = ?";
  pool.query(sql,[gid],(err,result)=>{
    //一级目录
    if(result[0].pid==0){
      //获二级目录的id
      let sql = "SELECT * FROM zp_nav WHERE pid = ?";
      pool.query(sql,[gid],(err,result)=>{
        let sql = "SELECT * FROM zp_details_product WHERE family_id = ?";
        for (let index = 0; index <result.length; index++) {
          (function(id,sql,len){
            pool.query(sql,[id],(err,result)=>{
              data.products.push(result);
              if(data.products.length == len){
                res.send(data);
              }
            })             
          })(result[index].catId,sql,result.length);
        }
      });
    }else{
      let sql = "SELECT * FROM zp_details_product WHERE family_id = ?";
      pool.query(sql,[gid],(err,result)=>{
        data.products = result;
        res.send(data);
      })
    }
  }); 
})

router.get('/getDetails.do',(req,res)=>{
  var $lid = req.query.lid;
  var data = {
    product:[],
    pics:[],
    p_details:[]
  }
  var sql = "SELECT * FROM zp_details_product WHERE lid = ?";
  pool.query(sql,[$lid],(err,result)=>{
    data.product = result;
    let sql = "SELECT * FROM zp_product_pic WHERE product_id = ?";
    pool.query(sql,[$lid],(err,result)=>{
      data.pics = result;
      let sql = "SELECT * FROM zp_details_pic WHERE product_id = ?";
      pool.query(sql,[$lid],(err,result)=>{
        data.p_details = result;
        res.send(data);
      });
    });
  });
})




module.exports = router;