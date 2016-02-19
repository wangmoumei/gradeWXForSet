
'use strict';
App.Views.GradeView = Backbone.View.extend({
    el: $("#grade"),
	events: {
        'click #gradeSave': 'gradeSave',
        'click #gradeReset': 'gradeReset',
        'click button': 'gradeMinus',
        
        
    },
    initialize: function(){  
        $('#gradeScroller').height(document.documentElement.clientHeight - 95);
        
        var that = this;      
        if(App.gradeList){
            this.refresh();
        }else{
			App.gradeList = new App.Collections.GradeList;
            App.gradeList.fetch({
                url:App.URL.getGradeList + App.UniversityId,
                success:function(collection,response){  
                    App.loading();
                    that.refresh();
                },error:function(){
                    $.tips({
                        content:'查询打分项失败，请重试！',
                        stayTime:10000,
                        type:"warn"
                    });
                    App.gradeList=null;
                    App.loading();
                }
            });
        }
        
    },
    
    render: function() {
        var template = _.template($("#selectGradeTemplate").html());
		$('#grade').html(template({
            room:App.roomList.models[App.room],
            title:App.flatList.models[App.flatid].get('flatname'),
            gradeList:App.gradeList
        }));
        if(this.scroller)
            this.scroller.refresh();
        else
            this.scroller = new fz.Scroll('#gradeScroller', {
                scrollY: true
            });
        
        
        App.loading();
    },
	gradeSave:function(){
        App.loading(true);
        var str = '{"jsonstr":[',that = this;
        App.gradeList.each(function(grade){
            //str.push({itemid:grade.get('code'),score:grade.get('vkey'),weeknum:App.weeknum,roomid:App.roomList.models[App.room].get('roomid')})
            str += '{'
                +'"itemid":"'+ grade.get('code') +'",'
                +'"score":"'+ grade.get('score') +'",'
                +'"weeknum":"'+ App.weeknum +'",'
                +'"roomid":"'+App.roomList.models[App.room].get('roomid') +'"'
            +'},'
        });
        str += ']}';
        $.ajax({
            url:App.URL.setGrade,
            data:{jsonstring:str},
            type:'POST',
            dataType:'JSON',
            success:function(response){
                var result = JSON.parse(response);
                if(result.message == 'success'){
                    App.loading();
                    $.tips({
                        content:'保存成功！',
                        stayTime:1000,
                        type:"success"
                    });
                    App.roomList.models[App.room].set({checkStyle:'true'});
                    App.room++;
                    if(App.room >= App.roomList.length){
                        $.tips({
                            content:'已经评完所有寝室了！',
                            stayTime:2000,
                            type:"success"
                        });
                        location.href="#index";
                    }
                    else{
                        that.refresh();
                    }
                }
                else{
                    $.tips({
                        content:result.message,
                        stayTime:2000,
                        type:"warn"
                    });
                    App.loading();
                }
            },error:function(){
                $.tips({
                    content:'保存失败，请重试！',
                    stayTime:2000,
                    type:"warn"
                });
                App.loading();
            }
        });
	},
    gradeMinus:function(){
        var button = $( event.target ).closest("button").get(0);
        var n = parseInt($(button).attr('data-real'));
        var grade = App.gradeList.models[n];
        if(grade.minus()){
            this.render();
        }
    },
    gradeReset:function(){
        App.gradeList.refresh();
        this.render();
    },
    refresh:function(){
        if(App.roomList.models[App.room].get('checkStyle') =='false'){
            App.gradeList.refresh();
            this.render();
        }else{
            var that = this;
            $.ajax({
                url:App.URL.getRoomGrade + App.roomList.models[App.room].get('roomid') + '/' + App.weeknum,
                type:'GET',
                dataType:'JSON',
                success:function(response){
                    var result = JSON.parse(response);
                    if(result.message == 'success'){
                        App.gradeList = new App.Collections.GradeList(result.list);
                        that.render();
                    }
                    else{
                        $.tips({
                            content:result.message,
                            stayTime:10000,
                            type:"warn"
                        });
                    }
                    App.loading();
                    
                },error:function(){
                    $.tips({
                        content:'查询寝室分数失败，请重试！',
                        stayTime:10000,
                        type:"warn"
                    });
                    location.href="#";
                    App.gradeList=null;
                    App.loading();
                }
            });
        }
    }
});
