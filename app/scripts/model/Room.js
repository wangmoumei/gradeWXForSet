App.Models.RoomModel = Backbone.Model.extend({
    defaults: {
        checkStyle:'false',
        roomid:0,
		flatid:0,
        floornum:0,
        roomname:'',
        roomnum:0,
        sum:100,
        status:0
    }
});
App.Collections.RoomList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.RoomModel,
    url: ''
});