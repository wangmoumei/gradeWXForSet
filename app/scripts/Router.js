App.Routers.AppRouter = Backbone.Router.extend({
	routes : {  
        '?:openId' : 'index', 
		'index?:openId' : 'index',
        'login' : 'login',
        'grade':'grade',
        '*error' : 'index'  
    },  
    index : function(openid) { 
        App.openid = App.openid || openid || 'aaa';
        App.zIndex=1;
        $('section.show').removeClass('show fadeIn').addClass('fadeOut');
        App.loading(true);
        /*$.ajax({
                url:App.URL.getUser,
                data:{
                    openid:App.openid
                },
                type:'POST',
                dataType:'JSON',
                success:function(response){
                    console.log(response);
                    App.user = new App.Models.UserModel(JSON.parse(response));
                    location.href="/";
                },error:function(){
                    $.tips({
                        content:'登录失败，请重试！',
                        stayTime:2000,
                        type:"warn"
                    });
                    App.loading();
                }
            });*/
        
        if(App.openid != 'aaa'){
            location.href = '#login';
            return;
        }else{
            App.user = new App.Models.UserModel({name:'王老师',openid:App.openid});
            if(this.indexView)
                this.indexView.render();
            else
                this.indexView = new App.Views.IndexView();
            
        }
        
    },
    login : function() { 
        App.loading();
        App.zIndex ++;
        $('#login').removeClass('hide fadeOut').addClass('show fadeIn').css('zIndex',App.zIndex);
        $('#userLogin').click(function(){
            var username = $('#username'),password = $('#password'),that = this;
            if(username.val().length<1){
                $.tips({
                    content:'请填写账号！',
                    stayTime:2000,
                    type:"warn"
                });
                username.focus();
                return;
            }else if(password.val().length<1){
                $.tips({
                    content:'请填写密码！',
                    stayTime:2000,
                    type:"warn"
                });
                password.focus();
                return;
            }
            App.loading(true);
            App.user = new App.Models.UserModel({name:'王老师',openid:App.openid});
            location.href="#index";
            /*$.ajax({
                url:App.URL.getUser,
                data:{
                    username:username.val(),
                    password:password.val(),
                    openid:App.openid
                },
                type:'POST',
                dataType:'JSON',
                success:function(response){
                    console.log(response);
                    App.user = new App.Models.UserModel(JSON.parse(response));
                    location.href="/";
                },error:function(){
                    $.tips({
                        content:'登录失败，请重试！',
                        stayTime:2000,
                        type:"warn"
                    });
                    App.loading();
                }
            });*/
        });
    },
    grade:function(){
        if(!App.room){
            location.href="#";
            return;
        }
        App.loading(true);
        if(this.gradeView)
            this.gradeView.render();
        else
            this.gradeView = new App.Views.GradeView();
        App.zIndex ++;
        $('#grade').removeClass('hide fadeOut').addClass('show fadeIn').css('zIndex',App.zIndex);
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