$(function() {
    var editor = editormd("editormd", {
        path : "./vendor/editormd/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
        theme : "dark",
        //previewTheme : "dark",
        editorTheme : "pastel-on-dark",
        toolbarIcons : function() {
            return [
                'undo', 'redo', 'bold', 'del', 'italic',
                'quote', 'uppercase', 'h1', 'h2', 'h3',
                'h4', 'h5', 'h6', 'list-ul', 'list-ol',
                'hr', 'link', 'reference-link', 'image',
                'code', 'preformatted-text', 'code-block', 'table', 'datetime',
                'emoji', 'html-entities', 'pagebreak', 'goto-line', 'watch',
                'unwatch', 'preview', 'search', 'fullscreen', 'clear',
                'help', 'info'
            ].concat('save');
            // Or return editormd.toolbarModes[name]; // full, simple, mini
            // Using "||" set icons align right.
            //return ["undo", "redo", "|", "bold", "hr", "|", "preview", "watch", "|", "fullscreen", "info", "testIcon", "testIcon2", "file", "faicon", "||", "watch", "fullscreen", "preview", "testIcon"]
        },
        toolbarIconsClass: {
            save: 'fa-floppy-o'
        },
        // 自定义工具栏按钮的事件处理
        toolbarHandlers : {
            save: function(cm, icon, cursor, selection) {
                console.log(cm.getTextArea().value);
                $.ajax({
                    type: 'POST',
                    url: '/markdown/save',
                    beforeSend: function(xhrObj){
                        xhrObj.setRequestHeader("Content-Type","application/json");
                        xhrObj.setRequestHeader("Accept","application/json");
                    },
                    //headers: {
                    //    contentType: 'application/json',
                    //},
                    data: JSON.stringify({html: cm.getTextArea().value}),
                    success: function (response) {
                        alert(response.message);
                    },
                    error: function (err) {
                        alert(JSON.stringify(err));
                    },
                    dataType: 'json'
                })
            }
        }
    });

    $.get('EP-FE-2017H1.md').then(function (response) {
        //editor.set(response);
        $('#editormd > textarea').val(response);
    });

    setTimeout(function () {
        "use strict";
        $('#editormd .fa.fa-desktop').trigger('click');
    }, 200);


    /*
     // or
     var editor = editormd({
     id   : "editormd",
     path : "../lib/"
     });
     */
});