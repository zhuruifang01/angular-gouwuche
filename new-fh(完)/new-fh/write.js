var read=require("./read");
var fs=require("fs");
var path=require("path");
var mysql=require("./mysql");
var async=require("async");
var http=require("http");

module.exports.writeCategory=function(url,callback){
  var newdata;
    read.readCategory(url,function(data){
       newdata=data;
        async.each(data,function(obj,cb){
            mysql.query(`replace into category (cname,curl,cid) values ('${obj.cname}','${obj.curl}',${obj.cid})`,function(){
                cb();
            })
        },function(err,cb1){
           callback(newdata);
            console.log("category is ok");
        });
    });
};

module.exports.writeArc=function(url,callback){
    var newdata;
    read.readArc(url,function(data){
        newdata = data;
        if(data.aimg!=="") {
            var imgarr=data.aimg.split(";");
            async.each(imgarr, function (obj, cb) {
                if(/\.(jpg|png|jpeg|gif)/.test(obj)) {
                    http.get(obj,function(res){
                        var basename = path.basename(obj);
                        res.pipe(fs.createWriteStream("./public/img/"+basename));
                        cb();
                    });
                }
            }, function (err,cb1) {
                callback(newdata);
                console.log("img download over");
            })
        }
    })
};