App.Models.GradeModel = Backbone.Model.extend({
    defaults: {
        code:0,
        fcode:0,
        name: "",
        universityid: "",
        vkey: 0,
        xh: 1,
        minus:0,
        score:-1
    },
    initialize:function(){
        if(typeof this.attributes.vkey != 'number') {
            this.attributes.vkey = parseInt(this.attributes.vkey);
        }
        if(typeof this.attributes.score != 'number') {
            this.attributes.score = parseInt(this.attributes.score);
        }
        if(this.attributes.score>-1){
            this.attributes.minus =  this.attributes.score - this.attributes.vkey;
        }else{
            this.attributes.score = this.attributes.vkey;
        }
    },
    minus:function(){
        if(this.attributes.score>0){
            this.attributes.minus --;
            this.attributes.score --;
            return true;
        }else return false;
    },
    refresh:function(){
        this.attributes.score = this.attributes.vkey;
        this.attributes.minus = 0;
    }
});
App.Collections.GradeList = Backbone.Collection.extend({
    initialize: function() {
    },
    model: App.Models.GradeModel,
    url: '',
    refresh:function(){
        for(var i=0;i<this.length;i++){
            this.models[i].refresh();
        }
    }
});