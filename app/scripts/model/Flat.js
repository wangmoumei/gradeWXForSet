App.Models.FlatModel = Backbone.Model.extend({
    defaults: {
        flatid:0,
		areaid:0,
        flatname: '',
        flatnum:0,
        floornums:0
    }
});
App.Collections.FlatList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.FlatModel,
    url: ''
});