
'use strict';
App.Views.GradeView = Backbone.View.extend({
    el: $("#grade"),
	events: {
        'click #gradeSave': 'gradeSave',
        'click #gradeReset': 'gradeReset',
        'click button': 'gradeMinus',
        
        
    },
    initialize: function(){        
        if(App.room){
            this.render();
        }else{
			location.href="#";
        }
        
    },

    render: function() {
        var template = _.template($("#selectGradeTemplate").html());
		$('#grade').html(template({room:App.roomList.models[App.room],title:App.flatList.models[App.flatid].get('name') }));
        $('#gradeScroller').height(document.documentElement.clientHeight - 95);
        
            new fz.Scroll('#gradeScroller', {
                scrollY: true
            });
        
        	
        App.loading();
    },
	gradeSave:function(){
		alert(111);
	},
    gradeMinus:function(){
        //console.log(App.roomList.models[App.room]);
        var button = $( event.target ).closest("button").get(0);
        var n = parseInt($(button).attr('data-real')),s = App.roomList.models[App.room].get('sum');
        var room = App.roomList.models[App.room].get('grade')[n];
        room.grade -- ;
        //console.log(n + '||' + m + '||' + s)
        if(room.grade>=0){
            room.minus --;
            s--;
            App.roomList.models[App.room].set({'sum':s});
            $(button).html(room.grade + '<span class="ui-badge-cornernum"> ' + room.minus + ' </span>');
            $('#gradeSum').text(s);
        }else
        {
            room.grade = 0;
        }
    },
    gradeReset:function(){
        _.each(App.roomList.models[App.room].get('grade'),function(e){
            if(e.minus!=0){
                e.grade -= e.minus;
                e.minus = 0;
            }
        });
        App.roomList.models[App.room].set({'sum':100});
        this.render();
    }
});
