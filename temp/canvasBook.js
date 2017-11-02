(function () {
    "use strict";
    var ctx = document.querySelector('#canvas-book').getContext('2d');
    //cxt.fillStyle = '#f1c40f';
    //cxt.rotateY(-30);
    //cxt.fillRect(0, 0, 160, 220);

    var data = '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="220">' +
        '<foreignObject width="100%" height="100%">' +

        '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
        document.getElementById('3d-book').innerHTML +
        '</div>' +
        '</foreignObject>' +
        '</svg>';

    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svg);

    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
    }

    img.src = url;
})();