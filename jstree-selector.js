(function ($, undefined) {
    "use strict";
    $.jstree.plugins.selector = function (options, parent) {
        this.bind = function () {
        	
            parent.bind.call(this);
            this.element.on("change", ".jstree-selector", $.proxy(function (e) {
            	var node = this.get_node($(e.target));
	        	$(e.target).trigger( "change_selector.jstree", [node, $(e.target)]);
	        }, this));
            
        };
        this.teardown = function () {
            if(this.settings.questionmark) {
                this.element.find(".jstree-selector").remove();
            }
            parent.teardown.call(this);
        };
        this.redraw_node = function(obj, deep, callback) {
        	var node = this.get_node(obj);
        	var param = this.settings.selector.param;
        	var array = this.settings.selector.options;
            var select = document.createElement("SELECT");
            select.id = "selector";
            select.className  = "jstree-selector";
            select.setAttribute("style", "appearance: button;-moz-appearance: button;" +
            		"	-webkit-appearance: button;height: auto;width:100px;position:relative;" +
            		"color:inherit;text-decoration:none;display:inline-block;" +
            		"vertical-align:top;white-space:nowrap;margin-left:10px;");
            obj = parent.redraw_node.call(this, obj, deep, callback);
            if(node.parent === '#') {
                for (var i = 0; i < array.length; i++) {
                    var option = document.createElement("OPTION");
                    option.value = array[i].value;
                    option.text = array[i].text;
                    if(node.data != null && array[i].value == node.data[param]){
                    	option.setAttribute("selected", true)
                    }
                    select.appendChild(option);
                }

                var tmp = select.cloneNode(true);
                obj.insertBefore(tmp, obj.childNodes[3]);
                array = [];
            }
            return obj;
        };
    };
})(jQuery);
