/**
 * @file dropdown directive
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';
import './dropdown.less';

class DropdownListController {
	constructor(scope) {
		this.scope = scope;
	}

	changeItem(item, parent) {
		this.scope.selectedItem = item;
		angular.isFunction(this.scope.onChange) && this.scope.onChange(item, parent);
		this.scope.toggleList(false);
	}

	addStaticMethod(methodName, callback) {
		DropdownListController[methodName] = callback;
		return this;
	}
}

DropdownListController.$inject = ['$scope'];

class DropdownDirective {
	constructor() {
		this.restrict = 'AE';
		this.replace = true;
		this.scope = {
			data: '=',
            onChange: '='
		};
		this.template = require('./dropdown.html');
		this.controller = DropdownListController;
	}

	link(scope, element, attrs) {
		let childrenKey = attrs.childrenKey || 'children';
		let name = attrs.name || 'name';
		let controller = this.controller;
		angular.extend(scope, {
			name: name,
			childrenKey: childrenKey,
			selectedItem: scope.data && scope.data[0],
			toggleList(isShow) {
				scope.showList = angular.isUndefined(isShow) ? !scope.showList : isShow;
				if (!scope.showList) {
					controller.removeMenuList && controller.removeMenuList();
				}
			}
		});
	}
}

class MenuListDirective {
	constructor($compile) {
		this.require = '?^dropdown';
		this.restrict = 'AE';
		this.replace = true;
		this.template = require('./menulist.html');
		this.scope = {
			items: '='
		};
		this.$compile = $compile;
	}

	compile() {
		let template = this.template;
		let $compile = this.$compile;

		return {
			post(scope, element, attrs, dropdownCtrl) {
				let $ = angular.element;
				let childrenKey = attrs.childrenKey || 'children';
        		let name = attrs.name || 'name';
				let key = attrs.key || 'id';
        		let isMouseInDomArea = (e, dom) => {
			        let x = e.clientX;
			        let y = e.clientY;
			        let offset = dom.offset();
			        let width = dom.width();
			        let height = dom.height();

			        return !(x < offset.left || x > offset.left + width || y < offset.top || y > offset.top + height);
			    };
			    scope.items = scope.items || [];
        		angular.extend(scope, {
        			name: name,
        			childrenKey: childrenKey,
        			selectedItem: scope.items[0],
        			level: 0,
        			maxLevel: 1,
        			mouseoverHandle: function (item, evt, level) {
	            		if (item[childrenKey] && item[childrenKey].length) {
	            			let target = evt.currentTarget;
		            		let rectBox = target.getBoundingClientRect();
		            		scope.currentItem = item;

		            		let currentScope = scope.getChildScopeByLevel(level);
		            		if (currentScope && currentScope.menuList) {
		            			currentScope.menuList.show();
		            		}
		            		
	            			let newScope = scope.$new();
		            		newScope.items = scope.currentItem[childrenKey];
		            		newScope.menuStyle = {
		            			position: 'absolute',
		            			top: rectBox.top,
		            			left: rectBox.right,
		            			display: 'block'
		            		};
		            		newScope.parentId = item[key];

		            		newScope.level = !angular.isUndefined(level) ? (level + 1) : 1;
		            		scope.maxLevel = Math.max(scope.maxLevel, newScope.level);

		            		newScope.menuList = $($compile(template)(newScope));

		            		let childScopeKey = scope.getChildScopeKey(newScope.level);
		            		if (scope[childScopeKey] && scope[childScopeKey].menuList) {
		            			scope[childScopeKey].menuList.remove();
		            		}
		            		scope[childScopeKey] = newScope;
		            		angular.element('body').append(newScope.menuList);
	            		}
	            	},
	            	mouseoutHandle: function (item, evt, level) {
	            		let childScope;
	            		for (let i = level + 1; i <= scope.maxLevel; i++) {
	            			childScope = scope[scope.getChildScopeKey(i)];
	            			if (childScope && childScope.menuList) {
	            				if (!isMouseInDomArea(evt, childScope.menuList)) {
	            					childScope.menuList.hide();
	            				}
	            			}
	            			else {
	            				break;
	            			}
	            		}
	            	},
	            	mouseoverOnMenu: function (evt, level) {
	            		let childScope = scope.getChildScopeByLevel(level);
	            		if (childScope && childScope.menuList) {
	            			childScope.menuList.show();
	            		}
	            	},
	            	toggleList: function (isShow) {
	            		scope.showList = angular.isUndefined(isShow) ? !scope.showList : isShow;
	            		if (!scope.showList) {
	            			scope.removeMenuList();
	            		}
	            	},
	            	selectItem: function (item, level) {
	            		if (!scope.isDisabled(item)) {
	            			scope.selectedItem = item;
		            		scope.parentIds = scope.getParentIds(level);

		            		dropdownCtrl.changeItem(item);
		            		scope.toggleList(false);
	            		}
	            	},
	            	getParentIds: function (level) {
	            		let ids = [];
	            		for (let i = 1; i < level; i++) {
	            			ids.push(scope.getChildScopeByLevel(i).parentId);
	            		}

	            		return ids;
	            	},
	            	isChildSelected: function (item) {
	            		return (scope.parentIds || []).indexOf(item[key]) > -1;
	            	},
	            	isSelected: function (item) {
	            		return item[key] === (scope.selectedItem || scope.items[0] || {})[key] && !scope.isDisabled(item);
	            	},
	            	isDisabled: function (item) {
	            		return !!item.disabled;
	            	},
	            	getChildScopeKey: function (level) {
	            		return 'childScope-' + level;
	            	},
	            	getChildScopeByLevel: function (level) {
	            		return scope[scope.getChildScopeKey(level)];
	            	},
	            	removeMenuList: function (level) {
	            		level = level || scope.maxLevel;
	            		let childScope;

	            		for (let i = 1; i <= level; i++) {
	            			childScope = scope.getChildScopeByLevel(i);
	            			if (childScope && childScope.menuList) {
	            				childScope.menuList.remove();
	            			}
	            		}
	            	}
        		});
				dropdownCtrl.addStaticMethod('removeMenuList', scope.removeMenuList);
			}
		}
	}

	static getInstance($compile) {
		MenuListDirective.instance = new MenuListDirective($compile);
		return MenuListDirective.instance;
	}
}

MenuListDirective.getInstance.$inject = ['$compile'];

exports.DropdownDirective = DropdownDirective;
exports.MenuListDirective = MenuListDirective;

