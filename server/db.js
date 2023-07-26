//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

const mysql = require("mysql")
const db = mysql.createConnection({
	host: "localhost",	//local host为数据库主机名，localhost代表本地环境，相当于127.0.0.1
	user: "root",	//root为数据库用户名
	password: "password",	//123456为数据库密码
	database: "project"	//node为数据库名称
})

db.connect()

module.exports = db;