+function ($) {
    "use strict";
    var pluginName = "textareaAutoSize";
	var pluginDataName = "plugin_" + pluginName;

	var containsText = function (value) {
		return (value.replace(/\s/g, '').length > 0);
	};

	function Plugin(element, options) {
	    this.element = element;
	    this.$element = $(element);	    
	    this.init();
	}

	Plugin.prototype = {
	  init: function() {
	  	console.info(this.$element.outerHeight());
	    var height = this.$element.outerHeight();
	    var diff = parseInt(this.$element.css('paddingBottom')) +
	               parseInt(this.$element.css('paddingTop')) || 0;

	    if (containsText(this.element.value)) {
	      this.$element.height(this.element.scrollHeight - diff);
	    }

	    // keyup is required for IE to properly reset height when deleting text
	    this.$element.on('input keyup', function(event) {
	      var $window = $(window);
	      var currentScrollPosition = $window.scrollTop();

	      $(this).height(0).height(this.scrollHeight - diff);
	      $window.scrollTop(currentScrollPosition);
	    });
	  }
	};
	$.fn.textareaAutoSize = function(params) {
        return this.each(function() {
            if(!this) return;
            var $this = $(this);
            if (!$this.data(pluginDataName)) {
		      $this.data(pluginDataName, new Plugin(this, params));
		    }
        });
    };
}(Zepto);