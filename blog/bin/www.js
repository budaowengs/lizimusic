const http=require('http')

const PORT=8000
const serverHandle=require('../app')

const server=http.createServer(serverHandle)
server.listen(PORT)

//数据库
const mysql=require('mysql')

//创建链接对象
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1qaz2wsx',
    port:'3306',
    database:'music'
})