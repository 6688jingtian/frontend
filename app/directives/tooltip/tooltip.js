/**
 * @file tooltip directive
 * @author zhangyou04@baidu.com
 */

// import angular from 'angular';
import './tooltip.less';

class Tooltip {
    constructor($compile, $timeout) {
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.restrict = 'A';
    }

    link(scope, element, attrs) {
        let $element = angular.element(element);
        let template = require('./tooltip.html');
        let isShowTooltip = false;
        let $tooltip = angular.element(template);
        let tooltipContent = attrs.tooltip;
        let renderTooltip = tooltipContent => {
            let tooltipDom = this.$compile(tooltipContent)(scope);
            $tooltip = $tooltip || angular.element(template);
            $tooltip.attr('placement', attrs.placement || 'bottom');
            $tooltip.html(tooltipDom.length ? tooltipDom : tooltipContent);
        };
        let getPositionByPlacement = (placement, elementRect, tooltipRect) => {
            let arrowPadding = 5;
            let left = Math.max(0, elementRect.left - (tooltipRect.width - elementRect.width) / 2);
            let top = 0;
            if (elementRect.top - tooltipRect.height >= 0) {
                top = elementRect.top - tooltipRect.height;
            }
            else {
                top = elementRect.top + elementRect.height;
            }
            switch (placement) {
                case 'bottom':
                    left = Math.max(0, elementRect.left - (tooltipRect.width - elementRect.width) / 2);
                    top = elementRect.bottom + arrowPadding;
                    //top = elementRect.top - tooltipRect.height >= 0
                    //    ? elementRect.top - tooltipRect.height
                    //    : elementRect.top + elementRect.height;
                    break;
                case 'bottomLeft':
                    left = elementRect.left;
                    top = elementRect.bottom + arrowPadding;
                    break;
                case 'bottomRight':
                    left = elementRect.right - tooltipRect.width;
                    top = elementRect.bottom + arrowPadding;
                    break;
                case 'top':
                    left = Math.max(0, elementRect.left - (tooltipRect.width - elementRect.width) / 2);
                    top = elementRect.top - tooltipRect.height - arrowPadding;
                    break;
                case 'topRight':
                    left = elementRect.right - tooltipRect.width;
                    top = elementRect.top - tooltipRect.height - arrowPadding;
                    break;
                case 'topLeft':
                    left = elementRect.left;
                    top = elementRect.top - tooltipRect.height - arrowPadding;
                    break;
                case 'left':
                    left = elementRect.left - tooltipRect.width - arrowPadding;
                    top = elementRect.top - tooltipRect.height - arrowPadding;
                    break;
                case 'leftTop':
                    left = elementRect.left - tooltipRect.width - arrowPadding;
                    top = elementRect.top;
                    break;
                case 'leftBottom':
                    left = elementRect.left - tooltipRect.width - arrowPadding;
                    top = elementRect.top + elementRect.height;
                    break;
                case 'right':
                    left = elementRect.right + arrowPadding;
                    top = elementRect.top - (tooltipRect.height - elementRect.height) / 2;
                    break;
                case 'rightTop':
                    left = elementRect.right - arrowPadding;
                    top = elementRect.top;
                    break;
                case 'rightBottom':
                    left = elementRect.right - arrowPadding;
                    top = elementRect.top + elementRect.height;
                    break;
            }

            return {
                left: left,
                top: top
            };
        };
        let showTooltip = tooltipContent => {
            renderTooltip(tooltipContent);
            let rect = $element[0].getBoundingClientRect();
            $tooltip.css({
                visibility: 'hidden',
                left: rect.left,
                top: rect.top - rect.height > 0 ? rect.top - rect.height : (rect.top + rect.height)
            });
            $tooltip.insertAfter(angular.element('body'));
            $tooltip.on('mouseleave', evt => {
                console.log('mouseleave tooltip...');
                if (isShowTooltip && !this.isMouseInDomArea(evt, $element)
                    && !this.isMouseInDomArea(evt, $tooltip)) {
                    hideTooltip();
                }
            });
            this.$timeout(() => {
                let tooltipRect = $tooltip[0].getBoundingClientRect();
                let position = getPositionByPlacement(attrs.placement || 'bottom', rect, tooltipRect);
                //let left = Math.max(0, rect.left - (tooltipRect.width - rect.width) / 2);
                //let top = 0;
                //if (rect.top - tooltipRect.height >= 0) {
                //    top = rect.top - tooltipRect.height;
                //}
                //else {
                //    top = rect.top + rect.height;
                //}
                $tooltip.css({
                    visibility: 'visible',
                    left: position.left,
                    top: position.top
                });

                isShowTooltip = true;
            }, 25);
        };
        let hideTooltip = () => {
            $tooltip.off('mouseleave');
            //$tooltip && $tooltip.remove();
            $tooltip && $tooltip.hide();
            $tooltip = null;
            isShowTooltip = false;
        };

        attrs.$observe('tooltip', tooltipContent => {
            //console.log('tooltip $observe', tooltipContent);
            if (attrs.forceShow && tooltipContent) {
                showTooltip(tooltipContent);
            }
            else {
                hideTooltip();
            }
        }, true);

        scope.$on('change', (evt, tooltip, show, targetEl) => {
            console.log('change', evt);
            if (targetEl === element) {
                show ? showTooltip(tooltip) : renderTooltip(tooltip);
            }
        });

        $element.on('mouseover', evt => {
            if (!isShowTooltip && tooltipContent) {
                showTooltip(tooltipContent);
            }
        });
        $element.on('mouseleave', evt => {
            if (isShowTooltip && !this.isMouseInDomArea(evt, $element)
                && !this.isMouseInDomArea(evt, $tooltip)) {
                hideTooltip();
            }
        });
    }

    isMouseInDomArea(e, dom) {
        let x = e.clientX;
        let y = e.clientY;
        let offset = dom.offset();
        let width = dom.width();
        let height = dom.height();

        return !(x < offset.left || x > offset.left + width || y < offset.top || y > offset.top + height);
    }

    static getInstance($compile, $timeout) {
        Tooltip.instance = new Tooltip($compile, $timeout);
        return Tooltip.instance;
    }
}

Tooltip.getInstance.$inject = ['$compile', '$timeout'];

module.exports = Tooltip;