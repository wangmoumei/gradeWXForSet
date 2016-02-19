App.Models.AreaModel = Backbone.Model.extend({
    defaults: {
        areaid:0,
        areaname: ''
    }
});
App.Collections.AreaList = Backbone.Collection.extend({
    initialize: function() {
		
    },
    model: App.Models.AreaModel,
    url: ''
});