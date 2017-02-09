var request=require("request");
var cheerio=require("cheerio");
module.exports.readCategory=function(url,callback) {
    request(url, function (err, head, body) {
        if (body) {
            var $ = cheerio.load(body);
            var arr = [];
            $(".col_w1000 .col_nav ul li").each(function (index, obj) {
                if (index == 2 || index == 3 || index == 4 || index == 6) {
                    var obj = {};
                    var cname = $(this).find("a").html();
                    cname = unescape(cname.replace(/&#x/g, "%u").replace(/;/g, ""));
                    var curl = $(this).find("a").attr("href");
                    obj.cname = cname;
                    obj.curl = curl;
                    obj.cid = index;
                    arr.push(obj);
                }
            });
            callback(arr);
        } else {
            console.log("sorry notfound category");
        }
    });
};

module.exports.readList=function(url,callback) {
    request(url, function (err, head, body) {
        if (body) {
            var arr = [];
            var $ = cheerio.load(body);
            $(".juti_new .juti_list h3 a").each(function (index, obj) {
                arr.push($(this).attr("href"));
            });
            callback(arr);
        } else {
            console.log("sorry notfound list");
        }
    });
};

module.exports.readArc=function(url,callback){
    request(url,function (err,head,body) {
        if(body){
            var obj={};
            var $=cheerio.load(body);
            var atitle=$("#artical_topic").html()?$("#artical_topic").html():"";
            atitle=unescape(atitle.replace(/&#x/g,"%u").replace(/;/g,""));
            var acon=$("#main_content").html()?$("#main_content").html():"";
            var imgs="";
            acon=acon.replace(/<img[^src]+src="([^"]+)/g,function(one,two){
                imgs+=two+";";
                return one;
            }).replace(/<[^>]+>|\/[^>]+>/g,"").replace(/\n/g,"");
            acon=unescape(acon.replace(/&#x/g,"%u").replace(/;/g,""));
            obj.atitle=atitle;
            obj.aimg=imgs.slice(0,-1);
            obj.acon=acon;
            callback(obj);
        }else{
            console.log("this fond is error");
        }
    });
};
