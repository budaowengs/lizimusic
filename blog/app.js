const querystring = require('querystring')
const handleMusicRouter = require('./src/router/music')
const handelUserRouter = require('./src/router/user')

//用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    //设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    //获取path
    const url = req.url
    req.path = url.split('?')[0]

    //解析query 
    req.query = querystring.parse(url.split('?')[1])

    //解析 cookie  k1=v1 k2=v2
    req.cookie={}
    const cookieStr=req.headers.cookie||''
    cookieStr.split(';').forEach(item => {
        if(!item){
            return
        }
        const arr=item.split('=')
        const key=arr[0].trim()
        const val=arr[1].trim()
        console.log(key,val)
        req.cookie[key]=val
    })
    console.log('req.cookie is',req.cookie)

    //处理post data
    getPostData(req).then(postData => {
        req.body = postData

        //处理blog 路由
        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }

        const musicResult = handleMusicRouter(req,res)
        if(musicResult){
            musicResult.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

      
        //处理user 路由
        // const userData = handelUserRouter(req, res)
        // if (userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }
        const userResult=handelUserRouter(req,res)
        if(userResult){
            userResult.then(userData=>{
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        //未命中路由，返回404
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write("404 Not Found\n")
        res.end()

    })



    //env:process.env.NODE_ENV 

}

module.exports = serverHandle