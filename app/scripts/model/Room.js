App.Models.RoomModel = Backbone.Model.extend({
    defaults: {
        id:0,
		fid:0,
        name: '',
        grade:[
            {name:'值日表',grade:5},
            {name:'垃圾处理',grade:15},
            {name:'地/墙/门/桌椅',grade:15},
            {name:'寝室布置',grade:5},
            {name:'其他不良习惯',grade:5},
            {name:'床上被服用品',grade:10},
            {name:'洗漱饮食用具',grade:10},
            {name:'书籍物品存放',grade:10},
            {name:'衣帽用品挂放',grade:10},
            {name:'床下鞋子物品',grade:10}
        ],
        status:0
    }
});
App.Collections.RoomList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.FlatModel,
    url: ''
});