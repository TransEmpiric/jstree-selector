(function($, undefined) {

    var infoTag = document.createElement('A');
    infoTag.setAttribute("style", "text-align:center;width:15px;position:relative;" +
        "color:#337ab7;display:inline-block;" +
        "vertical-align:top;white-space:nowrap;margin-left:15px;font-size:8px;");
    infoTag.setAttribute('href', 'javascript:void(0);');
    infoTag.className = "jstree-selector-info";
    var infoIcon = document.createElement('I');
    infoIcon.className = "glyphicon glyphicon-info-sign";
    infoTag.appendChild(infoIcon);

    var warningTag = document.createElement('A');
    warningTag.setAttribute("style", "text-align:center;width:15px;position:relative;" +
        "color:#faebcc;display:inline-block;" +
        "vertical-align:top;white-space:nowrap;margin-left:15px;font-size:8px;");
    warningTag.setAttribute('href', 'javascript:void(0);');
    warningTag.className = "jstree-selector-warning";
    var warningIcon = document.createElement('I');
    warningIcon.className = "glyphicon glyphicon-warning-sign";
    warningTag.appendChild(warningIcon);

    var editTag = document.createElement('A');
    editTag.setAttribute("style", "text-align:center;width:15px;position:relative;" +
        "color:#f0ad4e;display:inline-block;font-size:8px;" +
        "vertical-align:top;white-space:nowrap;");
    editTag.setAttribute('href', 'javascript:void(0);');
    editTag.className = "jstree-selector-edit";
    var editIcon = document.createElement('I');
    editIcon.className = "glyphicon glyphicon-pencil";
    editTag.appendChild(editIcon);

    var createTag = document.createElement('A');
    createTag.setAttribute("style", "text-align:center;width:15px;position:relative;" +
        "color:#5cb85c;display:inline-block;" +
        "vertical-align:top;white-space:nowrap;font-size:8px;");
    createTag.setAttribute('href', 'javascript:void(0);');
    createTag.className = "jstree-selector-create";
    var createIcon = document.createElement('I');
    createIcon.className = "glyphicon glyphicon-plus";
    createTag.appendChild(createIcon);

    var deleteTag = document.createElement('A');
    deleteTag.setAttribute("style", "text-align:center;width:15px;position:relative;" +
        "color:#d9534f;display:inline-block;" +
        "vertical-align:top;white-space:nowrap;font-size:8px;");
    deleteTag.setAttribute('href', 'javascript:void(0);');
    deleteTag.className = "jstree-selector-delete";
    var deleteIcon = document.createElement('I');
    deleteIcon.className = "glyphicon glyphicon-remove";
    deleteTag.appendChild(deleteIcon);

    "use strict";
    $.jstree.plugins.selector = function(options, parent) {
        this.bind = function() {

            parent.bind.call(this);

            if (this.settings.selector.rename && this.settings.selector.rename.on) {
                this.element.on("click", ".jstree-selector-edit", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    $(e.target).trigger("click_selector_edit.jstree", [node, $(e.target)]);
                }, this));
            }
            if (this.settings.selector.remove && this.settings.selector.remove.on) {
                this.element.on("click", ".jstree-selector-delete", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    $(e.target).trigger("click_selector_delete.jstree", [node, $(e.target)]);
                }, this));
            }
            if (this.settings.selector.info && this.settings.selector.info.on) {
                this.element.on("click", ".jstree-selector-info", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    $(e.target).trigger("click_selector_info.jstree", [node, $(e.target)]);
                }, this));
            }
            if (this.settings.selector.warning && this.settings.selector.warning.on) {
                this.element.on("click", ".jstree-selector-warning", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    $(e.target).trigger("click_selector_warning.jstree", [node, $(e.target)]);
                }, this));
            }
            if (this.settings.selector.add && this.settings.selector.add.on) {
                this.element.on("click", ".jstree-selector-create", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    $(e.target).trigger("click_selector_create.jstree", [node, $(e.target)]);
                }, this));
            }
            if (this.settings.selector.select && this.settings.selector.select.on) {
                this.element.on("change", ".jstree-selector-select", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    // Update Change to node
                    if (node.data && node.data[this.settings.selector.select.param]) {
                        node.data[this.settings.selector.select.param] = $(e.target).val();
                    } else {
                        node.data = {};
                        node.data[this.settings.selector.select.param] = $(e.target).val();
                    }
                    $(e.target).attr('value', $(e.target).val());
                    $(e.target).trigger("change_selector_select.jstree", [node, $(e.target)]);
                }, this));
            }
            if (this.settings.selector.inputInteger && this.settings.selector.inputInteger.on) {
                this.element.on("change", ".jstree-selector-input-integer", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    // Update Change to node
                    if (node.data && node.data[this.settings.selector.inputInteger.param]) {
                        node.data[this.settings.selector.inputInteger.param] = $(e.target).val();
                    } else {
                        node.data = {};
                        node.data[this.settings.selector.inputInteger.param] = $(e.target).val();
                    }
                    $(e.target).attr('value', $(e.target).val());
                    $(e.target).trigger("change_selector_input-integer.jstree", [node, $(e.target)]);
                }, this));
            }
            if (this.settings.selector.inputNumber && this.settings.selector.inputNumber.on) {
                this.element.on("change", ".jstree-selector-input-number", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    // Update Change to node
                    if (node.data && node.data[this.settings.selector.inputNumber.param]) {
                        node.data[this.settings.selector.inputNumber.param] = $(e.target).val();
                    } else {
                        node.data = {};
                        node.data[this.settings.selector.inputNumber.param] = $(e.target).val();
                    }
                    $(e.target).attr('value', $(e.target).val());
                    $(e.target).trigger("change_selector_input-number.jstree", [node, $(e.target)]);
                }, this));
            }
            if (this.settings.selector.inputText && this.settings.selector.inputText.on) {
                this.element.on("change", ".jstree-selector-input-text", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    // Update Change to node
                    if (node.data && node.data[this.settings.selector.inputText.param]) {
                        node.data[this.settings.selector.inputText.param] = $(e.target).val();
                    } else {
                        node.data = {};
                        node.data[this.settings.selector.inputText.param] = $(e.target).val();
                    }
                    $(e.target).attr('value', $(e.target).val());
                    $(e.target).trigger("change_selector_input-text.jstree", [node, $(e.target)]);
                }, this));
            }
            if (this.settings.selector.url && this.settings.selector.url.on) {
                this.element.on("change", ".jstree-selector-url-input-text", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    // Update Change to node
                    if (node.data && node.data[this.settings.selector.url.param]) {
                        node.data[this.settings.selector.url.param] = $(e.target).val();
                    } else {
                        node.data = {};
                        node.data[this.settings.selector.url.param] = $(e.target).val();
                    }

                    // update link
                    $(e.target).attr('value', $(e.target).val());
                    $(e.target).parent().find('.jstree-selector-url').attr('href', $(e.target).val());

                    $(e.target).trigger("change_selector_url-input-text.jstree", [node, $(e.target)]);
                }, this));
            }
            if (this.settings.selector.checkbox && this.settings.selector.checkbox.on) {
                this.element.on("click", ".jstree-selector-checkbox", $.proxy(function(e) {
                    var node = this.get_node($(e.target));
                    // Update Change to node
                    var checked = $(e.target).is(':checked');

                    if (node.data && node.data[this.settings.selector.inputNumber.param]) {
                        node.data[this.settings.selector.checkbox.param] = checked;
                    } else {
                        node.data = {};
                        node.data[this.settings.selector.checkbox.param] = checked;
                    }

                    $(e.target).trigger("click_selector_checkbox.jstree", [node, $(e.target)]);
                }, this));
            }
        };
        this.teardown = function() {
            if (this.settings.questionmark) {
                if (this.settings.selector.rename && this.settings.selector.rename.on) {
                    this.element.find(".jstree-selector-edit").remove();
                }
                if (this.settings.selector.remove && this.settings.selector.remove.on) {
                    this.element.find(".jstree-selector-delete").remove();
                }
                if (this.settings.selector.info && this.settings.selector.info.on) {
                    this.element.find(".jstree-selector-info").remove();
                }
                if (this.settings.selector.warning && this.settings.selector.warning.on) {
                    this.element.find(".jstree-selector-warning").remove();
                }
                if (this.settings.selector.add && this.settings.selector.add.on) {
                    this.element.find(".jstree-selector-create").remove();
                }
                if (this.settings.selector.select && this.settings.selector.select.on) {
                    this.element.find(".jstree-selector").remove();
                }
                if (this.settings.selector.inputInteger && this.settings.selector.inputInteger.on) {
                    this.element.find(".jstree-selector-input-integer").remove();
                }
                if (this.settings.selector.inputNumber && this.settings.selector.inputNumber.on) {
                    this.element.find(".jstree-selector-input-number").remove();
                }
                if (this.settings.selector.inputText && this.settings.selector.inputText.on) {
                    this.element.find(".jstree-selector-input-text").remove();
                }
                if (this.settings.selector.checkbox && this.settings.selector.checkbox.on) {
                    this.element.find(".jstree-selector-checkbox").remove();
                }
                if (this.settings.selector.checkbox && this.settings.selector.checkbox.on) {
                    this.element.find(".jstree-selector-url").remove();
                    this.element.find(".jstree-selector-url-input-text").remove();
                }
            }
            parent.teardown.call(this);
        };
        this.redraw_node = function(obj, deep, callback) {
            var node = this.get_node(obj);
            if (this.settings.selector.inputInteger && this.settings.selector.inputInteger.on) {
                var inputIntegerTag = document.createElement('INPUT');
                inputIntegerTag.setAttribute("style", "height:20px;width:64px;position:relative;" +
                    "color:inherit;text-decoration:none;display:inline-block;" +
                    "line-height:20px;white-space:nowrap;margin-left:15px;font-size:12px;");
                inputIntegerTag.className = "jstree-selector-input-integer";
                inputIntegerTag.setAttribute('type', 'text');
            }
            if (this.settings.selector.inputNumber && this.settings.selector.inputNumber.on) {
                var inputNumberTag = document.createElement('INPUT');
                inputNumberTag.setAttribute("style", "height:20px;width:64px;position:relative;" +
                    "color:inherit;text-decoration:none;display:inline-block;" +
                    "line-height:20px;white-space:nowrap;margin-left:15px;font-size:12px;");
                inputNumberTag.className = "jstree-selector-input-number";
                inputNumberTag.setAttribute('type', 'text');
            }
            if (this.settings.selector.inputText && this.settings.selector.inputText.on) {
                var inputTextTag = document.createElement('INPUT');
                inputTextTag.setAttribute("style", "height:20px;width:100px;position:relative;" +
                    "color:inherit;text-decoration:none;display:inline-block;" +
                    "line-height:20px;white-space:nowrap;margin-left:15px;font-size:12px;");
                inputTextTag.className = "jstree-selector-input-text";
                inputTextTag.setAttribute('type', 'text');
            }
            if (this.settings.selector.url && this.settings.selector.url.on) {
                var urlDivTag = document.createElement('DIV');
                urlDivTag.setAttribute("style", "height:24px;width:175px;position:relative;" +
                    "color:inherit;display:inline-block;vertical-align:center;white-space:nowrap;margin-left:15px;");
                var urlTag = document.createElement('A');
                urlTag.setAttribute("style", "text-align:center;width:15px;position:relative;" +
                    "color:#5cb85c;display:inline-block;" +
                    "vertical-align:top;white-space:nowrap;font-size:8px;");
                urlTag.setAttribute('target', '_blank');
                urlTag.className = "jstree-selector-url";
                var urlIcon = document.createElement('I');
                urlIcon.className = "glyphicon glyphicon-link";
                urlTag.appendChild(urlIcon);
                var inputUrlTextTag = document.createElement('INPUT');
                inputUrlTextTag.setAttribute("style", "height:20px;width:150px;position:relative;" +
                    "color:inherit;text-decoration:none;display:inline-block;" +
                    "line-height:20px;white-space:nowrap;font-size:12px;");
                inputUrlTextTag.className = "jstree-selector-url-input-text";
                inputUrlTextTag.setAttribute('type', 'text');
                urlDivTag.appendChild(inputUrlTextTag);
                urlDivTag.appendChild(urlTag);
            }
            if (this.settings.selector.checkbox && this.settings.selector.checkbox.on) {
                var inputCheckbox = document.createElement('INPUT');
                inputCheckbox.setAttribute("style", "position:relative;" +
                    "display:inline-block;" +
                    "vertical-align:center;margin-left:15px;");
                inputCheckbox.className = "jstree-selector-checkbox";
                inputCheckbox.setAttribute("type", "checkbox");
            }
            if (this.settings.selector.select && this.settings.selector.select.on) {
                var param = this.settings.selector.select.param;
                var array = [];
                if (this.settings.selector.select && this.settings.selector.select.options) {
                    array = this.settings.selector.select.options;
                } else if (node.data && node.data.options) {
                    array = node.data.options;
                }
                var select = document.createElement("SELECT");
                select.id = "selector";
                select.className = "jstree-selector-select";
                select.setAttribute("style", "height:18px;width:100px;position:relative;" +
                    "color:inherit;text-decoration:none;display:inline-block;" +
                    "vertical-align:center;white-space:nowrap;margin-left:15px;font-size:10px;");
            }

            obj = parent.redraw_node.call(this, obj, deep, callback);

            if (node.parent === '#') {
                if (this.settings.selector.select && this.settings.selector.select.on && !this.settings.selector.select.childOnly) {
                    if (node.data && node.data.options) {
                        array = node.data.options;
                    }
                    for (var i = 0; i < array.length; i++) {
                        var option = document.createElement("OPTION");
                        option.value = array[i].value;
                        option.text = array[i].text;
                        if (node.data != null && array[i].value == node.data[param]) {
                            option.setAttribute("selected", true)
                        }
                        select.appendChild(option);
                    }

                    var tmp0 = select.cloneNode(true);

                    if (this.settings.selector.select.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.select.types) > -1) {
                            obj.insertBefore(tmp0, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp0, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.inputInteger && this.settings.selector.inputInteger.on && !this.settings.selector.inputInteger.childOnly) {
                    var value = 0;
                    if (node.data != null) value = node.data[this.settings.selector.inputInteger.param];
                    inputIntegerTag.setAttribute('value', value);
                    var tmp5 = inputIntegerTag.cloneNode(true);
                    if (this.settings.selector.inputInteger.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.inputInteger.types) > -1) {
                            obj.insertBefore(tmp5, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp5, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.inputNumber && this.settings.selector.inputNumber.on && !this.settings.selector.inputNumber.childOnly) {
                    var value = 0;
                    if (node.data != null) value = node.data[this.settings.selector.inputNumber.param];
                    inputNumberTag.setAttribute('value', value);

                    var tmp8 = inputNumberTag.cloneNode(true);
                    if (this.settings.selector.inputNumber.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.inputNumber.types) > -1) {
                            obj.insertBefore(tmp8, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp8, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.inputText && this.settings.selector.inputText && this.settings.selector.inputText.on && !this.settings.selector.inputText.childOnly) {
                    var value = '';
                    if (node.data && node.data[this.settings.selector.inputText.param]) value = node.data[this.settings.selector.inputText.param];
                    inputTextTag.setAttribute('value', value);

                    var tmp7 = inputTextTag.cloneNode(true);
                    if (this.settings.selector.inputInteger.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.inputInteger.types) > -1) {
                            obj.insertBefore(tmp7, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp7, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.url && this.settings.selector.url && this.settings.selector.url.on && !this.settings.selector.url.childOnly) {
                    var value = 'javascript:void(0);';
                    if (node.data && node.data[this.settings.selector.url.param]) value = node.data[this.settings.selector.url.param];
                    inputUrlTextTag.setAttribute('value', value);
                    urlTag.setAttribute('href', value);

                    var tmp9 = urlDivTag.cloneNode(true);
                    if (this.settings.selector.url.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.url.types) > -1) {
                            obj.insertBefore(tmp9, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp9, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.checkbox && this.settings.selector.checkbox && this.settings.selector.checkbox.on && !this.settings.selector.checkbox.childOnly) {
                    var checked = false;
                    inputCheckbox.setAttribute('value', node.id);
                    if (node.data != null) {
                        if (this.settings.selector.checkbox.param) {
                            checked = node.data[this.settings.selector.checkbox.param];
                        }
                        if (checked) {
                            inputCheckbox.setAttribute('checked', 'true');
                        } else {
                            inputCheckbox.removeAttribute('checked');
                        };
                    }

                    var tmp6 = inputCheckbox.cloneNode(true);

                    if (this.settings.selector.checkbox.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.checkbox.types) > -1) {
                            obj.insertBefore(tmp6, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp6, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.remove && this.settings.selector.remove.on && !this.settings.selector.remove.childOnly) {
                    var tmp1 = deleteTag.cloneNode(true);
                    obj.insertBefore(tmp1, obj.childNodes[3]);
                }
                if (this.settings.selector.add && this.settings.selector.add.on && !this.settings.selector.add.childOnly) {
                    var tmp2 = createTag.cloneNode(true);
                    if (this.settings.selector.add.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.add.types) > -1) {
                            obj.insertBefore(tmp2, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp2, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.rename && this.settings.selector.rename.on && !this.settings.selector.rename.childOnly) {
                    var tmp3 = editTag.cloneNode(true);
                    obj.insertBefore(tmp3, obj.childNodes[3]);
                }
                if (this.settings.selector.info && this.settings.selector.info.on && !this.settings.selector.info.childOnly) {
                    var tmp4 = infoTag.cloneNode(true);
                    obj.insertBefore(tmp4, obj.childNodes[3]);
                }
                if (this.settings.selector.warning && this.settings.selector.warning.on && !this.settings.selector.warning.childOnly) {
                    if (node.data != null && this.settings.selector.warning.param && node.data[this.settings.selector.warning.param] !== null) {
                        var tmp10 = warningTag.cloneNode(true);
                        obj.insertBefore(tmp10, obj.childNodes[3]);
                    }
                }
            } else if (obj != null) {

                if (this.settings.selector.select && this.settings.selector.select.on && !this.settings.selector.select.rootOnly) {
                    if (node.data && node.data.options) {
                        array = node.data.options;
                    }

                    for (var i = 0; i < array.length; i++) {
                        var option = document.createElement("OPTION");
                        option.value = array[i].value;
                        option.text = array[i].text;
                        if (node.data != null && array[i].value == node.data[param]) {
                            option.setAttribute("selected", true)
                        }
                        select.appendChild(option);
                    }

                    var tmp0 = select.cloneNode(true);

                    if (this.settings.selector.select.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.select.types) > -1) {
                            obj.insertBefore(tmp0, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp0, obj.childNodes[3]);
                    }

                }
                if (this.settings.selector.inputInteger && this.settings.selector.inputInteger.on && !this.settings.selector.inputInteger.rootOnly) {
                    var value = 0;
                    if (node.data != null) value = node.data[this.settings.selector.inputInteger.param];
                    inputIntegerTag.setAttribute('value', value);
                    var tmp5 = inputIntegerTag.cloneNode(true);
                    if (this.settings.selector.inputInteger.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.inputInteger.types) > -1) {
                            obj.insertBefore(tmp5, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp5, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.inputNumber && this.settings.selector.inputNumber.on && !this.settings.selector.inputNumber.rootOnly) {
                    var value = 0;
                    if (node.data != null) value = node.data[this.settings.selector.inputNumber.param];
                    inputNumberTag.setAttribute('value', value);

                    var tmp8 = inputNumberTag.cloneNode(true);
                    if (this.settings.selector.inputNumber.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.inputNumber.types) > -1) {
                            obj.insertBefore(tmp8, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp8, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.inputText && this.settings.selector.inputText.on && !this.settings.selector.inputText.rootOnly) {
                    var value = '';
                    if (node.data && node.data[this.settings.selector.inputText.param]) value = node.data[this.settings.selector.inputText.param];
                    inputTextTag.setAttribute('value', value);

                    var tmp7 = inputTextTag.cloneNode(true);
                    if (this.settings.selector.inputText.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.inputText.types) > -1) {
                            obj.insertBefore(tmp7, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp7, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.url && this.settings.selector.url.on && !this.settings.selector.url.rootOnly) {
                    var value = 'javascript:void(0);';
                    if (node.data && node.data[this.settings.selector.url.param]) value = node.data[this.settings.selector.url.param];
                    inputUrlTextTag.setAttribute('value', value);
                    urlTag.setAttribute('href', value);

                    var tmp9 = urlDivTag.cloneNode(true);
                    if (this.settings.selector.url.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.url.types) > -1) {
                            obj.insertBefore(tmp9, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp9, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.checkbox && this.settings.selector.checkbox.on && !this.settings.selector.checkbox.rootOnly) {
                    var checked = false;
                    inputCheckbox.setAttribute('value', node.id);
                    if (node.data != null) {
                        if (this.settings.selector.checkbox.param) {
                            checked = node.data[this.settings.selector.checkbox.param];
                        }
                        if (checked) {
                            inputCheckbox.setAttribute('checked', 'true');
                        } else {
                            inputCheckbox.removeAttribute('checked');
                        };
                    }

                    var tmp6 = inputCheckbox.cloneNode(true);
                    if (this.settings.selector.checkbox.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.checkbox.types) > -1) {
                            obj.insertBefore(tmp6, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp6, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.remove && this.settings.selector.remove.on && !this.settings.selector.remove.rootOnly) {
                    var tmp1 = deleteTag.cloneNode(true);
                    obj.insertBefore(tmp1, obj.childNodes[3]);
                }
                if (this.settings.selector.add && this.settings.selector.add.on && !this.settings.selector.add.rootOnly) {
                    var tmp2 = createTag.cloneNode(true);
                    if (this.settings.selector.add.types && node.type) {
                        if ($.inArray(node.type, this.settings.selector.add.types) > -1) {
                            obj.insertBefore(tmp2, obj.childNodes[3]);
                        }
                    } else {
                        obj.insertBefore(tmp2, obj.childNodes[3]);
                    }
                }
                if (this.settings.selector.rename && this.settings.selector.rename.on && !this.settings.selector.rename.rootOnly) {
                    var tmp3 = editTag.cloneNode(true);
                    obj.insertBefore(tmp3, obj.childNodes[3]);
                }
                if (this.settings.selector.info && this.settings.selector.info.on && !this.settings.selector.info.rootOnly) {
                    var tmp4 = infoTag.cloneNode(true);
                    obj.insertBefore(tmp4, obj.childNodes[3]);
                }
                if (this.settings.selector.warning && this.settings.selector.warning.on && !this.settings.selector.warning.rootOnly) {
                    if (node.data != null && this.settings.selector.warning.param && node.data[this.settings.selector.warning.param] !== null) {
                        console.log(node.data);
                        console.log(node.data[this.settings.selector.warning.param]);
                        var tmp10 = warningTag.cloneNode(true);
                        obj.insertBefore(tmp10, obj.childNodes[3]);
                    }
                }
            }

            return obj;
        };
    };
})(jQuery);
