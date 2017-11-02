/**
 * @file CodeMirrorEditor directive
 * @author zhangyou04@baidu.com
 */

class CodeMirrorEditor {
    constructor($timeout) {
        this.restrict = 'AE';
        this.replace = true;
        this.scope = {
            editor: '=',
            option: '='
        };
        this.$timeout = $timeout;
    }

    link(scope, element, attrs) {
        let CodeMirror = window.CodeMirror;
        let defaultOption = {
            mode: 'text/x-mysql',
            indentWithTabs: true,
            lineWrapping: true,
            smartIndent: false,
            lineNumbers: true,
            matchBrackets: true,
            autofocus: false,
            completeSingle: false,
            readOnly: !!attrs.readOnly,
            width: attrs.width || '100%',
            extraKeys: {
                'Ctrl-Space': 'autocomplete'
                // 'Ctrl': 'autocomplete'
            },
            hint: CodeMirror.hint.sql,
            hintOptions: {}
        };

        if (scope.editor) {
            element.val(scope.editor.value || '');
        }

        let editorInstance = CodeMirror.fromTextArea(
            element[0],
            angular.extend(defaultOption, scope.option)
        );
        editorInstance.on('change', function (editor) {
            let value = editor.getValue();
            if (scope.editor) {
                scope.editor.value = value;
            }

            element.val(value);
            element.trigger('change');
        });
        editorInstance.on('keyup', function (editor, evt) {
            // console.log(evt, evt.keyCode);
            // 上、下、左、右、enter、space、esc、delete不处理
            // if (!Utility.isControlKeyCode(evt.keyCode)) {
            //     CodeMirror.showHint(editor, CodeMirror.hint.sql, scope.editor.options && scope.editor.options.hintOptions);
            // }

            // 输入$符号后自动提示变量列表
            if ([52/* , 16*/].indexOf(evt.keyCode) > -1
                && evt.shiftKey) {
                CodeMirror.showHint(
                    editor,
                    CodeMirror.hint.sql,
                    scope.editor && scope.editor.options && scope.editor.options.hintOptions
                );
            }
        });

        // if (attrs.cmEditor) {
        //     scope.$watch(attrs.cmEditor, (value) => {
        //         console.log('attrs.cmEditor', value);
        //     }, true);
        // }

        if (scope.editor) {
            scope.$watch('editor.value', function (value) {
                element.val(value);
                if (editorInstance.getValue() !== value) {
                    editorInstance.setValue(value || '');
                }
            });
        }
        else {
            // update the editor value after the textarea ng-model directive be parsed over
            this.$timeout(() => {
                if (editorInstance.getValue() !== element.val()) {
                    editorInstance.setValue(element.val());
                }
            });
        }

        // CodeMirror.commands.autocomplete = function(cm) {
        //     console.log('autocomplete', CodeMirror.hint.sql);
        //     CodeMirror.showHint(cm, CodeMirror.hint.sql, {
        //         tables: {
        //             "table1": [ "col_A", "col_B", "col_C" ],
        //             "table2": [ "other_columns1", "other_columns2" ]
        //         }
        //     } );
        // };

        this.$timeout(() => {
            editorInstance.refresh();
        });
    }

    static getInstance($timeout) {
        CodeMirrorEditor.instance = new CodeMirrorEditor($timeout);
        return CodeMirrorEditor.instance;
    }
}

CodeMirrorEditor.getInstance.$inject = ['$timeout'];

module.exports = CodeMirrorEditor;
