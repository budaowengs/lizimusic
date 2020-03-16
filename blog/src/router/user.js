const { login }=require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

//获取 cookie 的过期时间
const getCookieExpires=()=>{
    const d=new Date()
    d.setTime(d.getTime()+(24*60*60*1000))
    console.log('d.toGMTString() is',d.toGMTString())
    return d.toGMTString()
}

const handelUserRouter=(req,res)=>{
    const method=req.method//get post
   

    //登录
    if(method==='GET' && req.path==='/api/user/login'){
        //const {username,password}=req.body
        const {username,password}=req.query
        const result=login(username,password)
        return result.then(data=>{
            if(data.username){

                console.log('测试')
               
                //操作 cookie  httpOnly只允许后端来改 
                res.setHeader('Set-Cookie',`username=${data.username};path=/;httpOnly;expires=${getCookieExpires()};`)

                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })


        // if(result){
        //     return new SuccessModel()
        // }
        // return new ErrorModel('登录失败')

    }

    //登录验证的测试
    if(method==='GET' && req.path==='/api/user/login-test'){
        if(req.cookie.username){
           return Promise.resolve(
               new SuccessModel({
                  username:req.cookie.username
               })
            )
        }
        return Promise.resolve(
            new ErrorModel('尚未登录')
            ) 
    }
    
}

module.exports=handelUserRouter