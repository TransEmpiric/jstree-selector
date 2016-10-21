# jstree-selector
A jsTree plugin which provides a select (form input) for persisted trees.

##What is jsTree?

jsTree is a tree view for jQuery (depends on 1.9.1 or later). 
It is absolutely free (MIT licence) at [http://www.jstree.com/](http://www.jstree.com/) or at [https://github.com/vakata/jstree](https://github.com/vakata/jstree) and supports all modern browsers and IE from version 8 up. 
jsTree can display trees by parsing HTML or JSON and supports AJAX, it is themeable and easy to configure and customize. Events are fired when the user interacts with the tree. Other notable features are inline editing, drag'n'drop support, fuzzy searching (with optional server side calls), tri-state checkbox support, configurable node types, AMD compatibility, easily extendable via plugins.
    
## Getting Started

Download or checkout the latest copy and include jQuery and jsTree scripts and jsTree defualt css as well as jstree-selector.js file in your web page.  You will also need to include twitter bootstrap for the icons used. I have also included a "jsTree"  div to bind the tree to. 

```html
<link rel="stylesheet" href="dist/themes/default/style.css" />
<script src="dist/libs/jquery.js"></script>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<script src="dist/jstree.min.js"></script>
<script src="path/to/jstree-selector.js"></script>

<div id="jsTree"></div>
```
I am using this with angularJS. Below is an example of a angularJS controller using the plugin.  If you are not using angularJS, just make use of the jsTree init code starting at line 66 below:

```html
<script>        
/**
 * CategoryAttributeCtrl.js
 */
(function() {
    'use strict';
    var thisBrew = angular.module('thisBrew');
    thisBrew.controller('CategoryAttributeCtrl', ['$scope', '$q', '$rootScope', '$http', '$location', 'API_URL', function($scope, $q, $rootScope, $http, $location, API_URL) {

    	$scope.selectedCategory = {id:1, name: 'Beer', enum: 'BEER'};
    	$scope.categories = [
    	                     {id:1, name: 'Beer', enum: 'BEER'},
    	                     {id:3, name: 'Brewery', enum: 'BREWERY'},
    	                     {id:4, name: 'User', enum: 'USER'}
    	                     ];
    	$scope.newNodeFormTitle = "Create New Grouping";
        $scope.node = {};
        $scope.categoryAttribute = {};
        $scope.categoryAttributeType = {};
        $scope.categoryAttribute.categoryAttributeDataType = {};
        $scope.categoryAttribute.category = {};
        $scope.categoryAttributeDataTypes = {};

        $scope.newNodeObject = {};

        $scope.jsTreeTypes = ["URL", "BOOLEAN", "DATE", "FLOAT", "INTEGER", "STRING", "SELECT", "USER_RATING_SCALE"];

        $scope.load = function() {
            $http.get(API_URL + 'categoryAttributeDataType/findAllLite')
                .success(function(message, status, headers, config) {
                    $scope.categoryAttributeDataTypes = message.data;
                    $scope.buildTree();
                });
        };
        
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

        $scope.load();
        
        $scope.refreshTree = function() {
            $http.get(API_URL + 'categoryAttributeType/findAllByCategory', {
                params: {
                    categories: [$scope.selectedCategory.enum]
                }
             })
                .success(function(message, status, headers, config) {
                	$('#jsTree').jstree(true).settings.core.data = message.data;
                	$('#jsTree').jstree(true).refresh();
                });
        };
        
        $scope.updateCategory = function(sc) {
        	$scope.selectedCategory = sc;
        	$scope.refreshTree();
        };

        $scope.newNodeForm = function(parent) {
            $scope.newNodeObject.categoryAttributeDataType = {};
            $scope.newNodeObject.parent = {};
            $scope.newNodeObject.inheritance = false;
            $scope.disableInheritanceCheckBox = false;
            $scope.disableCategoryAttributeDataType = false;

            $scope.newNodeObject.parent = parent;

            if (parent !== null) {
            	$scope.newNodeFormTitle = "Create New Attribute";
                $scope.disableInheritanceCheckBox = true;
                if (parent.data.inheritance) {
                    $scope.newNodeObject.inheritance = true;
                    $scope.disableCategoryAttributeDataType = true;
                    $scope.newNodeObject.categoryAttributeDataType.code = parent.type;
                    $scope.newNodeObject.categoryAttributeDataType.id = parent.data.cadtId;
                    $scope.newNodeObject.categoryAttributeDataType.name = parent.data.cadtValue;
                }
            } else {
            	$scope.newNodeFormTitle = "Create New Grouping";
                $scope.disableInheritanceCheckBox = false;
            }

            $http.get(API_URL + 'categoryAttributeDataType/findAllLite')
                .success(function(message, status, headers, config) {
                    $scope.categoryAttributeDataTypes = message.data;
                    $('#createNode').modal('show');
                }).error(function(data, status, headers, config) {});
        };

        $scope.createNode = function() {
            var node = {};
            var ref = $('#jsTree').jstree(true);
            if ($scope.newNodeObject.parent === null) {
                node.parent = '#';
                node.text = 'New Attribute';
                node.id = null;
                var def = $q.defer();
                def.promise.then(function(data) {
                    $('#createNode').modal('hide');
                    var r = $("#jsTree").jstree('create_node', '#', {
                        'type': data.categoryAttributeDataType.dataType.code,
                        'data': {
                            'inheritance': $scope.newNodeObject.inheritance,
                            'cadtId': $scope.newNodeObject.categoryAttributeDataType.id,
                            'cadtValue': $scope.newNodeObject.categoryAttributeDataType.name
                        },
                        'id': 'ca-' + data.id,
                        'text': data.name
                    }, 'last');
                    $('#jsTree').jstree('edit', r);
                    $scope.newNodeObject = {};
                });
                $scope.saveNode(node, def);
            } else {
                node.parent = $scope.newNodeObject.parent.id;
                node.text = 'New Attribute Type';
                node.id = null;
                var def1 = $q.defer();
                def1.promise.then(function(data) {
                    $('#createNode').modal('hide');
                    var r = $("#jsTree").jstree('create_node', $scope.newNodeObject.parent.id, {
                        'type': data.categoryAttributeDataType.dataType.code,
                        'id': data.id,
                        'text': data.name,
                        'data': {
                            'inheritance': $scope.newNodeObject.inheritance,
                            'cadtId': $scope.newNodeObject.categoryAttributeDataType.id,
                            'cadtValue': $scope.newNodeObject.categoryAttributeDataType.name
                        }
                    }, 'last');
                    $('#jsTree').jstree('edit', r);
                    $scope.newNodeObject = {};
                });
                $scope.saveNode(node, def1);
            }
        };

        $scope.updateNode = function() {
            if ($scope.node.parent === "#") {
                $scope.categoryAttribute.name = $scope.node.name;
                $scope.categoryAttribute.id = $scope.node.id.replace("ca-", "");
                if ($scope.node.description !== null) $scope.categoryAttribute.description = $scope.node.description;
                if ($scope.node.code !== null) $scope.categoryAttribute.code = $scope.node.code;
                $http
                    .put(API_URL + 'categoryAttribute/' + $scope.categoryAttribute.id, $scope.categoryAttribute)
                    .success(function(message, status, headers, config) {
                        $scope.categoryAttribute = {};
                        $scope.node = {};
                    }).error(function(data, status, headers, config) {
                        $scope.categoryAttribute = {};
                        $scope.node = {};
                    });
            } else {
                $scope.categoryAttributeType.id = $scope.node.id;
                $scope.categoryAttributeType.name = $scope.node.name;
                if ($scope.node.description !== null) $scope.categoryAttributeType.description = $scope.node.description;
                if ($scope.node.code !== null) $scope.categoryAttributeType.code = $scope.node.code;
                $http
                    .put(API_URL + 'categoryAttributeType/' + $scope.categoryAttributeType.id, $scope.categoryAttributeType)
                    .success(function(message, status, headers, config) {
                        $scope.categoryAttributeType = {};
                        $scope.node = {};
                    }).error(function(message, status, headers, config) {
                        $scope.categoryAttributeType = {};
                        $scope.node = {};
                    });
            }

            $('#nodeInfo').modal('hide');
        };

        $scope.deleteNode = function(node) {
            if (node.parent === "#") {
                $scope.categoryAttribute.id = node.id.replace("ca-", "");
                $http
                    .delete(API_URL + 'categoryAttribute/' + $scope.categoryAttribute.id)
                    .success(function(message, status, headers, config) {
                        $scope.categoryAttribute = {};
                        $scope.node = {};
                    }).error(function(message, status, headers, config) {
                        $scope.categoryAttribute = {};
                        $scope.node = {};
                    });
            } else {
                $scope.categoryAttributeType.parent = node.parent.replace("ca-", "");
                $scope.categoryAttributeType.id = node.id;
                $http
                    .delete(API_URL + 'categoryAttributeType/' + $scope.categoryAttributeType.id)
                    .success(function(message, status, headers, config) {
                        $scope.categoryAttributeType = {};
                        $scope.node = {};
                    }).error(function(message, status, headers, config) {
                        $scope.categoryAttributeType = {};
                        $scope.node = {};
                    });
            }
        };

        $scope.getNode = function(node, def) {
            if (node.parent === "#") {
                $scope.categoryAttribute.id = node.id.replace("ca-", "");
                $http
                    .get(API_URL + 'categoryAttribute/' + $scope.categoryAttribute.id)
                    .success(function(message, status, headers, config) {
                        def.resolve(message.data);
                    }).error(function(message, status, headers, config) {
                        def.reject("Failed to get node information.");
                    });
            } else {
                $scope.categoryAttributeType.id = node.id;
                $http
                    .get(API_URL + 'categoryAttributeType/' + $scope.categoryAttributeType.id)
                    .success(function(message, status, headers, config) {
                        def.resolve(message.data);
                    }).error(function(message, status, headers, config) {
                        def.reject("Failed to get node information.");
                    });
            }
        };

        $scope.saveNode = function(node, def) {
            if (node.parent === "#") {
                $scope.categoryAttribute.category = {};
                $scope.categoryAttribute.category.id = $scope.selectedCategory.id;
                $scope.categoryAttribute.categoryAttributeDataType = {};
                $scope.categoryAttribute.categoryAttributeDataType = $scope.newNodeObject.categoryAttributeDataType;

                $scope.categoryAttribute.name = $scope.newNodeObject.name;
                $scope.categoryAttribute.description = $scope.newNodeObject.description;
                $scope.categoryAttribute.inheritance = $scope.newNodeObject.inheritance;
                $scope.categoryAttribute.code = $scope.newNodeObject.code;
                $scope.categoryAttribute.id = node.id;

                $http
                    .post(API_URL + 'categoryAttribute', $scope.categoryAttribute)
                    .success(function(message, status, headers, config) {
                        def.resolve(message.data);
                        $scope.categoryAttribute = {};
                    }).error(function(message, status, headers, config) {
                    	$('#createNode').modal('hide');
                        def.reject("Failed to save.");
                        $scope.categoryAttribute = {};
                    });
            } else {
                $scope.categoryAttributeType.name = node.text;
                if (node.parent.indexOf("ca-") != -1) {
                    $scope.categoryAttributeType.categoryAttribute = {};
                    $scope.categoryAttributeType.categoryAttribute.id = node.parent.replace("ca-", "");
                } else {
                    $scope.categoryAttributeType.parent = {};
                    $scope.categoryAttributeType.parent.id = node.parent;
                }

                $scope.categoryAttributeType.id = node.id;
                $scope.categoryAttributeType.categoryAttributeDataType = {};
                $scope.categoryAttributeType.categoryAttributeDataType = $scope.newNodeObject.categoryAttributeDataType;
                $scope.categoryAttributeType.name = $scope.newNodeObject.name;
                $scope.categoryAttributeType.description = $scope.newNodeObject.description;
                $scope.categoryAttributeType.code = $scope.newNodeObject.code;

                $http
                    .post(API_URL + 'categoryAttributeType', $scope.categoryAttributeType)
                    .success(function(message, status, headers, config) {
                        def.resolve(message.data);
                        $scope.categoryAttributeType = {};
                    }).error(function(message, status, headers, config) {
                    	$('#createNode').modal('hide');
                        def.reject("Failed to save.");
                        $scope.categoryAttributeType = {};
                    });
            }
        };

        $scope.updateScoreGroup = function(node, categoryAttributeDataTypeId) {
            $scope.categoryAttribute.id = node.id.replace("ca-", "");
            $scope.categoryAttribute.categoryAttributeDataType = {};
            $scope.categoryAttribute.categoryAttributeDataType.id = categoryAttributeDataTypeId;
            $http
                .put(API_URL + 'categoryAttribute/' + $scope.categoryAttribute.id, $scope.categoryAttribute)
                .success(function(message, status, headers, config) {
                    $scope.categoryAttribute = {};
                }).error(function(message, status, headers, config) {
                    $scope.categoryAttribute = {};
                });
        };

        $scope.showNodeInfo = function(node) {
            $scope = angular.element($('#CategoryAttributeCtrl')).scope();
            var def = $q.defer();
            def.promise.then(function(data) {
                $scope.node.id = node.id;
                $scope.node.parent = node.parent;
                $scope.node.name = data.name;
                $scope.node.description = data.description;
                $scope.node.code = data.code;
                $('#nodeInfo').modal('show');
            });
            $scope.getNode(node, def);
        };

        $scope.renameNode = function(node) {
            var ref = $('#jsTree').jstree(true);
            ref.edit(node.id);
        };

        $scope.removeNode = function(node) {
            var ref = $('#jsTree').jstree(true);
            ref.delete_node(node.id);
        };

    }]);

}());
</script>
```
