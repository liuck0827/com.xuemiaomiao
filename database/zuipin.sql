#设置客户端连接数据库服务器编码格式
SET NAMES GBK;
#如果存在zuipin数据库，丢弃该数据库
DROP DATABASE IF EXISTS zuipin;
#创建数据库zuipin，并设置数据库编码格式
CREATE DATABASE zuipin CHARSET=UTF8;
#进入数据库
USE zuipin;

#1.创建用户表
CREATE TABLE zp_user(
  uid SMALLINT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16) UNIQUE,
  avatar VARCHAR(128),
  nick_name VARCHAR(32),
  gender INT(11)
);
#插入数据
INSERT INTO zp_user VALUES(null,'admin','123456',null,'15208273210',null,null,null);

#创建首页商品导航表
CREATE TABLE zp_nav(
  catId SMALLINT PRIMARY KEY AUTO_INCREMENT,
  cname VARCHAR(16),
  pid INT(11),
  pic VARCHAR(128),
  href VARCHAR(128)
);
INSERT INTO zp_nav VALUES
(null,'乌龙茶',0,null,'http://localhost:5050/product/goods_list.html?gid=1'),
(null,'红茶',0,null,'http://localhost:5050/product/goods_list.html?gid=2'),
(null,'绿茶',0,null,'http://localhost:5050/product/goods_list.html?gid=3'),
(null,'黑茶',0,null,'http://localhost:5050/product/goods_list.html?gid=4'),
(null,'白茶',0,null,'http://localhost:5050/product/goods_list.html?gid=5'),
(null,'花茶',0,null,'http://localhost:5050/product/goods_list.html?gid=6'),
(null,'茶器',0,null,'http://localhost:5050/product/goods_list.html?gid=7'),
(null,'安溪铁观音',1,'../public/image/wl_tgy.jpg','http://localhost:5050/product/goods_list.html?gid=8'),
(null,'武夷岩茶',1,'../public/image/wl_wuyc.jpg','http://localhost:5050/product/goods_list.html?gid=9'),
(null,'广东单枞',1,'../public/image/wl_gddz.jpg','http://localhost:5050/product/goods_list.html?gid=10'),
(null,'漳平水仙',1,'../public/image/wl_sx.jpg','http://localhost:5050/product/goods_list.html?gid=11'),
(null,'台湾乌龙茶',1,'../public/image/wl_tw.jpg','http://localhost:5050/product/goods_list.html?gid=12'),
(null,'金骏眉',2,'../public/image/hc_jjm.jpg','http://localhost:5050/product/goods_list.html?gid=13'),
(null,'正山小种',2,'../public/image/hc_zsxz.jpg','http://localhost:5050/product/goods_list.html?gid=14'),
(null,'滇红',2,'../public/image/hc_zh.jpg','http://localhost:5050/product/goods_list.html?gid=15'),
(null,'祁门红茶',2,'../public/image/hc_qm.jpg','http://localhost:5050/product/goods_list.html?gid=16'),
(null,'广西红茶',2,'../public/image/hc_gxhc.png','http://localhost:5050/product/goods_list.html?gid=17'),
(null,'锡兰红茶',2,'../public/image/hc_xlhc.jpg','http://localhost:5050/product/goods_list.html?gid=18'),
(null,'其他红茶',2,'../public/image/hc_qihc.jpg','http://localhost:5050/product/goods_list.html?gid=19'),
(null,'龙井',3,'../public/image/lc_lj.jpg','http://localhost:5050/product/goods_list.html?gid=20'),
(null,'四川绿茶',3,'../public/image/lc_sclc.jpg','http://localhost:5050/product/goods_list.html?gid=21'),
(null,'安吉白茶',3,'../public/image/lc_ajbc.jpg','http://localhost:5050/product/goods_list.html?gid=22'),
(null,'信阳毛尖',3,'../public/image/lc_xymj.png','http://localhost:5050/product/goods_list.html?gid=23'),
(null,'碧螺春',3,'../public/image/lc_blc.jpg','http://localhost:5050/product/goods_list.html?gid=24'),
(null,'黄山毛峰',3,'../public/image/lc_hsmf.jpg','http://localhost:5050/product/goods_list.html?gid=25'),
(null,'六安瓜片',3,'../public/image/lc_lagp.jpg','http://localhost:5050/product/goods_list.html?gid=26'),
(null,'太平猴魁',3,'../public/image/lc_tphk.jpg','http://localhost:5050/product/goods_list.html?gid=27'),
(null,'广西绿茶',3,'../public/image/lc_gxlc.jpg','http://localhost:5050/product/goods_list.html?gid=28'),
(null,'普洱茶',4,'../public/image/heic_pec.jpg','http://localhost:5050/product/goods_list.html?gid=29'),
(null,'安化黑茶',4,'../public/image/heic_ahhc.jpg','http://localhost:5050/product/goods_list.html?gid=30'),
(null,'桔普茶',4,'../public/image/heic_jpc.png','http://localhost:5050/product/goods_list.html?gid=31'),
(null,'藏茶',4,'../public/image/heic_zc.jpg','http://localhost:5050/product/goods_list.html?gid=32'),
(null,'六堡茶',4,'../public/image/heic_lbc.jpg','http://localhost:5050/product/goods_list.html?gid=33'),
(null,'陕西黑茶',4,'../public/image/heic_sxhc.png','http://localhost:5050/product/goods_list.html?gid=34'),
(null,'银针',5,'../public/image/bc_yx.png','http://localhost:5050/product/goods_list.html?gid=35'),
(null,'白牡丹',5,'../public/image/bc_bmd.jpg','http://localhost:5050/product/goods_list.html?gid=36'),
(null,'寿眉',5,'../public/image/bc_sm.jpg','http://localhost:5050/product/goods_list.html?gid=37'),
(null,'其他白茶',5,'../public/image/bc_qibc.jpg','http://localhost:5050/product/goods_list.html?gid=38'),
(null,'茉莉花茶',6,'../public/image/huac_mlhc.jpg','http://localhost:5050/product/goods_list.html?gid=39'),
(null,'玫瑰花茶',6,'../public/image/huac_mghc.jpg','http://localhost:5050/product/goods_list.html?gid=40'),
(null,'菊花茶',6,'../public/image/huac_jhc.png','http://localhost:5050/product/goods_list.html?gid=41'),
(null,'花茶系',6,'../public/image/huac_hcc.jpg','http://localhost:5050/product/goods_list.html?gid=42'),
(null,'陶瓷茶具',7,'../public/image/cq_cq.jpg','http://localhost:5050/product/goods_list.html?gid=43'),
(null,'紫砂茶具',7,'../public/image/cq_zs.jpg','http://localhost:5050/product/goods_list.html?gid=44'),
(null,'玻璃茶具',7,'../public/image/cq_bl.jpg','http://localhost:5050/product/goods_list.html?gid=45'),
(null,'茶盘',7,'../public/image/cq_cp.jpg','http://localhost:5050/product/goods_list.html?gid=46'),
(null,'建盏',7,'../public/image/cq_jz.png','http://localhost:5050/product/goods_list.html?gid=47'),
(null,'茶道配件',7,'../public/image/cq_cdpj.jpg','http://localhost:5050/product/goods_list.html?gid=48');


