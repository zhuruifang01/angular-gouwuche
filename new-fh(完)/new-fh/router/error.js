var express=require("express");
var router=express.Router();

router.use("/error",function(req,res,next){
    res.render("error",{url:"/user/reg",title:"错误提示",con:"用户名或密码格式错误"});
});
router.use("/mysqlerror",function(req,res,next){
    res.render("mysqlerr",{url:"/",title:"错误提示",con:"服务器请求发生错误，稍后再试"});
});
router.use("/regsuccess",function(req,res,next){
    res.render("regsuccess",{url:"/user/login",title:"注册成功",con:"恭喜您注册成功"})
});

module.exports=router;