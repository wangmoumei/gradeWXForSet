App.Routers.AppRouter = Backbone.Router.extend({
	routes : {  
        '?:openId' : 'index', 
		'index?:openId' : 'index',
        'login' : 'login',
        'grade':'grade',
        '*error' : 'index'  
    },  
    index : function(openid) { 
        App.openid = App.openid || (location.href.split('?')[1]||'').split('&')[0]||null;
        App.UniversityId= App.UniversityId || (location.href.split('?')[1]||'').split('&')[1]||null;
        if(!App.openid){
            $('#roomScroller').html('<div class="ui-notice"><i></i><p>查询生活区信息失败（缺乏身份识别）</p></div>')
            App.loading();
            return;
        }else{
            App.openid = App.openid.split('#')[0] || App.openid;
        }
        if(!App.UniversityId){
            $('#roomScroller').html('<div class="ui-notice"><i></i><p>查询生活区信息失败（缺乏身份识别）</p></div>')
            App.loading();
            return;
        }else{
            App.UniversityId = App.UniversityId.split('#')[0] || App.UniversityId;
        }
        App.zIndex=1;
        $('section.show').removeClass('show fadeIn').addClass('fadeOut');
        var that = this;
        App.loading(true);
        if(App.user)
        {
            if(App.areaList){
                if(that.indexView)
                    that.indexView.render();
                else
                    that.indexView = new App.Views.IndexView();
            }else{
                App.areaList = new App.Collections.AreaList;
                App.areaList.fetch({
                    url:App.URL.getArea + App.UniversityId,
                    success:function(collection,response){  
                        App.loading();
                        if(that.indexView)
                            that.indexView.render();
                        else
                            that.indexView = new App.Views.IndexView();
                    },error:function(){
                        $.tips({
                            content:'查询生活区信息失败，请重试！',
                            stayTime:10000,
                            type:"warn"
                        });
                        $('#roomScroller').html('<div class="ui-notice"><i></i><p>查询生活区信息失败</p><div class="ui-notice-btn"><button class="ui-btn-danger ui-btn-lg" onclick="location.reload()">刷新</button></div></div>')
                        App.areaList=null;
                        App.loading();
                    }
                });
            }
        }
        else
            $.ajax({
                url:App.URL.getUser + App.openid + '/' + App.UniversityId,
                type:'GET',
                dataType:'JSON',
                success:function(response){
                    var result = JSON.parse(response);
                    if(result.message == 'success'){
                        App.weeknum = result.weeknum;
                        App.areaList = new App.Collections.AreaList(result.list);
                        App.user = new App.Models.UserModel({openid:App.openid});
                        if(that.indexView)
                            that.indexView.render();
                        else
                            that.indexView = new App.Views.IndexView();
                    }else{
                        location.href="#login";
                    }
                },error:function(){
                    $.tips({
                        content:'登录失败，请重试！',
                        stayTime:2000,
                        type:"warn"
                    });
                    $('#roomScroller').html('<div class="ui-notice"><i></i><p>登录失败</p><div class="ui-notice-btn"><button class="ui-btn-danger ui-btn-lg" onclick="location.reload()">刷新</button></div></div>')
                    App.loading();
                }
            });
    },
    login : function() { 
        App.loading();
        if(!App.openid){
            location.href="#";
            return;
        }
        App.zIndex ++;
        $('#login').removeClass('hide fadeOut').addClass('show fadeIn').css('zIndex',App.zIndex);
        $('#userLogin').click(function(){
            var username = $('#username'),password = $('#password');
            if(username.val().trim().length<1){
                $.tips({
                    content:'请填写账号！',
                    stayTime:2000,
                    type:"warn"
                });
                username.focus();
                return;
            }else if(password.val().trim().length<1){
                $.tips({
                    content:'请填写密码！',
                    stayTime:2000,
                    type:"warn"
                });
                password.focus();
                return;
            }
            App.loading(true);
            
            $.ajax({
                url:App.URL.login,
                data:{
                    useraccount:username.val().trim(),
                    password:password.val().trim(),
                    openid:App.openid,
                    universityid:App.UniversityId
                },
                type:'POST',
                dataType:'JSON',
                success:function(response){
                    var result = JSON.parse(response);
                    if(result.message == 'success'){
                        App.user = new App.Models.UserModel({openid:App.openid});
                        App.weeknum = result.weeknum;
                        App.areaList = new App.Collections.AreaList(result.list);
                        location.href="#index";
                    }else{
                        $.tips({
                            content:result.message,
                            stayTime:2000,
                            type:"warn"
                        });
                        App.loading();
                    }
                },error:function(){
                    $.tips({
                        content:'登录失败，请重试！',
                        stayTime:2000,
                        type:"warn"
                    });
                    App.loading();
                }
            });
        });
    },
    grade:function(){
        if(App.room>=0){
            App.loading(true);
            if(this.gradeView)
                this.gradeView.refresh();
            else
                this.gradeView = new App.Views.GradeView();
            App.zIndex ++;
            $('#grade').removeClass('hide fadeOut').addClass('show fadeIn').css('zIndex',App.zIndex);
        }
        else
            location.href="#";
    },
    renderError : function(error) {  
        console.log('URL错误, 错误信息: ' + error);  
    }  
}); 
$('section').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
    if($(this).hasClass('fadeOut'))
        $(this).removeClass('show').addClass('hide').css('zIndex',App.zIndex);
});
$(function(){
    new App.Routers.AppRouter();  
     
    Backbone.history.start();
    //location.href='#';
});