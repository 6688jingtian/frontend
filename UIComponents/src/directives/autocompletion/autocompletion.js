/**
 * @file autocompletion directive
 * @author zhangyou04@baidu.com
 */

class AutoCompletion {
    constructor($compile, $timeout) {
        this.restrict = 'A';
        this.scope = {
            keywords: '=',
            onSelect: '='
        };
        this.$compile = $compile;
        this.$timeout = $timeout;
    }

    compile(element) {
        let template = require('./autocompletion.html');
        let compile = this.$compile;
        let that = this;
        let $ = angular.element;

        const MODES = {
            INSERT: 'insert',
            REPLACE: 'replace'
        };

        return {
            post(scope, element, attrs) {
                attrs.mode = attrs.mode || MODES.REPLACE;
                attrs.extraKeys = attrs.extraKeys || 'Ctrl+Space';

                let autoList;
                let ITEM_HEIGHT = 25;
                let OFFSET_TOP = 20;
                let allKeywords = angular.copy(scope.keywords);
                let isAutoListShow = false;
                let selectItemKeyCodes = [38, 40, 13, 219];
                let hiddenTextareaBox;
                let autoListKeydownHandle = evt => {
                    // up: 38 down: 40 enter: 13
                    if ([38, 40, 13].indexOf(evt.keyCode) !== -1) {
                        let maxIndex = (scope.keywords || []).length - 1;
                        evt.preventDefault();
                        scope.$apply(function () {
                            switch (evt.keyCode) {
                                case 38: // up
                                    scope.activeItemIndex = scope.activeItemIndex - 1 < 0
                                        ? maxIndex : scope.activeItemIndex - 1;
                                    break;
                                case 40: // down
                                    scope.activeItemIndex = scope.activeItemIndex + 1 > maxIndex
                                        ? 0 : scope.activeItemIndex + 1;
                                    break;
                                case 13: // enter
                                    scope.selectItem(scope.keywords[scope.activeItemIndex], evt);
                                    break;
                            }
                        });
                    }
                };
                let getAutoListPosition = evt => {
                    let target = angular.element(evt.currentTarget);
                    let rectBox = target[0].getBoundingClientRect();
                    let position = {
                        left: rectBox.left,
                        top: rectBox.top + rectBox.height
                    };

                    if (attrs.mode === MODES.INSERT) {
                        let autoListHeight = (scope.keywords || []).length * ITEM_HEIGHT;
                        let fakeCursor = hiddenTextareaBox.find('.fake-cursor')[0] || target[0];
                        let cursorRect = fakeCursor.getBoundingClientRect();
                        let bottomLeftHeight = window.innerHeight - cursorRect.top;
                        let top = cursorRect.top + OFFSET_TOP;

                        if (element.is('input')) {
                            top = rectBox.top + rectBox.height;
                        }

                        if (autoListHeight > bottomLeftHeight + OFFSET_TOP) {
                            top = cursorRect.top - autoListHeight - OFFSET_TOP / 2;
                        }

                        position = {
                            top: top,
                            left: cursorRect.left
                        };
                    }

                    return position;
                };
                let clickOuterHandle = evt => {
                    console.log('clickOuterHandle', this);
                    if (!this.isMouseInDomArea(evt, $(element))) {
                        toggleAutoList(false);
                    }
                };
                let toggleAutoList = (isVisible, evt) => {
                    if (isVisible && scope.keywords && scope.keywords.length) {
                        scope.style = getAutoListPosition(evt);
                        autoList && autoList.remove();
                        autoList = $(compile(template)(scope));
                        angular.element('body').append(autoList);
                        angular.element(document).on('click', clickOuterHandle);
                        isAutoListShow = true;
                        angular.element(element).on('keydown', autoListKeydownHandle);
                    }
                    else {
                        autoList && autoList.remove();
                        autoList = null;
                        angular.element(document).off('click', clickOuterHandle);
                        angular.element(element).off('keydown', autoListKeydownHandle);
                        isAutoListShow = false;
                        scope.activeItemIndex = 0;
                    }
                };

                angular.extend(
                    scope,
                    {
                        activeItemIndex: 0,
                        value: '',
                        selectItem(keyword, evt) {
                            evt.preventDefault();
                            let val = $(element).val();
                            let cursorPos = that.getCursorPos(element);

                            if (attrs.mode === MODES.INSERT) {
                                val = val.slice(0, cursorPos) + keyword + val.slice(cursorPos);
                                cursorPos += (keyword || '').length;
                            }
                            if (attrs.mode === MODES.REPLACE) {
                                val = keyword;
                                cursorPos = (keyword || '').length;
                            }
                            $(element).val(val);
                            that.setCursorPosition(element[0], cursorPos, attrs.mode);
                            toggleAutoList(false);
                            scope.keywords = allKeywords;
                            scope.onSelect && scope.onSelect(keyword);
                            setTimeout(() => {
                                // trigger change 同步绑定的值
                                $(element).trigger('change');
                            });
                            scope.keywords = allKeywords;
                        },
                        mouseoverHandle(index) {
                            scope.activeItemIndex = index;
                        }
                    }
                );
                let changeVal = () => {
                    // wordaroud for $rootScope already in progress error
                    if (scope.$root.$$phase !== '$digest') {
                        scope.$apply(() => scope.value = element.val());
                    }
                };
                let targetkeydownHandle = function (evt) {
                    let extraKeys = attrs.extraKeys;
                    let triggerAutoList = false;
                    extraKeys = extraKeys.split('+');

                    if (extraKeys.length > 1) {
                        extraKeys[1] = /Space/i.test(extraKeys[1]) ? ' ' : extraKeys[1];
                        triggerAutoList = evt.key === extraKeys[1] && evt[extraKeys[0].toLowerCase() + 'Key'];
                    }
                    else {
                        triggerAutoList = evt.key === extraKeys[0];
                    }

                    if (triggerAutoList) {
                        //scope.style = getAutoListPosition(evt);
                        scope.$apply(toggleAutoList.bind(this, true, evt));
                    }
                    else {
                        if (isAutoListShow && selectItemKeyCodes.indexOf(evt.keyCode) !== -1) {
                            return;
                        }

                        // {, shift 之外的字符则停止提示
                        // if ([16].indexOf(evt.keyCode) === -1) {
                        //     console.log('targetkeydownHandle else', attrs.mode);
                        //     scope.$apply(() => {
                        //         toggleAutoList(false);
                        //     });
                        // }
                    }
                    // 更新hidden box中的值
                    changeVal();
                };
                let updateFakeCursor = hiddenTextareaBox => {
                    if (hiddenTextareaBox) {
                        let rectBox = element[0].getBoundingClientRect();
                        let computedStyle = window.getComputedStyle(element[0]);
                        let result = '';
                        scope.hiddenBoxStyle = {
                            height: rectBox.height + 'px',
                            width: rectBox.width + 'px',
                            top: rectBox.top + 'px',
                            left: rectBox.left + 'px',
                            padding: computedStyle.padding,
                            fontSize: computedStyle.fontSize,
                            lineHeight: computedStyle.lineHeight
                        };
                        let cursorPos = this.getCursorPos(element);
                        result = scope.value.slice(0, cursorPos) + '<span class="fake-cursor">|</span>'
                            + scope.value.slice(cursorPos);
                        result = result.replace(/<script/gi, '<&script').replace(/<\/script>/gi, '</script&>');
                        hiddenTextareaBox.html(result);
                    }
                };
                let clickHandle = evt => {
                    scope.$apply(() => {
                        updateFakeCursor(hiddenTextareaBox);
                    });
                };

                let focusHandle = function (evt) {
                    if (attrs.mode === MODES.INSERT) {
                        scope.value = element.val();
                        hiddenTextareaBox = compile(
                            '<pre class="hidden-textarea-box" ng-style="hiddenBoxStyle">"'
                            + '{{value}}”<span class="fake-cursor">|</span></pre>'
                        )(scope);
                        updateFakeCursor(hiddenTextareaBox);
                        angular.element('body').append(hiddenTextareaBox);
                    }
                    if (attrs.mode === MODES.REPLACE) {
                        scope.value = element.val();
                        //scope.style = getAutoListPosition(evt);
                        scope.$apply(() => {
                            toggleAutoList(true, evt);
                        });
                    }
                };

                let focusOutHandle = evt => {
                    hiddenTextareaBox && hiddenTextareaBox.remove();
                    hiddenTextareaBox = null;

                    scope.$apply(scope.keywords = allKeywords);
                    //that.$timeout(toggleAutoList.bind(that, false));
                };

                let scrollHandle = evt => {
                    if (hiddenTextareaBox) {
                        that.scrollToTop(hiddenTextareaBox, evt.currentTarget.scrollTop);
                    }
                };

                if (attrs.mode === MODES.REPLACE) {
                    angular.element(element).on('input', evt => {
                        let val = element.val();
                        let keywords = allKeywords.filter(item => {
                            return item.startsWith(val);
                        });
                        scope.$apply(scope.keywords = keywords);
                        if (scope.keywords.length) {
                            //scope.style = getAutoListPosition(evt);
                            //toggleAutoList(true, evt);
                        }
                    });
                }

                scope.$on('$destroy', () => {
                    angular.element(document).off('click', clickOuterHandle);
                });

                angular.element(element).on('keydown', targetkeydownHandle);
                angular.element(element).on('change', changeVal);
                angular.element(element).on('click', clickHandle);
                angular.element(element).on('focus', focusHandle);
                angular.element(element).on('blur', focusOutHandle);
                angular.element(element).on('scroll', scrollHandle);
            }
        };
    }

