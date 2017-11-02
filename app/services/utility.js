/**
 * @file utility
 * @author zhangyou04@baidu.com
 */
module.exports = {
    getDateTimeStr(date, separator, withTime) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let addZero = function (num) {
            return num > 9 ? ('' + num) : '0' + num;
        };

        separator = separator || '-';

        return year + separator + addZero(month) + separator + addZero(day)
            + (withTime ? (' ' + addZero(hours) + ':' + addZero(minutes)
            + ':' + addZero(seconds)) : '');
    },

    isMouseInDomArea(e, dom) {
        let x = e.clientX;
        let y = e.clientY;
        let offset = dom.offset();
        let width = dom.width();
        let height = dom.height();

        return !(x < offset.left || x > offset.left + width || y < offset.top || y > offset.top + height);
    },

    isDomInViewport(el, isHalf) {
        let top = el.offsetTop;
        let left = el.offsetLeft;
        let width = el.offsetWidth;
        let height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top >= window.pageYOffset
            && left >= window.pageXOffset
            && (top + height * (isHalf ? 0.5 : 1)) <= (window.pageYOffset + window.innerHeight)
            && (left + width * (isHalf ? 0.5 : 1)) <= (window.pageXOffset + window.innerWidth)
        );
    },

    getFullPath() {
        return location.protocol + '//' + location.hostname
            + (location.port ? (':' + location.port) : '') + '/index.html';
    },

    scrollToTop(dom, top, animate) {
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
    },

    // 页面加载脚本判定函数
    loadScript(url, callback, opt) {
        let script = document.createElement('script');
        opt = opt || {};
        script.type = 'text/javascript';
        if (opt.charset) {
            script.charset = opt.charset;
        }
        if (opt.id) {
            script.id = opt.id;
        }

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        }
        else {
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.body.appendChild(script);
    },

    filterEmptyItem(items, key) {
        if (!(angular.isArray(items))) {
            return [];
        }
        return (items || []).filter(function (item) {
            if (angular.isArray(key)) {
                for (let i = 0, len = key.length; i < len; i++) {
                    if (!item[key[i]]) {
                        return false;
                    }
                }
                return true;
            }
            return item[key || 'key'];
        });
    },

    scrollToTop(dom, top, animate) {
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
    },

    isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    },

    parseJson(jsonStr, defaultRes) {
        let result;
        try {
            result = JSON.parse(jsonStr);
        }
        catch (e) {
            result = defaultRes;
        }
        finally {
            if (angular.isArray(defaultRes)
                && defaultRes.length
                && ((angular.isArray(result) && result.length === 0)
                    || !result)) {
                result = defaultRes;
            }

            if (!result && this.isObject(defaultRes)) {
                result = defaultRes;
            }
        }

        return result;
    },

    walkThroughNodes(data, callback, childrenKey, parent) {
        let that = this;
        let processNode = function (data) {
            if (data) {
                // 如果callback 返回值为true则终止遍历
                if (callback(data, parent)) {
                    return;
                }
                if (data[childrenKey]) {
                    data[childrenKey].forEach(function (node) {
                        that.walkThroughNodes(node, callback, childrenKey, data);
                    });
                }
            }
        };
        childrenKey = childrenKey || 'children';
        if (angular.isArray(data)) {
            data.forEach(function (item) {
                processNode(item, parent);
            });
        }
        else {
            processNode(data, parent);
        }
    },

    /**
     * 获取hash中指定参数的值
     *
     * @param  {string} key 参数名
     * @param  {string} hash hash字符串
     * @return {string} 对应参数名的值
     */
    getQuery(key, hash) {
        let query = (hash || location.hash).split('?')[1];
        let obj = {};

        obj = this.parseQuery(query);
        if (obj) {
            return key ? obj[key] : obj;
        }

        return '';
    },

    /**
     * 将字符串参数解析成对象形式并返回
     *
     * @param  {string} query "id=xxx&name=xxx"
     * @return {Object} { id: 'xxx', name: 'xxx' }
     */
    parseQuery(query) {
        if (typeof query === 'string') {
            let params = query.split('&');
            let pairs = [];

            return params.reduce(function (prev, next) {
                if (next) {
                    pairs = next.split('=');
                    // 第一个=号之前的是name 后面的全是值
                    prev[pairs.shift()] = pairs.join('=');
                }
                return prev;
            }, {});
        }

        return null;
    },
    isControlKeyCode(keyCode) {
        let controlKeyCodes = [
            8, 9, 12, 13, 16, 17, 18, 20, 27, 32, 33, 34, 35, 36, 37, 39,
            40, 45, 46, 144, 186, 187, /*189,*/ 190, 191, 192, 219, 220, 221
        ];

        return controlKeyCodes.indexOf(keyCode) > -1;
    },

    /**
     * 设置 input/textarea 光标的位置
     * @param {HTMLInputElement/HTMLTextareaElement} el 设置的input/textare元素
     * @param {number} index 设置光标的位置
     */
    setCursorPosition(el, index) {
        let val = el.value;
        let len = val.length;

        index = Math.min(index, len);
        index = Math.max(1, index);

        el.focus();
        el.setSelectionRange && el.setSelectionRange(index, index);
    },
    jsonDiff(source, target, callback, parent, parentKey) {
        let that = this;
        let compareJson = function (source, target, key, callback) {
            if (source[key] instanceof Object
                && target[key] instanceof Object) {
                that.jsonDiff(source[key], target[key], callback, source, key);
            }
            else if (!(source[key] instanceof Object)
                && source[key] !== target[key]) {
                callback && callback(source, target, key);
            }
        };

        if (this.isObject(source) && this.isObject(target)) {
            if ($.isEmptyObject(source) && !$.isEmptyObject(target)
                && parent && parentKey) {
                return callback && callback(source, target, '', parent, parentKey);
            }
            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    compareJson(source, target, key, callback);
                }
            }
        }

        if (angular.isArray(source) && angular.isArray(target)) {
            if (!source.length && target.length
                && parent && parentKey) {
                return callback && callback(source, target, '', parent, parentKey);
            }
            for (let i = 0, sLen = source.length, tLen = target.length; i < sLen && tLen; i++) {
                compareJson(source, target, i, callback);
            }
        }

        if (!(source instanceof Object)
            && source !== target) {
            return callback && callback(source, target);
        }

        return source;
    },
    highlightJsonDiff(source, target, isGreen) {
        let tagName = !isGreen ? 'span' : 'b';
        return this.jsonDiff(source, target, function (source, target, key, parent, parentKey) {
            if (!(source instanceof Object) && !key) {
                return '<' + tagName + ' class="highlight-red">' + source + '</' + tagName + '>';
            }

            if (source instanceof Object && !key) {
                if (($.isEmptyObject(source) || !source.length)
                    && parent && parentKey) {
                    let colorKey = '<' + tagName + '>' + parentKey + '</' + tagName + '>';
                    parent[colorKey] = '<' + tagName + '>' + JSON.stringify(source) + '</' + tagName + '>';
                    delete parent[parentKey];
                    return parent[colorKey];
                }
                return '<' + tagName + ' class="highlight-red">' + source + '</' + tagName + '>';
            }

            // source[key] = '<' + tagName + ' class="highlight-red">' + source[key] + '</' + tagName + '>';
            source['<' + tagName + '>' + key + '</' + tagName + '>'] = '<' + tagName + ' class="highlight-red">'
                + source[key] + '</' + tagName + '>';
            delete source[key];
            return source;
        });
    }
};
