var ejs=require("ejs");
var mysql=require("./mysql");
var express=require("express");
var async=require("async");
var request=require("request");
var child=require("child_process");
var cheerio=require("cheerio");
var body=require("body-parser");
var cookie=require("cookie-parser");
child.fork("test.js");
var app=express();
app.use(cookie("zhuruifang"));
app.set("views","./views");
app.engine('html', require('ejs').renderFile);
app.set("view engine","html");
app.use(body.urlencoded({ extended: false }));
app.use("/static",express.static("public"));
app.listen(8080);
app.use(function(req,res,next){
    next();
});
app.use(function(req,res,next){
   mysql.query("select * from category",function(err,rows){
       res.locals.categorys=rows;
       next();
   });
});
// app.get("/",function(req,res){
//     mysql.query("select * from arc where cid=2",function(err,rows){
//         res.render("index",{ino:rows});
//     });
//    
// });
app.get("/",function(req,res){
    var obj={};
    async.series([
        function(cb){
            mysql.query("select * from arc where cid=2 order by id desc limit 3",function(error,rows){
                obj.title2=rows;
                cb();
            })
        },
        function(cb){
            mysql.query("select * from arc where cid=3 order by id desc limit 3",function(error,rows){
                obj.title3=rows;
                cb();
            })
        },
        function(cb){
            mysql.query("select * from arc where cid=4 order by id desc limit 3",function(error,rows){
                obj.title4=rows;
                cb();
            })
        },
        function(cb){
            mysql.query("select * from arc where cid=6 order by id desc limit 3",function(error,rows){
                obj.title6=rows;
                cb();
            })
        }
    ],function(){
        res.render("index",obj);
        console.log("ok!!");
    })
});


app.get("/list/:cid",function(req,res){
    var cid=req.params.cid;
    mysql.query("select * from arc where cid="+cid+" limit 0,10",function(err,rows){
        res.render("list",{lists:rows})
    });
});

app.get("/show/:id",function(req,res){
    var id=req.params.id;
    mysql.query("select * from arc where id="+id,function(error,rows){
        mysql.query("select * from liuyan where aid="+id+" order by id desc limit 2",function(err,rows1){
            res.render("show",{shows:rows,liuyan:rows1});
        });
    })
});
app.post("/ajax/",function(req,res){
    var cid=req.body.cid;
    var num=req.body.num*3+7;
    mysql.query("select * from arc where cid="+cid+" limit "+num+",3",function(err,rows){
        res.send(rows);
    })
});

app.post("/express",function(req,res){
   var url=req.body.url;
    var arr="";
    request(url,function(err,head,body){
        if(body) {
            var $ = cheerio.load(body);
            $("#navmenu > li").each(function () {
                var str = $(this).find("a").html();
                arr += str + "|";
            });
            res.send(arr.slice(0,-1));
        }else{
            console.log("express so bad");
        }
    })
});


/*router 路径配置*/
var router=require("./router/router.js");
var crouter=require("./router/error.js");
var liuyan=require("./router/liuyan.js");
app.use("/liuyan",liuyan);
app.use("/user",router);
app.use(crouter);

