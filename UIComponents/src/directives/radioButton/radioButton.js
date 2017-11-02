/**
 * @file radio button directive
 * @author zhangyou04@baidu.com
 */

class RadioDirective {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.transclude = true;
        this.require = ['?ngModel', '^?uiRadioGroup'];
        this.template = require('./radioButton.html');
    }

    link(scope, element, attrs, ctrls) {
        let ngModelCtrl = ctrls[0];
        let rgCtrl = ctrls[1];
        let renderByChecked = isChecked => {
            let toggleClass = isChecked ? 'addClass' : 'removeClass';
            element[toggleClass]('ui-radio-wrapper-checked');
            element.find('.ui-radio')[toggleClass]('ui-radio-checked');
        };
        let render = () => {
            let checked = true;
            if (rgCtrl) {
                checked = rgCtrl.getViewValue() === attrs.value;
            }
            else {
                if (ngModelCtrl) {
                    //ngModelCtrl.$setViewValue(element[0].hasAttribute('value') ? attrs.value : true);
                    checked = element[0].hasAttribute('value')
                        ? ngModelCtrl.$viewValue === attrs.value
                        : ngModelCtrl.$viewValue;
                }
            }
            renderByChecked(checked);
        };

        rgCtrl && rgCtrl.add(render);

        attrs.$observe('value', render);

        element.on('click', (evt) => {
            if (element[0].hasAttribute('disabled')) {
                return;
            }
            scope.$apply(() => {
                if (rgCtrl) {
                    rgCtrl.setViewValue(attrs.value, evt);
                }
                else {
                    if (ngModelCtrl) {
                        ngModelCtrl.$setViewValue(element[0].hasAttribute('value') ? attrs.value : true);
                    }
                }
                render();
            });
        });
    }

    static getInstance() {
        return new RadioDirective();
    }
}

class RadioButtonDirective extends RadioDirective {
    constructor() {
        super();
    }

    link(scope, element, attrs, rgCtrl) {
        super.link(scope, element, attrs, rgCtrl);
        element.addClass('ui-radio-button');
    }

    static getInstance() {
        return new RadioButtonDirective();
    }
}

RadioDirective.getInstance.$inject = [];

class RadioGroupController {
    constructor(scope, element) {
        this.element = element;
        this.scope = scope;
        this.radioButtons = scope.radioButtons || [];
    }

    add(radioButton) {
        this.radioButtons.push(radioButton);
    }

    getViewValue() {
        return this.scope.ngModelCtrl && this.scope.ngModelCtrl.$viewValue;
    }

    setViewValue(val, evt) {
        this.scope.ngModelCtrl && this.scope.ngModelCtrl.$setViewValue(val, evt && evt.type);
        this.render();
    }

    render() {
        this.radioButtons.forEach(radioRender => {
            radioRender();
        });
    }
}

RadioGroupController.$inject = ['$scope', '$element'];

class RadioGroupDirective {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.transclude = true;
        this.scope = true;
        this.require = ['?ngModel', 'uiRadioGroup'];
        this.controller = RadioGroupController;
        this.template = require('./radioGroup.html');
    }

    link(scope, element, attrs, ctrls) {
        let ngModelCtrl = ctrls[0];
        let rgCtrl = ctrls[1];

        if (ngModelCtrl) {
            scope.ngModelCtrl = ngModelCtrl;
            ngModelCtrl.$render = rgCtrl.render.bind(rgCtrl);
        }

        element.toggleClass('ui-radio-group-vertical', attrs.vertical === 'true');
    }

    static getInstance() {
        return new RadioGroupDirective();
    }
}

RadioGroupDirective.getInstance.$inject = [];


exports.RadioDirective = RadioDirective;
exports.RadioButtonDirective = RadioButtonDirective;
exports.RadioGroupDirective = RadioGroupDirective;
