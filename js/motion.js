(function(){
var h=document.documentElement,hd=document.querySelector(".topo"),t=0;
function topo(){if(hd)hd.classList.toggle("rolou",window.scrollY>8)}
addEventListener("scroll",function(){if(!t){t=1;requestAnimationFrame(function(){t=0;topo()})}},{passive:true});topo();
if(matchMedia("(prefers-reduced-motion:reduce)").matches||!("IntersectionObserver" in window))return;
var c=navigator.connection;if((navigator.deviceMemory&&navigator.deviceMemory<=2)||(c&&c.saveData))h.classList.add("leve");
h.classList.add("anim");
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);el.classList.add("in");
setTimeout(function(){el.classList.remove("rv","in");el.style.removeProperty("--d")},900)})},{rootMargin:"0px 0px -8% 0px",threshold:.08});
function watch(){var n=0;document.querySelectorAll(".loja:not([data-m]),.pgto>div:not([data-m]),.secao h2:not([data-m]),.escolha:not([data-m])").forEach(function(el){
el.setAttribute("data-m","1");el.classList.add("rv");el.style.setProperty("--d",(n++%4)*70+"ms");io.observe(el)})}
watch();var L=document.getElementById("lista");if(L)new MutationObserver(watch).observe(L,{childList:true})})();
