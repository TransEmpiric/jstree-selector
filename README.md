# jstree-selector
A jsTree plugin which provides a select (form input) for persisted trees.

##What is jsTree?

jsTree is a tree view for jQuery (depends on 1.9.1 or later). 
It is absolutely free (MIT licence) at [http://www.jstree.com/](http://www.jstree.com/) or at [https://github.com/vakata/jstree](https://github.com/vakata/jstree) and supports all modern browsers and IE from version 8 up. 
jsTree can display trees by parsing HTML or JSON and supports AJAX, it is themeable and easy to configure and customize. Events are fired when the user interacts with the tree. Other notable features are inline editing, drag'n'drop support, fuzzy searching (with optional server side calls), tri-state checkbox support, configurable node types, AMD compatibility, easily extendable via plugins.
    
## Getting Started

Download or checkout the latest copy and include jQuery and jsTree scripts and jsTree defualt css as well as jstree-selector.js file in your web page.

```html
<link rel="stylesheet" href="dist/themes/default/style.css" />
<script src="dist/libs/jquery.js"></script>
<script src="dist/jstree.min.js"></script>
<script src="path/to/jstree-selector.js"></script>
<div id="jsTree"></div>
<script>        
$scope.buildTree = function() {
    $http.get(API_URL + 'categoryAttributeType/findAllByCategory', {
	params: {
	    categories: [$scope.selectedCategory.enum]
	}
     })
	.success(function(message, status, headers, config) {
	    $('#jsTree').jstree({
		"core": {
		    "html_titles": true,
		    "animation": 0,
		    "themes": {
			"stripes": true
		    },
		    "check_callback": true,
		    'data': message.data
		},
		"selector": {
		    "rename": {
			"on": true
		    },
		    "remove": {
			"on": true
		    },
		    "add": {
			"on": true
		    },
		    "info": {
			"on": true
		    }
		},
		"types": {
		    "USER_RATING_SCALE": {
			"icon": "glyphicon glyphicon-user",
			"valid_children": $scope.jsTreeTypes
		    },
		    "SELECT": {
			"icon": "glyphicon glyphicon-th-list",
			"valid_children": $scope.jsTreeTypes
		    },
		    "STRING": {
			"icon": "glyphicon glyphicon-font",
			"valid_children": $scope.jsTreeTypes
		    },
		    "INTEGER": {
			"icon": "glyphicon glyphicon-scale",
			"valid_children": $scope.jsTreeTypes
		    },
		    "FLOAT": {
			"icon": "glyphicon glyphicon-scale",
			"valid_children": $scope.jsTreeTypes
		    },
		    "DATE": {
			"icon": "glyphicon glyphicon-calendar",
			"valid_children": $scope.jsTreeTypes
		    },
		    "BOOLEAN": {
			"icon": "glyphicon glyphicon-ok",
			"valid_children": $scope.jsTreeTypes
		    },
		    "URL": {
			"icon": "glyphicon glyphicon-link",
			"valid_children": $scope.jsTreeTypes
		    },
		},
		"plugins": [
		    "state", "types", "wholerow", "selector", "search"
		]
	    });
	    $('#jsTree').unbind("rename_node.jstree " +
		"click_selector_info.jstree " +
		"click_selector_create.jstree " +
		"click_selector_delete.jstree " +
		"click_selector_edit.jstree " +
		"delete_node.jstree " +
		"create_node.jstree " +
		"change_selector.jstree");
	    $('#jsTree').on("rename_node.jstree " +
		"click_selector_info.jstree " +
		"click_selector_create.jstree " +
		"click_selector_delete.jstree " +
		"click_selector_edit.jstree " +
		"delete_node.jstree " +
		"create_node.jstree " +
		"change_selector.jstree",
		function(event, data, e) {
		    var type = event.type;
		    if (type === 'delete_node') {
			$scope.deleteNode(data.node);
		    } else if (type === 'rename_node') {
			$scope.node.id = data.node.id;
			$scope.node.parent = data.node.parent;
			$scope.node.name = data.node.text;
			$scope.node.description = null;
			$scope.node.code = null;
			$scope.updateNode();
		    } else if (type === 'change_selector') {
			$scope.updateScoreGroup(data, e.val());
		    } else if (type === 'click_selector_edit') {
			$scope.renameNode(data);
		    } else if (type === 'click_selector_delete') {
			$scope.removeNode(data);
		    } else if (type === 'click_selector_create') {
			$scope.newNodeForm(data);
		    } else if (type === 'click_selector_info') {
			$scope.showNodeInfo(data);
		    }
		});

	    $(".search-input").keyup(function() {
		var searchString = $(this).val();
		$('#jsTree').jstree('search', searchString);
	    });
	});
};
</script>
```
