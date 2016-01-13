define(function(){ "use strict";

var EntityDropdown = mini.Class.subclass({
	input: null,
	boundShow: null,
	div: null,

	initialize: function( elementId, initialValue ) {
		this.input = jQuery(elementId);
        this.input.val(initialValue);
		this.searchString = initialValue;
        this.input.keyup((function() {
			this.searchString = this.input.val();
        }).bind(this));

		this.boundHide = this.hide.bind(this);
		this.input.bind('focus', this.show.bind(this) );
		
		this.div = jQuery('<div/>', {'class':'selectFileDialog'});
		this.input.after( this.div );
		this.div.bind('mousedown', this.noHide.bind(this) );
	},

	getInput: function() {
		return this.searchString;
	},

	
	noHide: function(event) {
		event.stopPropagation();
	},
	
	
	show: function( event ) {
		var inputPos = this.input.position();
		var inputHeight = parseInt(this.input.innerHeight()) + parseInt(this.input.css('margin-top'));
		var inputWidth = this.input.innerWidth();
		jQuery(document).bind( 'mousedown', this.boundHide );
		this.div.css({
			'top': inputPos.top + inputHeight + 1,
			'left': inputPos.left,
			'width': inputWidth
		}).slideDown(100);
	},
	
	
	hide: function() {
		//jQuery(document).unbind( 'mousedown', this.boundHide );
		//this.div.slideUp(100);
	},

	focusCameraOn: function(entity, layer) {
        env.camera.track(entity.body, layer);
		this.input.blur();
		this.hide();
	}
});

return EntityDropdown;

});