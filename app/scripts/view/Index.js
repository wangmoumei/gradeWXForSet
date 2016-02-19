
'use strict';
App.Views.IndexView = Backbone.View.extend({
    el: $("#roomScroller"),
    initialize: function(){   
        var that = this;     
        if(App.areaList){
            this.render();
            $('#selectArea').click(function(){
                that.selectArea(that);
            });
            $('#selectFlat').click(function(){
                that.selectFlat(that);
            });
        }else{
            location="#index";
        }
        
    },

    render: function() {
        if(App.areaList){
            if(App.flatList){
                if(App.roomList){
                    var template = _.template($("#selectRoomTemplate").html());
                    $('#roomScroller').height(document.documentElement.clientHeight - 120).html(template({list:App.roomList})).find('li').click(function(){
                        App.room = parseInt($(this).attr('data-real'));
                        location.href="#grade";
                    });
                    var evens = _.filter(App.roomList.models, function(o){ return o.get('checkStyle') == 'true'; });
                    $('#gradeProgress').html('<li class="ui-col ui-col-80"><div class="ui-progress"><span style="width:'+(evens.length / App.roomList.length * 100 )+'%"></span></div></li><li class="ui-col ui-col-20"><span>'+evens.length+'</span>/'+App.roomList.length+'</li>');
                    new fz.Scroll('#roomScroller', {
                            scrollY: true
                    });
                    App.loading();
                }else{
                    this.selectFlat(this);
                }
            }else{
                this.selectArea(this);
            }
        }else{
            this.initialize();
        }
    },
    selectArea:function(that){
        if(App.areaList){
            var template = _.template($("#selectAreaTemplate").html());
            $('#selectBox .ui-actionsheet-cnt h4').text('选择宿舍区');
            $('#selectBox').removeClass('hide fadeOut').addClass('show fadeIn').find('.select-list').html(template({list:App.areaList})).find('li').click(function(){
                var n = parseInt($(this).attr('data-real'));
                if(App.areaid && App.areaid == n){
                    $('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
                }else{
                    App.loading(true);
                    App.areaid = n;
                    $('#selectArea').text(App.areaList.models[n].get('areaname'));
                    App.flatList = new App.Collections.AreaList;
                    App.flatList.fetch({
                        url:App.URL.getFlat + App.areaList.models[n].get('areaid'),
                        success:function(collection,response){  
                            App.loading();
                            $('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
                            setTimeout(function(){
                                $('#selectFlat').click();
                            },200);
                        },error:function(){
                            $.tips({
                                content:'查询楼栋信息失败，请重试！',
                                stayTime:10000,
                                type:"warn"
                            });
                            App.flatList=null;
                            App.loading();
                        }
                    });
                }
            });
            App.loading();
        }else{
            that.initialize();
        }
    },
    selectFlat:function(that){
        if(App.flatList){
            $('#selectBox .ui-actionsheet-cnt h4').text('选择楼栋号');
            var template = _.template($("#selectFlatTemplate").html());
            $('#selectBox').removeClass('hide fadeOut').addClass('show fadeIn').find('.select-list').html(template({list:App.flatList})).find('li').click(function(){
                var n = parseInt($(this).attr('data-real'));
                if(App.flatid && App.flatid == n){
                    $('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
                }else{
                    App.flatid = n;
                    $('#selectFlat').text(App.flatList.models[n].get('flatname'));
                    App.loading(true);
                    //$.ajax({
                    //    url:App.URL.getArea
                    //})
                    App.roomList = new App.Collections.RoomList;
                    App.roomList.fetch({
                        url:App.URL.getRoom + App.flatList.models[n].get('flatid'),
                        success:function(collection,response){  
                            App.loading();
                            $('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
                            that.render();
                        },error:function(){
                            $.tips({
                                content:'查询寝室信息失败，请重试！',
                                stayTime:10000,
                                type:"warn"
                            });
                            App.roomList=null;
                            App.loading();
                        }
                    });
                }
            });
        }else{
            that.selectArea();
        }
    }
});
