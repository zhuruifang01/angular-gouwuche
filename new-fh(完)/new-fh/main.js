var write=require("./write");
var mysql=require("./mysql");
var async=require("async");
var read=require("./read");
var path=require("path");
var categoryInfo;
var listInfo=[];

module.exports=function() {
    async.series([
        function (cb) {
            write.writeCategory("http://news.ifeng.com/", function (data) {
                categoryInfo = data;
                cb();
            })
        },
        function (cb) {
            async.each(categoryInfo, function (obj, cb1) {
                read.readList(obj.curl, function (list) {
                    var obj1 = {};
                    obj1.url = list;
                    obj1.cid = obj.cid;
                    listInfo.push(obj1);
                    cb1();
                })
            }, function () {
                cb();
            });
        },
        function (cb) {
            async.each(listInfo, function (obj, cb1) {
                async.each(obj.url, function (url, cb2) {
                    write.writeArc(url, function (data) {
                        var basename = "";
                        var imgarr = data.aimg.split(";");
                        for (var i = 0; i < imgarr.length; i++) {
                            basename += path.basename(imgarr[i]) + ";";
                        }
                        basename = basename.slice(0, -1);
                        mysql.query(`replace into arc (atitle,acon,aimg,cid) values ('${data.atitle}','${data.acon}','${basename}',${obj.cid})`, function () {
                            cb2();
                        });
                    });
                }, function (err) {
                    cb1();
                });
            }, function (err) {
                cb();
            });
        }
    ], function () {
        console.log("all ok")
    });
};