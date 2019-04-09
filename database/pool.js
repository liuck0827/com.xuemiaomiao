/**
 * 数据库连接池
 */
//引入mysql模块
const mysql = require('mysql');
//配置文件模块
const db_config = require('./db_config');

module.exports = mysql.createPool(db_config);