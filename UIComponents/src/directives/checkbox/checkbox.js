/**
 * @file checkbox directive
 * @author zhangyou04@baidu.com
 */

class CheckboxDirective {
    constructor($parse) {
        this.restrict = 'AE';
        this.replace = true;
        this.transclude = true;
        this.scope = true;
        this.require = ['?ngModel', '?^uiCheckboxGroup'];
        this.template = require('./checkbox.html');
        this.$parse = $parse;
    }

    link(scope, element, attrs, ctrls) {
        let ngModelCtrl = ctrls[0];
        let cgCtrl = ctrls[1];
        let isChecked = () => {
            return element[0].getAttribute('checked') === 'true';
        };
        let render = (isChecked) => {
            let toggleClass = isChecked ? 'addClass' : 'removeClass';

            element[toggleClass]('ui-checkbox-wrapper-checked');
            element.find('.ui-checkbox')[toggleClass]('ui-checkbox-checked');
            element[0][isChecked ? 'setAttribute' : 'removeAttribute']('checked', 'true');
        };

        if (cgCtrl) {
            cgCtrl.add({
                element: element,
                render: render,
                attrs: attrs
            });
        }

        if (ngModelCtrl) {
            ngModelCtrl.$render = () => {
                render(element[0].hasAttribute('value') ? ngModelCtrl.$viewValue === attrs.value : ngModelCtrl.$viewValue);
            };
        }

        attrs.$observe('checked', render);
        scope.$watch(attrs.indeterminate, indeterminate => {
            scope.indeterminate = indeterminate;
        }, true);
        //attrs.$observe('indeterminate', (indeterminate) => {
        //
        //    console.log('indeterminate', scope.indeterminate, scope.indeterminate === true);
        //
        //});

        element.on('click', (evt) => {
            if (element[0].hasAttribute('disabled')) {
                return;
            }

            // 阻止由于事件冒泡导致的两次触发逻辑
            if (/input/i.test(evt.target.tagName)) {
                scope.$apply(() => {
                    let checked = !isChecked();
                    if (cgCtrl) {
                        console.log('attrrs.value', attrs.value);
                        cgCtrl[checked ? 'checkedItem' : 'uncheckedItem'](attrs.value);
                    }
                    else {
                        if (ngModelCtrl) {
                            let value = checked ? (element[0].hasAttribute('value') ? attrs.value : true)
                                                : false;
                            ngModelCtrl.$setViewValue(value);
                        }
                    }
                    scope.indeterminate = false;
                    if (attrs.indeterminate) {
                        let getter = this.$parse(attrs.indeterminate);
                        let setter = getter.assign;
                        setter(scope.$parent, scope.indeterminate);
                    }
                    render(checked);
                });
            }
        });
    }

    static getInstance($parse) {
        return new CheckboxDirective($parse);
    }
}

CheckboxDirective.getInstance.$inject = ['$parse'];

class CheckboxButtonDirective extends CheckboxDirective {
    constructor() {
        super();
    }

    link(scope, element, attrs, ctrls) {
        super.link.call(this, scope, element, attrs, ctrls);
        element.addClass('ui-checkbox-button');
    }

    static getInstance() {
        return new CheckboxButtonDirective();
    }
}

CheckboxButtonDirective.getInstance.$inject = [];

class CheckboxGroupController {
    constructor(scope, element, timeout) {
        this.element = element;
        this.scope = scope;
        this.timeout = timeout;
        scope.checkboxes = scope.checkboxes || [];
        this.checkboxes = scope.checkboxes;
        console.log('CheckboxGroupController constructor', this.scope.$id);
    }

    add(checkbox) {
        this.checkboxes.push(checkbox);
        console.log('add', checkbox.element[0]);
        // workaround for used with ng-repeat invoke this after group render so render checkbox here
        this.timeout(() => {
            checkbox.render(this.hasChecked(checkbox.attrs.value));
        });
    }

    toggleChecked(checkbox) {
        checkbox.render();
    }

    getViewValue() {
        return this.scope.ngModelCtrl ? this.scope.ngModelCtrl.$viewValue : [];
    }

    setViewValue(val, evt) {
        if (this.scope.ngModelCtrl) {
            this.scope.ngModelCtrl.$setViewValue(val, evt && evt.type);
            if (this.element.attr('ng-change')) {
                this.scope.$eval(this.element.attr('ng-change'));
            }
        }
    }

    hasChecked(value) {
        return this.getViewValue().indexOf(value) > -1;
    }

    checkedItem(item) {
        if (!this.hasChecked(item)) {
            let checkedItems = this.getViewValue();
            checkedItems.push(item);
            this.setViewValue(checkedItems);
        }
    }

    uncheckedItem(item) {
        let checkedItems = this.getViewValue();
        checkedItems.some((checkedItem, i) => {
            if (checkedItem === item) {
                checkedItems.splice(i, 1);
                return true;
            }
        });
        this.setViewValue(checkedItems);
    }

    render() {
        this.checkboxes.forEach(checkbox => {
            checkbox.render(this.hasChecked(checkbox.element.attr('value')));
        });
    }
}

CheckboxGroupController.$inject = ['$scope', '$element', '$timeout'];

class CheckboxGroupDirective {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.transclude = true;
        this.require = ['?ngModel', 'uiCheckboxGroup'];
        this.scope = true;
        this.controller = CheckboxGroupController;
        this.template = require('./checkboxGroup.html');
    }

    link(scope, element, attrs, ctrls) {
        let ngModelCtrl = ctrls[0];
        let cgCtrl = ctrls[1];

        if (ngModelCtrl) {
            scope.ngModelCtrl = ngModelCtrl;
            ngModelCtrl.$render = cgCtrl.render.bind(cgCtrl);
        }
        element.toggleClass('ui-vertical-group-vertical', attrs.vertical === 'true');
        console.log('group link');
    }

    static getInstance() {
        return new CheckboxGroupDirective();
    }
}

CheckboxGroupDirective.getInstance.$inject = [];

exports.CheckboxDirective = CheckboxDirective;
exports.CheckboxButtonDirective = CheckboxButtonDirective;
exports.CheckboxGroupDirective = CheckboxGroupDirective;
