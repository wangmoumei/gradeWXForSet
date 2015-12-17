App.Models.FlatModel = Backbone.Model.extend({
    defaults: {
        id:0,
		aid:0,
        name: ''
    }
});
App.Collections.FlatList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.FlatModel,
    url: ''
});