/**
 * @file table directive
 * @author zhangyou04@baidu.com
 */
import './table.less';

class TableDirective {
    constructor($timeout) {
        this.restrict = 'AE';
        this.replace = true;
        this.scope = true;
        this.template = require('./table.html');
        this.$timeout = $timeout;
    }

    link(scope, element, attrs) {
        let $ = angular.element;
        let that = this;
        let resizerDown = false;
        let startX = 0;
        let colIndex = 0;
        let width;
        let minTableWidth;
        let colPaddingLeft = 0;
        let headTable = element.find('.grid-header table');
        let bodyTable = element.find('.grid-body table');
        let getWidth = function (dom) {
            return parseInt(dom.css('width'), 10);
        };
        let getVScrollWidth = () => {
            return element.find('.grid-body').width - 2 - bodyTable.width();
        };
        let getMinWidth = index => {
            let minWidth = scope.cols[index].minWidth;
            if (minWidth instanceof Number) {
                return minWidth;
            }
            if (minWidth instanceof String) {
                if (/%$/.test(minWidth)) {
                    return getWidth($(element)) * parseFloat(minWidth, 10) / 100;
                }
                if (/px$/.test(minWidth)) {
                    return parseFloat(minWidth, 10);
                }
            }

            // default min width
            return 40;
        };
        let setColWidthByIndex = function (index, increase) {
            let invisibleRow = $(element).find('.invisible-row');
            let bodyCol = invisibleRow.find('th').eq(index);
            let headerTr = $(element).find('.grid-header tr');
            let headerCol = headerTr.find('th').eq(index);
            let minColWidth = getMinWidth(index);

            let nextBodyCol = bodyCol.next();
            let nextHeadCol = headerCol.next();
            let nextBodyColWidth = getWidth(nextBodyCol);
            let gridContentWidth = getWidth($(element).find('.grid-content'));

            if (width + increase < minColWidth) {
                increase = minColWidth - width;
            }
            width += increase;
            bodyCol.css('width', width);
            headerCol.css('width', width);
            headerCol.find('.col-resizer').css('marginLeft', width - colPaddingLeft - 2);

            // 策略1，table宽度不固定
            // 相邻column宽度变化
            // 如果table 已出现横向滚动条，且意动线正在向左移动则先不增加右侧column宽度，以减少table宽度
            if (getWidth($(element)) < gridContentWidth
                && increase < 0) {
                return;
            }

            nextBodyColWidth -= increase;
            minColWidth = getMinWidth(index + 1);

            if (nextBodyColWidth - increase < minColWidth) {
                nextBodyColWidth = minColWidth;
            }
            if (nextBodyColWidth > minColWidth) {
                nextBodyCol.css('width', nextBodyColWidth);
                nextHeadCol.css('width', nextBodyColWidth);
                nextHeadCol.find('.col-resizer').css('marginLeft', nextBodyColWidth - colPaddingLeft - 2);
            }

            // TODO: 策略2，table宽度固定

            // if (increase < 0
            //     && headerTr.width() <= minTableWidth) {
            //     let lastTd = headerTr.find('td').last();
            //     let lastTh = invisibleRow.find('th').last();
            //     lastTd.css('width', getWidth(lastTd));
            //     lastTh.css('width', getWidth(lastTh));
            // }
        };
        let mousemoveHandle = function (evt) {
            evt.preventDefault();
            if (resizerDown) {
                evt.preventDefault();
                setColWidthByIndex(colIndex, evt.pageX - startX);
                startX = evt.pageX;
            }
        };
        let mouseupHandle = function () {
            resizerDown = false;
            scope.resizerDown = false;
            $(element).find('.grid-header tr .col-resizer').removeClass('dragging');
            document.removeEventListener('mousemove', mousemoveHandle);
            document.removeEventListener('mouseup', mouseupHandle);
        };
        let isMouseInDomArea = (e, dom) => {
            let x = e.clientX;
            let y = e.clientY;
            let offset = dom.offset();
            let width = dom.width();
            let height = dom.height();

            return !(x < offset.left || x > offset.left + width || y < offset.top || y > offset.top + height);
        };
        let hideColumnMenu = () => {
            scope.columnMenusStyle.display = 'none';
        };
        let updateColumnsWidth = () => {
            let invisibleCols = $(element).find('.invisible-row th');
            let gridCols = $(element).find('.grid-header th');
            let vScrollWidth = getVScrollWidth();
            colPaddingLeft = parseInt(gridCols.eq(0).css('paddingLeft'), 10);
            invisibleCols.each(function (i, item) {
                width = getWidth(gridCols.eq(i));
                if (i === invisibleCols.length - 1) {

                }
                $(item).css('width', width);

                gridCols.eq(i).css('width', width);
                gridCols.eq(i).find('.col-resizer').css({
                    marginLeft: (width - colPaddingLeft - 2) + 'px'
                });
            });

            // let invisibleCols = $(element).find('.invisible-row th');
            // let gridCols = $(element).find('.grid-header td');
            // colPaddingLeft = parseInt(gridCols.eq(0).css('paddingLeft'), 10);
            // gridCols.each(function (i, item) {
            //    width =  getWidth(invisibleCols.eq(i));
            //    $(item).css('width', width);
            //    gridCols.eq(i).css('width', width);
            //    gridCols.eq(i).find('.col-resizer').css({
            //        marginLeft: (width - colPaddingLeft - 2) + 'px'
            //    });
            // });
        };
        let watchAttrs = attrList => {
            attrList = attrList || [];
            attrList.forEach((attr, i) => {
                if (angular.isString(attr)) {
                    scope.$watch(
                        attrs[attr],
                        data => {
                            scope[attr] = data;
                            //console.log(attr, data);
                        },
                        true
                    );
                }

                if (Object.prototype.toString.call(attr) === '[object Object]'
                    && attr.name) {
                    scope.$watch(
                        attrs[attr.name],
                        attr.callback || (data => {
                            scope[attr] = data;
                        }),
                        true
                    );
                }
            });
        };

        watchAttrs([
            'cols',
            {
                name: 'rows',
                callback(rows) {
                    scope.rows = rows || [];
                    //console.log('2. rows changed ...', rows);
                    that.$timeout(() => {
                        //console.log('3. update height');
                        if (element.height() <= headTable.height()) {
                            element.height(headTable.height() + bodyTable.height() + 4);
                        }
                        if (headTable.width() !== bodyTable.width()) {
                            headTable.width(bodyTable.width());
                            updateColumnsWidth();
                        }
                    });
                }
            },
            {
                name: 'height',
                callback(height) {
                    scope.height = height;
                    $(element).height(scope.height);
                }
            },
            'columnsSelection',
            'selectRow',
            'tableLayoutFixed',
            {
                name: 'fixedHeader',
                callback(fixedHeader) {
                    scope.fixedHeader = fixedHeader;
                    that.$timeout(
                        () => {
                            //console.log('1. start updateColumnsWidth ...');
                            updateColumnsWidth();
                            minTableWidth = getWidth($(element));
                        },
                        50
                    );
                }
            },
            {
                name: 'withBorder',
                callback(withBorder) {
                    scope.withBorder = angular.isUndefined(withBorder) ? true : withBorder;
                }
            },
            {
                name: 'colResizable',
                callback(colResizable) {
                    scope.colResizable = angular.isUndefined(colResizable) ? true : colResizable;
                }
            },
            'size'
        ]);

        // resize event
        angular.extend(
            scope,
            {
                colIndex: -1,
                columnMenusStyle: {top: 30},
                resizeMovedown(index, evt) {
                    startX = evt.pageX;
                    resizerDown = true;
                    scope.resizerDown = true;
                    $(evt.currentTarget).addClass('dragging');
                    colIndex = index;
                    width = getWidth($(element).find('.grid-header th').eq(index));
                    document.addEventListener('mousemove', mousemoveHandle);
                    document.addEventListener('mouseup', mouseupHandle);
                },
                openColumnMenu(col, index, evt) {
                    let th = $(evt.currentTarget).parents('th');
                    scope.colIndex = index;
                    scope.currentCol = scope.cols[index];
                    angular.extend(scope.columnMenusStyle, {
                        top: th[0].getBoundingClientRect().height,
                        left: th.offset().left - $(element).offset().left,
                        display: 'block'
                    });
                    let outerClickHandle = e => {
                        if (!isMouseInDomArea(e, $(evt.currentTarget))
                            && !isMouseInDomArea(e, $(element).find('li[menu="filter"]'))) {
                            scope.$apply(hideColumnMenu);
                            document.removeEventListener('click', outerClickHandle);
                        }
                    };
                    document.addEventListener('click', outerClickHandle);
                },
                onSort(order, column, index) {
                    scope.colIndex = index;
                    scope.currentCol = scope.cols[index];
                    let col = scope.cols[scope.colIndex];
                    let getCompareFun = order => {
                        let orderNum = order === 'asc' ? 1 : -1;
                        return (a, b) => (a[col.key] - b[col.key] || (a.oldIndex - b.oldIndex)) * orderNum;
                    };
                    scope.cols.forEach(col => {
                        delete col.sortOrder;
                    });
                    col.sortOrder = order;
                    scope.rows.sort(getCompareFun(order));
                },
                doFilter(val) {
                    let col = scope.cols[scope.colIndex];
                    let filterValue = val;
                    if (filterValue) {
                        scope.rows.forEach(row => {
                            row.$invisible = !(new RegExp(filterValue, 'i')).test((row[col.key] || '').toString());
                        });
                    }
                    else {
                        scope.rows.forEach(row => {
                            row.$invisible = false;
                        });
                    }
                    col.filterValue = filterValue;
                    hideColumnMenu();
                },
                initRows(row, index) {
                    if (angular.isUndefined(row.oldIndex)) {
                        row.oldIndex = index;
                    }
                },
                initCols(col, index) {
                    col.$unchecked = false;
                },
                getColFilterValue() {
                    if (scope.colIndex > -1) {
                        return scope.cols[scope.colIndex].filterValue || '';
                    }
                    return '';
                },
                toggleColumnSelection() {
                    scope.showColumnsSelection = !scope.showColumnsSelection;
                },
                toggleChecked(col) {
                    that.$timeout(updateColumnsWidth, 25);
                },
                onSelectRow(row) {
                    scope.selectedRow = row;
                    console.log(scope.selectedRow);
                    angular.isFunction(scope.selectRow) && scope.selectRow(row);
                }
            }
        );

        //if (scope.fixedHeader) {
        //    this.$timeout(
        //        () => {
        //            console.log('1. start updateColumnsWidth ...');
        //            updateColumnsWidth();
        //            minTableWidth = getWidth($(element));
        //        }
        //    );
        //}
    }

    static getInstance($timeout) {
        TableDirective.instance = new TableDirective($timeout);
        return TableDirective.instance;
    }
}

TableDirective.getInstance.$inject = ['$timeout'];

module.exports = TableDirective;
