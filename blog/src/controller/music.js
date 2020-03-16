const {exec}=require('../db/mysql')

// 获取首页的轮播图列表函数
const getSwiper=(url)=>{
    let sql=`select * from swiper`
    return exec(sql)
}

//获取首页的热门推荐列表函数
const getAlbum=(img,title)=>{
    let sql=`select img,title from album`
    return exec(sql)
}

//获取首页的推荐榜单列表函数
const getRecom=(id,title,url,pic)=>{
    let sql=`select * from recommed`
    return exec(sql)
}



//获取推荐页面的第一个模块
const exclusivitlist=(imagename,text,id,imgurl)=>{
    let sql=`select * from exclusivitlist`
    return exec(sql)
}

//获取推荐页面的第二个模块
const recentlist=(id,comment,text,img)=>{
    let sql=`select * from recentlist`
    return exec(sql)
}

//获取推荐页面的第三个模块
const morelist=(id,comment,text,info,img)=>{
    let sql=`select * from morelist`
    return exec(sql)
}

//获取分享页的关注列表
const attentionlist=(id,attimg,attname)=>{
    let sql=`select * from attentionlist`
    return exec(sql)
}


//获取关注人的详细信息
const myAttCommList=(id,img,comment,cdata)=>{
    const sql=`select * from myattcomlist`  
        return exec(sql)
}




module.exports={
    getSwiper,
    getAlbum,
    getRecom,
    exclusivitlist,
    recentlist,
    morelist,
    attentionlist,
    myAttCommList  
}