--2.创建首页商品表
CREATE TABLE zp_index_product(
  pid SMALLINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128),
  sell_point VARCHAR(64),
  pic VARCHAR(128),
  price DECIMAL(10,2),
  sep_price DECIMAL(10,2),
  href VARCHAR(128),
  label VARCHAR(128),
  categroy VARCHAR(16),
  seq_recommended TINYINT(4),
  seq_now_arrival TINYINT(4),
  seq_top_sale TINYINT(4)
);
#插入数据
INSERT INTO zp_index_product VALUES
(null,'醉品朴茶 红茶礼盒·红双喜 2018年正山小种100g+金骏眉100g','原产地直供高性价比好茶','../public/image/sep_1.jpg',289.00,163.80,'./product/product_details.html?lid=1',"../public/image/time-limit.png",'sep',0,0,0),
(null,'文新 信阳毛尖 2018年明前茶 绿茶 特级 观道 108g 单盒','匠心之作，高品质礼茶','../public/image/sep_2.jpg',750.00,450.10,'./product/product_details.html?lid=2',"../public/image/time-limit.png",'sep',0,0,0),
(null,'益泡柑 代用茶 柑普茶 益泡·品 小青柑 特级 圆罐250g','维持好身材 健身达人伴侣','../public/image/sep_3.jpg',480.00,432.00,'./product/product_details.html?lid=3',"../public/image/time-limit.png",'sep',0,0,0),
(null,'【日本工艺美术师加藤荣一作品】台湾志野 陶瓷茶具 三色志野 单杯','全手工制作','../public/image/sep_4.jpg',399.00,359.10,'./product/product_details.html?lid=4',"../public/image/time-limit.png",'sep',0,0,0),
(null,'醉品朴茶 红茶礼盒·红双喜 2018年正山小种100g+金骏眉100g','原产地直供高性价比好茶','../public/image/sep_5.jpg',289.00,163.80,'./product/product_details.html?lid=5',"../public/image/time-limit.png",'sep',0,0,0),
(null,'三和 安溪铁观音 2018春茶 乌龙茶 清香型 特级 和清333 250g','库存告急，卖完售罄','../public/image/sep_6.jpg',500.00,450.00,'./product/product_details.html?lid=6',"../public/image/time-limit.png",'sep',0,0,0),
(null,'千道湾 2018年安吉白茶 银山礼盒 特级 180g','商界领袖智慧茶礼，送领导','../public/image/sep_7.jpg',880.00,528.10,'./product/product_details.html?lid=7',"../public/image/time-limit.png",'sep',0,0,0),
(null,'豫信 信阳毛尖 2018年春茶 一级 豫信信阳毛尖茶·地 500g 礼盒','大气茶礼，送贵客送长辈','../public/image/sep_8.jpg',900.00,540.10,'./product/product_details.html?lid=8',"../public/image/time-limit.png",'sep',0,0,0),
(null,'醉品朴茶 2019年头采明前龙井 自饮装 100g','买两盒赠手提袋','../public/image/drink_1.jpg',256.00,0.00,'./product/product_details.html?lid=9',"../public/image/drink_icon.png",'drink',0,0,0),
(null,'益泡柑 代用茶 柑普茶 荣华新会小青柑 150g 黄罐','办公常饮，呵护肠胃','../public/image/drink_2.jpg',180.00,0.00,'./product/product_details.html?lid=10',"../public/image/drink_icon.png",'drink',0,0,0),
(null,'醉品朴茶 2018年滇红 自饮系列 金针 特级 100g','商务往来，招待客户','../public/image/drink_3.jpg',138.00,0.00,'./product/product_details.html?lid=11',"../public/image/drink_icon.png",'drink',0,0,0),
(null,'峨眉雪芽 茉莉花茶 飘雪慧欣 2018年春茶 100g 铁盒','花香清新，办公自饮','../public/image/drink_4.jpg',228.00,0.00,'./product/product_details.html?lid=12',"../public/image/drink_icon.png",'drink',0,0,0),
(null,'宝泽台湾乌龙茶 阿里山高山金萱 150g 单罐','带牛奶香和桂花香','../public/image/drink_5.jpg',330.00,0.00,'./product/product_details.html?lid=13',"../public/image/drink_icon.png",'drink',0,0,0),
(null,'醉品朴茶·醇朴 2018年秋茶 安溪铁观音 经典口碑款 清香型 NGY0840-250g','秋茶抢鲜上市','../public/image/drink_6.jpg',180.00,0.00,'./product/product_details.html?lid=14',"../public/image/drink_icon.png",'drink',0,0,0),
(null,'峨眉雪芽 四川绿茶 慧欣 2019明前茶 绿茶 礼盒96g','预计3月15日发货','../public/image/gift_1.jpg',296.00,0.00,'./product/product_details.html?lid=15',"../public/image/song_icon_1.png",'gift',0,0,0),
(null,'醉品叶界 2018年秋茶 王清海大师代表作 安溪铁观音 特级 125g 乌龙茶','新茶抢鲜上市','../public/image/gift_2.jpg',258.00,0.00,'./product/product_details.html?lid=16',"../public/image/song_icon_2.png",'gift',0,0,0),
(null,'文新 信阳红茶 2018明前茶 红茶 特级 礼盒茶 150g','精品信阳红茶礼盒','../public/image/gift_3.jpg',360.00,0.00,'./product/product_details.html?lid=17',"../public/image/song_icon_3.png",'gift',0,0,0),
(null,'极白 安吉白茶 贵宾国礼茶 2018年春茶 绿茶 一级 国宝极白V5 100g 礼盒装','高氨基酸含量 滋味鲜爽','../public/image/gift_4.jpg',380.00,0.00,'./product/product_details.html?lid=18',"../public/image/song_icon_2.png",'gift',0,0,0),
(null,'1392 广东单丛 来自火山口的茶海洋传奇系列精选礼盒 160g','有机单丛茶，买的放心，喝得安心！','../public/image/gift_5.jpg',518.00,0.00,'./product/product_details.html?lid=19',"../public/image/song_icon_3.png",'gift',0,0,0),
(null,'醉品叶界 刘安兴大师代表作 2018年大红袍 特级 192g 乌龙茶','商务送礼爆品之一','../public/image/gift_6.jpg',380.00,0.00,'./product/product_details.html?lid=20',"../public/image/song_icon_4.png",'gift',0,0,0),
(null,'陶瓷茶具 旅行盖碗小套组 影青','喝茶必备选择','../public/image/tea_1.jpg',128.00,0.00,'./product/product_details.html?lid=21',null,'tea_1',0,0,0),
(null,'陶瓷茶具 点瓷成金玉乳壶套组 甜白 10入','莹润如脂，白如象牙','../public/image/tea_2.jpg',368.00,0.00,'./product/product_details.html?lid=22',null,'tea_1',0,0,0),
(null,'陶瓷茶具 居家功夫茶具套组 圆融侧把套组 10入','质白如凝雪','../public/image/tea_3.jpg',298.00,0.00,'./product/product_details.html?lid=23',null,'tea_1',0,0,0),
(null,'紫砂壶 富贵西施壶 260ml 原矿朱泥 手工壶','备受欢迎的壶型，茶人必备款','../public/image/tea_4.jpg',520.00,0.00,'./product/product_details.html?lid=24',null,'tea_1',0,0,0),
(null,'【匠人廖成军作品】建盏 蓝莲花 束口 金油滴 单杯','个人收藏，赠送亲友','../public/image/tea_5.jpg',646.00,0.00,'./product/product_details.html?lid=25',null,'tea_2',0,0,0),
(null,'陶瓷茶具 点瓷成金提梁壶套组 粉青 10入','高颜值茶具，金与瓷的艺术','../public/image/tea_6.jpg',368.00,0.00,'./product/product_details.html?lid=26',null,'tea_2',0,0,0),
(null,'陶瓷茶具 观山盖碗小套组','釉面温润、通透，造型简单大方','../public/image/tea_7.jpg',228.00,0.00,'./product/product_details.html?lid=27',null,'tea_2',0,0,0),
(null,'醉品茶集客户专享 珍藏纪念品 世界杯8强 陶瓷茶具旅行杯','收藏家的选择','../public/image/tea_8.jpg',168.00,0.00,'./product/product_details.html?lid=28',null,'tea_2',0,0,0),
(null,'一直是醉品的忠实粉丝啦 这次买回来的还没来及打开喝呢 但是一直购买的都很满意 ','祥源茶 太平猴魁 45g','../public/image/hot_1.jpg',168.00,0.00,'./product/product_details.html?lid=29',null,'hot',0,0,0),
(null,'不拆了。非常好，满意（据以往经验）','老同志 普洱茶 357g','../public/image/hot_2.jpg',168.00,0.00,'./product/product_details.html?lid=30',null,'hot',0,0,0),
(null,'正宗台湾乌龙茶。很满意的茶，很好的客服。','宝泽 台湾乌龙茶 150g','../public/image/hot_3.jpg',168.00,0.00,'./product/product_details.html?lid=31',null,'hot',0,0,0),
(null,'很喜欢这一款，买了很多次了。今后会继续光顾，信任醉品','傣园普香 普洱茶 250g','../public/image/hot_4.jpg',168.00,0.00,'./product/product_details.html?lid=32',null,'hot',0,0,0),
(null,'漂洋过海而来，等了特别久，非常满意，家人很喜欢，包装也很好','宝泽 台湾乌龙茶 150g','../public/image/hot_5.jpg',168.00,0.00,'./product/product_details.html?lid=33',null,'hot',0,0,0),
(null,'刚上新我就买了，口感不错，比我以前喝的大红袍口感浓厚，回味更香，以后就它啦','龙雀 武夷岩茶 500g','../public/image/hot_6.jpg',168.00,0.00,'./product/product_details.html?lid=34',null,'hot',0,0,0),
(null,'三行情书，很棒的创意，密封包装 分量足 口感好满意','菩美 金骏眉 60g','../public/image/hot_7.jpg',168.00,0.00,'./product/product_details.html?lid=35',null,'hot',0,0,0),
(null,'满意，很正宗的味道，送人也合适 ','益泡柑 柑普茶 357g','../public/image/hot_8.jpg',168.00,0.00,'./product/product_details.html?lid=36',null,'hot',0,0,0);
#3商品详情表
CREATE TABLE zp_details_product(
  lid INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128),
  sell_point VARCHAR(64),
  price DECIMAL(10,2),
  sep_price DECIMAL(10,2),
  brand VARCHAR(20),
  specification VARCHAR(20),
  origin VARCHAR(20),
  license VARCHAR(30),
  harvest_season VARCHAR(20),
  storage VARCHAR(30),
  quality_time VARCHAR(10),
  level VARCHAR(10),
  pack_specification VARCHAR(30),
  family_id INT(11),
  pic VARCHAR(128),
  href VARCHAR(128)
);
INSERT INTO zp_details_product VALUES
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_1.jpg','./product_details.html?lid=1'),
(null,'醉品朴茶 2018年西湖龙井 核心产区正宗好茶 生态绿罐100g','香气持久，口感鲜甜', 235.00,138.00,'醉品朴茶','100','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','一级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_2.jpg','./product_details.html?lid=2'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_3.jpg','./product_details.html?lid=3'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_4.jpg','./product_details.html?lid=4'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_5.jpg','./product_details.html?lid=5'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_6.jpg','./product_details.html?lid=6'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_7.jpg','./product_details.html?lid=7'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_8.jpg','./product_details.html?lid=8'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_9.jpg','./product_details.html?lid=9'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_10.jpg','./product_details.html?lid=10'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_11.jpg','./product_details.html?lid=11'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_12.jpg','./product_details.html?lid=12'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_13.jpg','./product_details.html?lid=13'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_14.jpg','./product_details.html?lid=14'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_15.jpg','./product_details.html?lid=15'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_16.jpg','./product_details.html?lid=16'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_17.jpg','./product_details.html?lid=17'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_18.jpg','./product_details.html?lid=18'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_19.jpg','./product_details.html?lid=19'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_20.jpg','./product_details.html?lid=20'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_1.jpg','./product_details.html?lid=1'),
(null,'醉品朴茶 2018年西湖龙井 核心产区正宗好茶 生态绿罐100g','香气持久，口感鲜甜', 235.00,138.00,'醉品朴茶','100','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','一级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_2.jpg','./product_details.html?lid=2'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_3.jpg','./product_details.html?lid=3'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_4.jpg','./product_details.html?lid=4'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_5.jpg','./product_details.html?lid=5'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_6.jpg','./product_details.html?lid=6'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_7.jpg','./product_details.html?lid=7'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_8.jpg','./product_details.html?lid=8'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_9.jpg','./product_details.html?lid=9'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_10.jpg','./product_details.html?lid=10'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_11.jpg','./product_details.html?lid=11'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_12.jpg','./product_details.html?lid=12'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_13.jpg','./product_details.html?lid=13'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_14.jpg','./product_details.html?lid=14'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_15.jpg','./product_details.html?lid=15'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_16.jpg','./product_details.html?lid=16'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_17.jpg','./product_details.html?lid=17'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_18.jpg','./product_details.html?lid=18'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_19.jpg','./product_details.html?lid=19'),
(null,'一匠一品 2018年西湖龙井炒茶王仇晓华代表作 特级 50g','核心原产区西湖，香味鲜浓', 235.00,138.00,'一匠一品','50','浙江杭州','SC11433010613361',' 雨前','防潮湿、防异味、避光、冷藏为宜','18','特级','长7.6cm*宽7.6cm*高12.3cm',20,'../public/image/longjin_goods_20_20.jpg','./product_details.html?lid=20');

#4图片表
CREATE TABLE zp_product_pic(
  pid INT(11) PRIMARY KEY AUTO_INCREMENT,
  product_id VARCHAR(20),
  pic VARCHAR(128)
);
INSERT INTO zp_product_pic VALUES
(null,'1','../public/image/longjin_20_1.jpg'),
(null,'1','../public/image/longjin_20_2.jpg'),
(null,'1','../public/image/longjin_20_3.jpg'),
(null,'1','../public/image/longjin_20_4.jpg'),
(null,'1','../public/image/longjin_20_5.jpg'),
(null,'1','../public/image/longjin_20_6.jpg'),
(null,'1','../public/image/longjin_20_7.jpg');

#5.商品详情图片表
CREATE TABLE zp_details_pic(
  did INT(11) PRIMARY KEY AUTO_INCREMENT,
  product_id VARCHAR(20),
  pic VARCHAR(128)
);
INSERT INTO zp_details_pic VALUES
(null,'1','../public/image/longjin_20_details_1.jpg'),
(null,'1','../public/image/longjin_20_details_2.jpg'),
(null,'1','../public/image/longjin_20_details_3.jpg'),
(null,'1','../public/image/longjin_20_details_4.jpg'),
(null,'1','../public/image/longjin_20_details_5.jpg'),
(null,'1','../public/image/longjin_20_details_6.jpg'),
(null,'1','../public/image/longjin_20_details_7.jpg'),
(null,'1','../public/image/longjin_20_details_8.jpg'),
(null,'1','../public/image/longjin_20_details_9.jpg'),
(null,'1','../public/image/longjin_20_details_10.jpg'),
(null,'1','../public/image/longjin_20_details_11.jpg'),
(null,'1','../public/image/longjin_20_details_12.jpg'),
(null,'1','../public/image/longjin_20_details_13.jpg'),
(null,'1','../public/image/longjin_20_details_14.jpg'),
(null,'1','../public/image/longjin_20_details_15.jpg'),
(null,'1','../public/image/longjin_20_details_16.jpg');