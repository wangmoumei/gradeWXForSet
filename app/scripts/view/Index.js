
'use strict';
App.Views.IndexView = Backbone.View.extend({
    el: $("#roomScroller"),
    initialize: function(){        
        if(App.areaList){
            this.render();
        }else{
            App.areaList = new App.Collections.AreaList;
			App.areaList.add(new App.Models.AreaModel({'name':'东门公寓',id:'1'}));
			App.areaList.add(new App.Models.AreaModel({'name':'南门公寓',id:'2'}));
            App.areaList.add(new App.Models.AreaModel({'name':'西区公寓',id:'3'}));
            App.areaList.add(new App.Models.AreaModel({'name':'西区宿舍',id:'4'}));
            App.areaList.add(new App.Models.AreaModel({'name':'北区二村',id:'5'}));
            App.areaList.add(new App.Models.AreaModel({'name':'本部公寓',id:'6'}));
            App.areaList.add(new App.Models.AreaModel({'name':'本部宿舍',id:'7'}));
            App.areaList.add(new App.Models.AreaModel({'name':'甬江公寓',id:'8'}));
            this.render();
            var that = this;
            $('#selectArea').click(function(){
                that.selectArea(that);
            });
            $('#selectFlat').click(function(){
                that.selectFlat(that);
            });
            /*
            App.areaList.fetch({
                url:App.URL.getStation,
                success:function(collection,response){  
                    //collection.each(function(station){
                    //   alert(station.get('name'));  
                    //});
                    if(response.length < 1){
                        $(".select-form").html('<div class="ui-notice"><i></i><p>没有站点</p><div class="ui-notice-btn"><button onclick="location.reload()" class="ui-btn-danger ui-btn-lg">刷新</button></div></div>');
                        App.loading();
                    }else{
                        that.render(collection);
                    }
                },
                error:function(){
                    $.tips({
						content:'获取站点失败，请刷新重试！',
                        stayTime:10000,
						type:"warn"
					});
                    App.stationList=null;
                    $(".select-form").html('<div class="ui-notice"><i></i><p>请检查网络</p><div class="ui-notice-btn"><button onclick="location.reload()" class="ui-btn-danger ui-btn-lg">刷新</button></div></div>');
                    App.loading();
                    
            }});*/
			
        }
        
    },

    render: function() {
        if(App.areaList){
            if(App.flatList){
                if(App.roomList){
                    var template = _.template($("#selectRoomTemplate").html());
                    $('#roomScroller').height(document.documentElement.clientHeight - 120).html(template({list:App.roomList})).find('li').click(function(){
                        App.room = parseInt($(this).attr('data-real'));
                        console.log(App.room);
                        location.href="#grade";
                    });
                    var evens = _.filter(App.roomList.models, function(o){ return o.get('status') == 1; });
                    $('#gradeProgress').html('<li class="ui-col ui-col-80"><div class="ui-progress"><span style="width:'+(evens.length / App.roomList.length * 100 )+'%"></span></div></li><li class="ui-col ui-col-20"><span>'+evens.length+'</span>/'+App.roomList.length+'</li>');
                    if(this.scroller)
                        this.scroller.refresh();
                    else
                        this.scroller = new fz.Scroll('#roomScroller', {
                            scrollY: true
                        });	
                    App.loading();
                }else{
                    this.selectFlat();
                }
            }else{
                this.selectArea();
            }
        }else{
            this.initialize();
        }
        
        
        /*.find('div').on('webkitTransitionEnd transitionend oTransitionEnd otransitionend transitionend',function(){
            console.log(scroller.getComputedPosition());
        });*/
    },
    selectArea:function(that){
        if(App.areaList){
            var template = _.template($("#selectAreaTemplate").html());
            $('#selectBox .ui-actionsheet-cnt h4').text('选择宿舍区');
            $('#selectBox').removeClass('hide fadeOut').addClass('show fadeIn').find('.select-list').html(template({list:App.areaList})).find('li').click(function(){
                if(App.areaid && App.areaid == parseInt($(this).attr('data-real'))){
                    $('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
                }else{
                    App.loading(true);
                    App.areaid = parseInt($(this).attr('data-real'));
                    //console.log(App.areaList.models);
                    $('#selectArea').text(App.areaList.models[App.areaid].get('name'));
                    //$.ajax({
                    //    url:App.URL.getArea
                    //})
                    App.flatList = new App.Collections.AreaList;
                    App.flatList.add(new App.Models.FlatModel({'name':App.areaList.models[App.areaid].get('name') + '#1',id:'1',aid:App.areaid}));
                    App.flatList.add(new App.Models.FlatModel({'name':App.areaList.models[App.areaid].get('name') + '#2',id:'2',aid:App.areaid}));
                    $('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
                    setTimeout(function(){
                        $('#selectFlat').click();
                    },300);
                    App.loading();
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
                if(App.flatid && App.flatid == parseInt($(this).attr('data-real'))){
                    $('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
                }else{
                    App.flatid = parseInt($(this).attr('data-real'));
                    $('#selectFlat').text(App.flatList.models[App.flatid].get('name'));
                    App.loading(true);
                    //$.ajax({
                    //    url:App.URL.getArea
                    //})
                    App.roomList = new App.Collections.RoomList;
                    App.roomList.add(new App.Models.RoomModel({'name':'101',id:'1',fid:App.flatid,status:1 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'102',id:'2',fid:App.flatid,status:1 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'103',id:'3',fid:App.flatid,status:1 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'104',id:'4',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'105',id:'5',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'106',id:'6',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'107',id:'7',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'201',id:'8',fid:App.flatid,status:1 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'202',id:'9',fid:App.flatid,status:1 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'203',id:'10',fid:App.flatid,status:1 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'204',id:'11',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'205',id:'12',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'206',id:'13',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'1001',id:'14',fid:App.flatid,status:1 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'1002',id:'15',fid:App.flatid,status:1 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'1003',id:'16',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'1004',id:'17',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'1101',id:'18',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'1102',id:'19',fid:App.flatid,status:0 }));
                    App.roomList.add(new App.Models.RoomModel({'name':'1103',id:'20',fid:App.flatid,status:0 }));
                    $('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
                    that.render();
                    App.loading();
                }
            });
        }else{
            that.selectArea();
        }
    }
});
