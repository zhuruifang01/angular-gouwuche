var express=require("express");
var router=express.Router();
var mysql=require("../mysql.js");

router.use("/ajax",function(req,res){
    if(req.signedCookies.comming=="yes"&&req.signedCookies.username) {
        var username=req.signedCookies.username;
        var con = req.body.con;
        var aid = req.body.aid;
        var time = req.body.time;
        mysql.query(`insert into liuyan (con,lname,time,aid) values ('${con}','${username}','${time}','${aid}')`,function(err,result){
            if(err){
                res.send("no");
            }else{
                res.send(username);
            }
        });
    }else{
        res.send("no");
    }
});
router.use("/liuyanlist",function(req,res){
    
});
module.exports=router;