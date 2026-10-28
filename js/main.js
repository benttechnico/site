(function(){
var S=window.STORES||[],X=' target="_blank" rel="noopener noreferrer"';
function $(s){return document.querySelector(s)}
function wa(s){return"https://wa.me/"+s.whatsapp+"?text="+encodeURIComponent("Olá! Vim pelo site da Benttech.")}
function url(s){return"loja.html?loja="+encodeURIComponent(s.slug)}
function card(s,i){var h=s.horarios[0];i=i||{};
return'<article class="loja'+(i.destaque?' destaque':'')+'"><img src="'+s.foto+'" alt="'+s.fotoAlt+'" loading="lazy"><div class="corpo">'+
(i.selo?'<p class="selo">'+i.selo+'</p>':'')+'<h3><a href="'+url(s)+'"'+X+'>'+s.curto+'</a></h3><p class="tipo">'+s.tipo+'</p>'+
'<p>'+s.endereco+'<br>'+s.bairro+', '+s.cidade+'</p><p class="hora">'+h[0]+': '+h[1]+'</p><div class="acoes">'+
'<a class="btn pri" href="'+wa(s)+'"'+X+'>Falar no WhatsApp</a><a class="btn" href="'+s.mapa+'"'+X+'>Como chegar</a>'+
'<a class="btn ghost" href="'+url(s)+'"'+X+'>Ver loja</a></div><button type="button" class="btn rosa lead" data-lead="'+s.slug+'">Fazer pré-análise</button></div></article>'}
function render(l,info){info=info||{};$("#lista").innerHTML=l.map(function(s){return card(s,info[s.slug])}).join("")}
function por(c){return[c?S.filter(function(s){return s.cidade===c}):S.slice(),{}]}
function pagina(el){var p=new URLSearchParams(location.search).get("loja"),s=S.filter(function(x){return x.slug===p})[0];
if(!s){document.title="Loja não encontrada · Benttech";el.innerHTML='<h1>Loja não encontrada</h1><p>Confira o link ou escolha uma unidade na lista.</p><a class="btn pri" href="index.html#lojas">Ver as lojas</a>';return}
document.title=s.curto+" · "+s.bairro+", "+s.cidade+" · Benttech";
el.innerHTML='<a class="voltar" href="index.html#lojas">Todas as lojas</a><p class="tipo">'+s.tipo+'</p><h1>'+s.curto+'</h1>'+
'<address>'+s.endereco+'<br>'+s.bairro+', '+s.cidade+' - '+s.uf+', '+s.cep+'</address><div class="acoes">'+
'<a class="btn pri" href="'+wa(s)+'"'+X+'>Falar no WhatsApp</a><a class="btn" href="'+s.mapa+'"'+X+'>Como chegar</a></div><button type="button" class="btn rosa lead" data-lead="'+s.slug+'">Fazer pré-análise</button>'+
'<h2>Horários</h2><dl>'+s.horarios.map(function(h){return'<div><dt>'+h[0]+'</dt><dd>'+h[1]+'</dd></div>'}).join("")+'</dl>'+
'<h2>Sobre a loja</h2><p>'+s.resumo+'</p><dl><div><dt>Telefone</dt><dd><a href="tel:+'+s.whatsapp+'">'+s.tel+'</a></dd></div>'+
'<div><dt>Instagram</dt><dd><a href="'+s.instagram+'"'+X+'>Abrir perfil</a></dd></div><div><dt>Google</dt><dd>★ '+s.google+'</dd></div></dl>'+
'<img src="'+s.foto+'" alt="'+s.fotoAlt+'">';
var b=$("#barra");b.href=wa(s);b.hidden=false}
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-lead]");if(!b||!window.BTLead)return;var s=S.filter(function(x){return x.slug===b.getAttribute("data-lead")})[0];if(s)window.BTLead.abrir(s)});
var L=$("#lista");
if(L){if(!S.length){L.innerHTML='<p class="aviso" role="alert">Não foi possível carregar as lojas agora. Atualize a página ou chame no WhatsApp: <a href="https://wa.me/5541995562640">(41) 99556-2640</a>.</p>'}
else{render(S);var sel=$("#regiao");
sel.innerHTML+=S.map(function(s){return s.cidade}).filter(function(c,i,a){return a.indexOf(c)===i}).map(function(c){return"<option>"+c+"</option>"}).join("");
$(".escolha").hidden=false;
sel.onchange=function(){var r=por(sel.value);render(r[0],r[1])};
if(window.BTLoc)window.BTLoc.init(S,function(l,i,m){sel.value="";render(l,i);$("#msg").textContent=m||""})}}
var P=$("#pagina");if(P)pagina(P)})();
