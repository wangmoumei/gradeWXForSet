App.Models.AreaModel = Backbone.Model.extend({
    defaults: {
        id:0,
        name: ''
    }
});
App.Collections.AreaList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.AreaModel,
    url: ''
});