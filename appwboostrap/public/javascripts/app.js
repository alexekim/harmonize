$('#regionA').attr('data-content', 0);
$('#regionB').attr('data-content', 0);
var contentAll = {regionA: [['drummer', 1000], ['violist', 1000], ['keyboardist', 1000], ['violinist', 1000], ['screamer', 1000], ['soprano', 1000], ['saxophonist', 1000], ['flutist', 1000], ['rockstar', 1000]]
, regionB: [['etc 1', 1000], ['another 2', 1000], ['third', 1000]]};

var changeRegion = function(id){
var $el = $('#'+id),
num = $el.attr('data-content'),
content = contentAll[id],
numMax = content.length,
time = null;

num = (num+1)%content.length;
time = content[num][1];
$el.html(content[num][0]);
$el.attr('data-content', num);
setTimeout(function(){changeRegion(id)}, time);
};
setTimeout(function(){changeRegion('regionA')},contentAll['regionA'][0][0]);
