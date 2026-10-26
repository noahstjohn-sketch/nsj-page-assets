
function __units(el){  // the words on el's last line flow: nested blocks are their own blocks, <br> starts a new line
  var u=[],gap=true,w=document.createTreeWalker(el,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:function(n){
    if(n.nodeType===3)return NodeFilter.FILTER_ACCEPT;
    if(n.tagName==='BR'){u=[];gap=true;return NodeFilter.FILTER_SKIP}
    if(/^(SCRIPT|STYLE)$/.test(n.tagName)||getComputedStyle(n).display!=='inline')return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_SKIP}});
  for(var n;(n=w.nextNode());){var re=/[^ \t\n\r]+/g,m;
    while((m=re.exec(n.data))){
      if(m.index===0&&!gap&&u.length){var p=u[u.length-1];p.en=n;p.e=m.index+m[0].length;p.t+=m[0]}  // '$17<s>$252</s>' is one word
      else u.push({sn:n,s:m.index,en:n,e:m.index+m[0].length,t:m[0]});
      gap=false}
    if(n.data.length)gap=/[ \t\n\r]$/.test(n.data)}
  return u}
function __blocks(root){return [].filter.call(root.querySelectorAll('*'),function(el){
  return !el.closest('script,style')&&getComputedStyle(el).display!=='inline'&&
    [].some.call(el.childNodes,function(c){return c.nodeType===3&&c.data.trim()})})}

function __join(el,a,b){  // turn the space between word a and word b into one no-break space
  var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),on=false,put=false;
  for(var n;(n=w.nextNode());){if(n===a.en)on=true;if(!on)continue;
    var s=n===a.en?a.e:0,e=n===b.sn?b.s:n.data.length;
    if(e>s&&!/\S/.test(n.data.slice(s,e))){var ins=put?'':' ';n.data=n.data.slice(0,s)+ins+n.data.slice(e);put=true}
    if(n===b.sn)break}}
function __fits(el,fn){  // join, but back out if the joined words would stick out of the box (ORPHAN_JS then flags it)
  var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),ns=[],ds=[];for(var n;(n=w.nextNode());){ns.push(n);ds.push(n.data)}
  fn();if(el.scrollWidth>el.clientWidth+1)ns.forEach(function(n,i){n.data=ds[i]})}
function __glue(root){__blocks(root).forEach(function(el){var u=__units(el),k=u.length;if(k<2||/\u00a0/.test(u[k-1].t))return;  // already glued
  __fits(el,function(){__join(el,u[k-2],u[k-1])});
  if(k>2&&(u[k-2].t+' '+u[k-1].t).length<11){u=__units(el);k=u.length;if(k>2)__fits(el,function(){__join(el,u[k-2],u[k-1])})}})}

var __root=function(){return document.getElementById('r17')||document.body};
__glue(__root());
window.addEventListener('load',function(){__glue(__root());setTimeout(function(){__glue(document.body)},1500)});
