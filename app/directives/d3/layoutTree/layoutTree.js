/**
 * @file directed graph directive
 * @author zhangyou04
 */
import './layoutTree.less';
//import * as d3 from 'd3';
import './d3.layout.min';

export default class LayoutTreeDirective {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.scope = {
            data: '=',
            width: '=',
            height: '=',
            tooltip: '=getTooltip'

        };
        this.template = '<div class="d3-layout-tree"></div>';
    }

    link(scope, element, attrs) {
        d3.select(element[0]).append("svg:svg")
        scope.$watch('data', data => {
            if (data) {
                this.draw(data, element, scope);
            }
        });
        scope.$watch('height', height => {
            if (height) {
                this.draw(scope.data, element, scope);
            }
        });
        scope.$watch('width', width => {
            console.log('watch width:', width);
            if (width) {
                this.draw(scope.data, element, scope);
            }
        });
    }

    draw(data, element, scope) {
        let m = [20, 120, 20, 120];
        let w = (scope.width || 1280) - m[1] - m[3];
        let h = (scope.height || 800) - m[0] - m[2];
        let i = 0;
        let root = data;

        let tree = d3.layout.tree()
            .size([h, w]);

        let diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        element.empty();
        let vis = d3.select(element[0]).append('svg:svg')
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

        root = data;
        root.x0 = h / 2;
        root.y0 = 0;

        function toggleAll(d) {
            if (d.children) {
                d.children.forEach(toggleAll);
                toggle(d);
            }
        }

        // Initialize the display to show a few nodes.
        (root.children || []).forEach(toggleAll);
        (root.children || []).forEach(child => {
            toggle(child);
        });

        update(root);

        function update(source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });
            let getTooltip = (node) => {
                if (scope.tooltip) {
                    return angular.isFunction(scope.tooltip) ? scope.tooltip(node) : scope.tooltip;
                }
                return node.name;
            };
            let nodeRadius = 5;

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", function(d) { toggle(d); update(d); })
                .on('mouseover', d => {
                    console.log('hover', d);
                    let d3Tooltip = element.find('.d3-tooltip');
                    if (d3Tooltip.length === 0) {
                        d3Tooltip = $('<div class="d3-tooltip">' + getTooltip(d) + '</div>')
                        element.append(d3Tooltip);
                        d3Tooltip.on('mouseover', (evt) => {
                            d3Tooltip.css({opacity: 1});
                        }).on('mouseout', (evt) => {
                            d3Tooltip.css({opacity: 0});
                        });
                    }
                    else {
                        d3Tooltip.html(getTooltip(d));
                    }
                    d3Tooltip.css({
                        left: d.y + m[3] + nodeRadius * 2,
                        top: d.x + m[0],
                        opacity: 1
                    });

                })
                .on('mouseout', d => {
                    console.log(arguments);
                    element.find('.d3-tooltip').css('opacity', 0);
                });

            nodeEnter.append("svg:circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("svg:text")
                .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                .text(function(d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", nodeRadius)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links(nodes), function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children.
        function toggle(d) {
            console.log('toggle', d);
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
        }

    }
}