    getCursorPos(element) {
        return element[0].selectionStart || 0;
    }

    /**
     * 设置 input/textarea 光标的位置
     * @param {HTMLInputElement/HTMLTextareaElement} el 设置的input/textare元素
     * @param {number} index 设置光标的位置
     */
    setCursorPosition(el, index, mode) {
        let val = el.value;
        let len = val.length;

        index = Math.min(index, len);
        index = Math.max(1, index);

        if (mode !== 'replace') {
            el.focus();
            el.setSelectionRange && el.setSelectionRange(index, index);
        }
    }

    scrollToTop(dom, top, animate) {
        let $ = angular.element;
        dom = dom || document.body;
        top = typeof top === 'undefined' ? 0 : top;
        if (animate === false) {
            $(dom).scrollTop(top);
            if (dom.documentElement && dom.documentElement.scrollTop) {
                document.documentElement.scrollTop = top; // Firefox
            }
        }
        else {
            $(dom).animate({scrollTop: top}, 500);
            if (dom.documentElement) {
                $(dom.documentElement).animate({scrollTop: top}, 500); // Firefox
            }
        }
    }

    isMouseInDomArea(e, dom) {
        let x = e.clientX;
        let y = e.clientY;
        let offset = dom.offset();
        let width = parseFloat(dom.css('width'));
        let height = parseFloat(dom.css('height'));

        return !(x < offset.left || x > offset.left + width || y < offset.top || y > offset.top + height);
    }

    static getInstance($compile, $timeout) {
        AutoCompletion.instance = new AutoCompletion($compile, $timeout);
        return AutoCompletion.instance;
    }
}

AutoCompletion.getInstance.$inject = ['$compile', '$timeout'];

module.exports = AutoCompletion;
