/**
 * @file Accordion Directive
 * @author zhangyou04@baidu.com
 */

import './accordion.less';

class AccordionController {
    constructor(scope) {
        this.accordions = scope.items = [];
        this.destroyed = false;
        scope.$on('$destroy', () => {
            scope.destroyed = true;
        });
    }

    select(selectedItem) {
        this.accordions.forEach(accordion => {
            if (accordion.active && accordion !== selectedItem) {
                accordion.active = false;
            }
        });
        selectedItem.active = true;
    }

    addAccordion(accordion) {
        this.accordions.push(accordion);
        if (this.accordions.length === 1 && accordion.active !== false) {
            accordion.active = true;
        }
        else if (accordion.active) {
            this.select(accordion);
        }
        else {
            accordion.active = false;
        }
    }

    removeAccordion(accordion) {
        let index = this.accordions.indexOf(accordion);
        if (accordion.active && this.accordions.length > 1 && !scope.destroyed) {
            let newActiveIndex = index === this.accordions.length - 1 ? index - 1 : index + 1;
            this.select(this.accordions[newActiveIndex]);
        }
        this.accordions.splice(index, 1);
    }
}

AccordionController.$inject = ['$scope'];

class Accordion {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.transclude = true;
        this.template = require('./accordion.html');
        this.scope = {
            // items: '=',
            activeIndex: '='
        };
        this.controller = AccordionController;
    }

    link(scope, element, attrs, ctrl) {

    }

    static getInstance() {
        Accordion.instance = new Accordion();
        return Accordion.instance;
    }
}

class AccordionItem {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.transclude = true;
        this.require = '^accordion';
        this.template = require('./accordionItem.html');
        this.scope = {
            title: '@'
        };
    }

    link(scope, element, attrs, accordionCtrl) {
        accordionCtrl.addAccordion(scope);
        scope.select = accordionCtrl.select.bind(accordionCtrl, scope);
    }

    static getInstance() {
        AccordionItem.instance = new AccordionItem();
        return AccordionItem.instance;
    }
}

exports.Accordion = Accordion;
exports.AccordionItem = AccordionItem;
