/**
 * @file validator utility
 * @author zhangyou04@baidu.com
 */
module.exports = (() => {
    let isNotEmpty = val => !(val === '' || val === null);
    // let minLength = (val, min) => {
    //     return (val || '').length >= min;
    // };
    // let maxLength = (val, max) => {
    //     return (val || '').length <= max;
    // };
    // let checkByRegExp = (val, reg) => {
    //     return reg.test(val);
    // };
    let isValidJson = val => {
        try {
            JSON.parse(val);
        }
        catch (e) {
            return false;
        }
        return true;
    };

    return {
        messages: [],
        decorators: {},
        config: {
            // datasearch
            datasearch: {
                doc: ['checkDocEmpty', 'checkDocValid']
            },

            // model
            model: {
                title: ['chekcTitleEmpty'],
                className: ['checkClassNameEmpty'],
                appPath: ['checkAppPathEmpty'],
                info: ['checkInfoEmpty']
            }
        },
        sortProps: [],
        types: {
            // datasearch
            datasearch: {
                checkDocEmpty: {
                    validate: isNotEmpty,
                    msg: '请输入json'
                },
                checkDocValid: {
                    validate: isValidJson,
                    msg: '输入的json非法'
                }
            },

            // model
            model: {
                chekcTitleEmpty: {
                    validate: isNotEmpty,
                    msg: '模型的标题不能为空'
                },
                checkClassNameEmpty: {
                    validate: isNotEmpty,
                    msg: '模型的调用入口类不能为空'
                },
                checkAppPathEmpty: {
                    validate: isNotEmpty,
                    msg: '模型的存放路径不能为空'
                },
                checkInfoEmpty: {
                    validate: isNotEmpty,
                    msg: '模型info不能为空'
                }
            }
        },
        validate(key, val, parentKey) {
            let me = this;
            let pro;

            this.messages = [];

            if (typeof key === 'object') {
                let data = key;
                parentKey = val;

                if (this.sortProps && this.sortProps.length) {
                    this.sortProps.forEach(function (pro, index) {
                        if (data.hasOwnProperty(pro)) {
                            me.checkRulesByKey(pro, data[pro], parentKey);
                        }
                    });
                }
                else {
                    for (pro in data) {
                        if (data.hasOwnProperty(pro)) {
                            this.checkRulesByKey(pro, data[pro], parentKey);
                        }
                    }
                }
            }
            else {
                this.checkRulesByKey(key, val, parentKey);
            }

            return !this.hasError();
        },
        setSortPros(pros) {
            this.sortProps = pros || this.sortProps;
        },
        hasError() {
            return !!this.messages.length;
        },
        getMessages() {
            return this.messages;
        },
        getFirstMessageText() {
            return this.messages[0] && this.messages[0].text;
        },
        decorate(key, decorator) {
            this.decorators[key] = decorator;
        },
        removeDecorator(key) {
            delete this.decorators[key];
        },
        setDecoratorParams(key, params) {
            this.decorators[key].params = params;
        },
        setDecoratorMsg(key, msg) {
            this.decorators[key].msg = msg;
        },
        checkRulesByKey(key, val, parentKey) {
            if (!this.config[parentKey]) {
                throw new Error('没有' + parentKey + '这个配置项在验证对象中，请确保该配置存在');
            }
            let rules = (parentKey && this.config[parentKey]) ? this.config[parentKey][key] : this.config[key];
            let checker = null;
            let decorator = null;

            if (!rules || rules.length === 0) {
                return;
            }

            for (let i = 0; i < rules.length; i++) {
                checker = this.types[parentKey][rules[i]];
                decorator = this.decorators[rules[i]];

                if (checker && !checker.validate(val, checker.regExp || checker.length)) {
                    this.messages.push({parentKey: parentKey, role: key, text: checker.msg});
                    break;
                }
                else if (decorator) {
                    if (!decorator.validate.apply(this, decorator.params)) {
                        this.messages.push({parentKey: parentKey, role: key, text: decorator.msg});
                    }
                }
            }
        }
    };
})();
