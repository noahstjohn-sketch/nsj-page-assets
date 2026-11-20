<script>/* bump module v3fix v2: flips the bump cards to Miles order (white title + savings next to the checkbox, orange kicker chip underneath), clean description, framed cover, value chips */
(function(){
function v3fix(){
document.querySelectorAll('[data-page-element="CheckoutProductCardBump/V2"]').forEach(function(c){
if(c.__v3done)return;
var pill=c.querySelector('.r17-pill');
if(!pill)return;
var h=c.querySelector('.elProductBumpHeadline');
if(!h)return;
var merged=h.innerHTML;
var m=merged.search(/Jumpstart Shortcut:|Done-For-You:/);
if(m<0)return;
var title=merged.slice(0,m).replace(/\s+$/,'');
var pre=merged.slice(m);
var d=c.querySelector('.elProductCardDescription');
if(!d)return;
var img=d.querySelector('.r17-bimg');
var desc=pill.innerHTML;
var isAV=/Audio Vault/i.test(c.textContent);
var img=isAV?'https://noahstjohn.com/wp-content/uploads/2026/11/mm-bump-audio-vault.jpg?v=6':'https://noahstjohn.com/wp-content/uploads/2026/11/mm-bump-rewrite-kit.jpg?v=6';
var value=isAV?'Value: $75':'Value: $71';
if(title){h.innerHTML=title}
var chip=document.createElement('div');chip.className='r17-chip';chip.innerHTML=pre;
d.innerHTML='<div class="r17-bdesc">'+desc+'</div><div class="r17-bframe"><img class="r17-bimg" src="'+img+'" alt=""></div><div class="r17-chips"><span class="r17-chip-a">&#128275; Instant Access</span><span class="r17-chip-v">'+value+'</span></div>';
row=c.querySelector('.elProductCardInputAndTitle');
row.parentNode.insertBefore(chip,row.nextSibling);
pill.remove();
c.__v3done=1;
if(!c.__r17click){c.__r17click=1;c.addEventListener('click',function(e){if(e.target.closest('label,input'))return;var x=c.querySelector('input[type=checkbox]');if(x)x.click()})}
})
}
function fixSummary(){
var sums=[].slice.call(document.querySelectorAll('.elOrderSummaryWrapper')).filter(function(s){return s.offsetParent});
var sumw=sums[0];
if(!sumw)return;
if(!sumw.__expanded){var tog=sumw.querySelector('.elOrderSummaryToggleable');if(tog){tog.click();sumw.__expanded=1}}
var head=sumw.querySelector('.elOrderSummaryHeadText');if(head&&head.textContent==='Summary')head.textContent='Order summary';
sumw.querySelectorAll('.elOrderSummaryRow').forEach(function(r){
if(r.__mmclean)return;
var left=r.querySelector('.elOrderSummaryRowLeft');if(!left)return;
var t=left.textContent||'';
if(t.indexOf('Add The Money Story Rewrite Kit')>-1){left.textContent='The Money Story Rewrite Kit';r.__mmclean=1}
else if(t.indexOf('Add The Money Magnet Audio Vault')>-1){left.textContent='The Money Magnet Audio Vault';r.__mmclean=1}
});
}
v3fix();setTimeout(v3fix,1500);setTimeout(v3fix,4000);var __fsN=0;var __fsT=setInterval(function(){fixSummary();if(++__fsN>30)clearInterval(__fsT)},1000);try{var co3=document.querySelector('.elCheckout');if(co3)new MutationObserver(function(){clearTimeout(window.__r17v3);window.__r17v3=setTimeout(function(){v3fix();fixSummary()},50)}).observe(co3,{childList:true,subtree:true})}catch(e){}
})();
</script>