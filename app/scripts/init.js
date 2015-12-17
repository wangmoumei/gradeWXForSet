'use strict';
var APIServerHost='http://192.168.18.121:8080/Geese_BUS';
var App = {
    Models: {},
    Routers: {},
    Collections: {},
    Views: {},
    UniversityId:'',
    zIndex:1,
    openid:'aaa',
    loading:function(status){
        if(status){
            $('#loading').addClass('show').removeClass('hide');
        }else{
            $('#loading').addClass('hide').removeClass('show');
        }
    },
    URL:{
    	//Token:'http://121.40.49.110/Token',
        //Token:'http://120.26.48.150:82/Geese.Houqinbao.Auth/Token',
    	getUser:APIServerHost + '/user/findByOpenid/'
    }
};
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.CHWeek = function(){
    switch (this.getDay()) {
        case 0: return '星期日';
        case 1: return '星期一';
        case 2: return '星期二';
        case 3: return '星期三';
        case 4: return '星期四';
        case 5: return '星期五';
        case 6: return '星期六';
    }
}
//alert($.ajaxJSONP);