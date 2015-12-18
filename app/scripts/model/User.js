App.Models.UserModel = Backbone.Model.extend({
    defaults: {
        id:0,
        name: ''
    }
});
App.Collections.UserList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.UserModel,
    url: ''
});