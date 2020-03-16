const {
    getSwiper,
    getAlbum,
    getRecom,
    exclusivitlist,
    recentlist,
    morelist,
    attentionlist,
    myAttCommList

} = require('../controller/music')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleMusicRouter = (req, res) => {
    const method = req.method//get post
    const id = req.query.id

    
     //获取首页的轮播图的列表
     if(method=='GET' && req.path==='/api/music/swiper'){
        const url=req.query.url||''
        const result=getSwiper(url)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }

    //获取首页的热门推荐列表
    if(method=='GET' && req.path==='/api/music/album'){
        const img=req.query.img
        const title=req.query.title
        const result=getAlbum(img,title)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }

    //获取首页的推荐榜单列表
    if(method=='GET'&&req.path==='/api/music/recommed'){
        const id=req.query.id
        const title=req.query.title
        const url=req.query.url
        const pic=req.query.pic
        const result=getRecom(id,title,url,pic)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }


    //获取推荐页面第一个模块的列表
    if(method==='GET'&&req.path==='/api/music/exclusivity'){
        const imgname=req.path.imgname||''
        const text=req.path.text||''
        const id=req.path.id||''
        const imgurl=req.path.imgurl||''
        const result=exclusivitlist(imgname,text,id,imgurl)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }
    //获取推荐页面第二个模块的列表
    if(method==='GET'&&req.path==='/api/music/recentlist'){
        const id=req.path.id||''
        const text=req.path.text||''
        const comment=req.path.comment||''
        const url=req.path.url||''
        const result=recentlist(id,text,comment,url)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }
    //获取推荐页面第三个模块的列表
    if(method==='GET'&&req.path==='/api/music/morelist'){
        const id=req.path.id||''
        const text=req.path.text||''
        const comment=req.path.comment||''
        const info=req.path.info||''
        const img=req.path.img||''
        const result=morelist(id,text,comment,info,img)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
        
    }
    //获取分享页面的关注列表
    if(method==='GET'&&req.path==='/api/music/attentionlist'){
        const id=req.path.id||''
        const attimg=req.path.attimg||''
        const attname=req.path.attname||''
        const result=attentionlist(id,attimg,attname)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }


   
    //获取歌曲详情
    if (method === 'GET' && req.path === '/api/music/detail') {
        // const data = getDetail(id)
        // return new SuccessModel(data)
        const result=getDetail(id)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }

    //获取关注人的详细信息
    if (method === 'GET' && req.path === '/api/music/AttComlist') {
        const id=req.path.id||''
        const img=req.path.img||''
        const comment=req.path.comment||''
        const cdata=req.path.cdata||''
        const result=myAttCommList(id,img,comment,cdata)
        return result.then(listdata=>{
            return new SuccessModel(listdata)
        })
    }

   
}

module.exports = handleMusicRouter

//代码格式化整理 shift+alt+f