
import codeMirrorEditor from './codeMirrorEditor';
import tooltip from './tooltip';
import setFocus from './setFocus';
import mindmap from './mindmap';
import resizableLayout from './resizableLayout';
import tree from './tree';
import pagination from './pagination';
import table from './table';
import treeTable from './treeTable';
import directedGraph from './directedGraph';
import compile from './compile';
import dropdown from './dropdown';
import autocompletion from './autocompletion';
import searchField from './searchField';
import ratingIndicator from './ratingIndicator';
import accordion from './accordion';
import tabset from './tabset';
import simpleJsonDiff from './simpleJsonDiff';
import copy from './copy';
import autotextarea from './autotextarea';
import carousel from './carousel';
import dialog from './dialog';
import button from './button';
import icon from './icon';
import uiSwitch from './switch';
import radio from './radioButton';
import checkbox from './checkbox';
import d3DndTree from './d3/dndTree';

export default angular.module('ui.directives', [
    codeMirrorEditor, tooltip, setFocus, mindmap, resizableLayout,
    tree,
    pagination,
    table,
    treeTable,
    compile,
    dropdown,
    autocompletion, searchField, ratingIndicator, accordion,
    tabset, simpleJsonDiff, copy, autotextarea, carousel,
    dialog,
    button,
    uiSwitch,
    radio,
    checkbox,
    icon,
    directedGraph, d3DndTree
]).name;


