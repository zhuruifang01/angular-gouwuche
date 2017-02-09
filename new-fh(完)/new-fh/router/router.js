var express=require("express");
var router=express.Router();
var mysql=require("../mysql");

router.use("/reg",function(req,res,next){
   res.cookie("comming","yes",{signed:true});
   res.render("reg") 
});
router.use("/regCheck",function(req,res,next){
   // console.log(req.signedCookies.comming);
   if(req.signedCookies.comming=="yes"){
      var username=req.body.username;
      var password=req.body.password;
      console.log(username);
      console.log(password);
      if(username==""||password==""){
         res.redirect("/error");
      }else{
         mysql.query("select * from user",function(err,rows){
            var flag=true;
            for(var i=0;i<rows.length;i++){
               if(rows[i].username==username){
                  flag=false;
                  res.redirect("/error");
                  break;
               }
            }
            if(flag) {
               mysql.query(`insert into user (username,password) values ('${username}','${password}')`, function (err, result) {
                  if (err) {
                     res.redirect("/mysqlerr");
                  } else {
                     res.redirect("/regsuccess");
                  }
               })
            }
         })
      }
   }else{
      res.redirect("/reg");
   }
   
});
router.use("/login",function(req,res){
   res.render("login");
});

router.use("/loginCheck",function(req,res,next){
   if(req.signedCookies.comming=="yes"){
      var username=req.body.username;
      var password=req.body.password;
      console.log(username);
      console.log(password);
      if(username==""||password==""){
         res.redirect("/user/login");
      }else{
         mysql.query("select * from user",function(err,rows){
            var flag=true;
            if(err){
               res.redirect("/error");
               flag=false;
            }
            if(flag){
               for(var i=0;i<rows.length;i++){
                  if(rows[i].username==username&&rows[i].password==password){
                     res.cookie("username",username,{signed:true});
                     res.redirect("/");
                  }
               }
            }
         })
      }
   }
});
module.exports=router;