window.BTLoc={init:function(S,done){
var box=document.getElementById("loc"),b=document.getElementById("usar-loc");
if(!box||!("geolocation" in navigator)||!S.length||!S.every(function(s){return s.coords&&s.coords.length===2}))return;
box.hidden=false;
b.onclick=function(){b.disabled=true;
navigator.geolocation.getCurrentPosition(function(p){
var me=[p.coords.latitude,p.coords.longitude],i={};
var l=S.map(function(s){return{s:s,d:km(me,s.coords)}}).sort(function(a,b){return a.d-b.d});
l.forEach(function(x,n){i[x.s.slug]={destaque:n===0,selo:(n===0?"Mais perto de você · ":"")+"cerca de "+x.d.toFixed(1).replace(".",",")+" km em linha reta"}});
b.disabled=false;done(l.map(function(x){return x.s}),i,"")},
function(){b.disabled=false;done(S,{},"Não foi possível usar sua localização. Escolha a cidade na lista acima.")},
{timeout:10000,maximumAge:300000})}}};
function km(a,b){var r=Math.PI/180,x=Math.pow(Math.sin((b[0]-a[0])*r/2),2)+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.pow(Math.sin((b[1]-a[1])*r/2),2);return 12742*Math.asin(Math.sqrt(x))}
