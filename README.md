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
$('#jsTree').jstree({
  "core" : {
	"html_titles" : true,
	"animation" : 0,
	"themes" : { "stripes" : true },
	"check_callback" : true,
	'data' : [
				{
					"id": "ca-10",
					"text": "dsfsdf",
					"parent": "#",
					"type": "root",
					"data": {
						"scoreGroupId": 1
					}
				},
				{
					"id": "31",
					"text": "sdfsdf",
					"parent": "ca-10",
					"type": "child",
					"data": {
						"scoreGroupId": null
					}
				},
				{
					"id": "39",
					"text": "jjjjj",
					"parent": "31",
					"type": "child",
					"data": {
						"scoreGroupId": null
					}
				}
			]
  },
  "selector" : {
	  "options" : [
		  {"text" : "1", "value" : "1"},
		  {"text" : "2", "value" : "2"},
		  {"text" : "3", "value" : "3"}
	  ],
	  "param" : "scorGroupId" 
  },
  "types" : {
	"root" : {
	"icon" : "glyphicon glyphicon-tent",
	  "valid_children" : ["child"]
	},
	"child" : {
	  "icon" : "glyphicon glyphicon-tag",
	  "valid_children" : ["child"]
	}
  },
  "plugins" : [
	"dnd",
	"state", "types", "wholerow", "selector"
  ]
});

$('#jsTree').on("change_selector.jstree", function(event, node, element) {
		//do somehting with the node or element
});
</script>
```
