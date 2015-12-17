
'use strict';
App.Views.GradeView = Backbone.View.extend({
    el: $("#grade"),
	events: {
        'click #gradeSave': 'gradeSave',
        'click #gradeReset': 'gradeReset'
        
        
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
        $('#gradeScroller').height(document.documentElement.clientHeight - 95).find('div.ui-badge-wrap').click(function(){
            var n = parseInt($(this).html()),m = parseInt($(this).find('div.ui-badge-cornernum').text()),s = parseInt($('#gradeSum').text());
            console.log(n + '||' + m + '||' + s)
            if(n>0){
                $(this).html((n-1) + '<div class="ui-badge-cornernum"> ' + (m-1) + ' </div>');
                $('#gradeSum').text(s-1);
            }
        });
        setTimeout(function(){
            new fz.Scroll('#gradeScroller', {
                scrollY: true
            });
        },100)
        	
        App.loading();
    },
	gradeSave:function(){
		alert(111);
	},
    gradeReset:function(){
        this.render();
    }
});
