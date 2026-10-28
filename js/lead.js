(function(){
var D,cur;
function cpf(v){v=v.replace(/\D/g,"").slice(0,11);return v.replace(/(\d{3})(?=\d)/,"$1.").replace(/(\d{3}\.\d{3})(?=\d)/,"$1.").replace(/(\d{3}\.\d{3}\.\d{3})(?=\d)/,"$1-")}
function tel(v){v=v.replace(/\D/g,"").slice(0,11);if(v.length<3)return v;var n=v.length>10?5:4;return"("+v.slice(0,2)+") "+v.slice(2,2+n)+(v.length>2+n?"-"+v.slice(2+n):"")}
function cpfOk(c){c=c.replace(/\D/g,"");if(c.length!==11||/^(\d)\1+$/.test(c))return false;
for(var t=9;t<11;t++){for(var d=0,i=0;i<t;i++)d+=c[i]*(t+1-i);d=(d*10)%11%10;if(d!=c[t])return false}return true}
function url(s,n,c,t){var m="Olá, Benttech "+s.bairro+"! Vim pelo site e quero fazer minha pré-análise.\n\nNome: "+n+"\nCPF: "+c+"\nTelefone: "+t;return"https://wa.me/"+s.whatsapp+"?text="+encodeURIComponent(m)}
function build(){
D=document.createElement("dialog");D.setAttribute("aria-labelledby","lead-t");
D.innerHTML='<form id="lead-f" novalidate><h2 id="lead-t">Fazer pré-análise</h2><p id="lead-s"></p>'+
'<label for="lead-n">Nome</label><input id="lead-n" type="text" autocomplete="name">'+
'<label for="lead-c">CPF</label><input id="lead-c" type="text" inputmode="numeric" autocomplete="off" maxlength="14" placeholder="000.000.000-00">'+
'<label for="lead-p">Telefone</label><input id="lead-p" type="tel" inputmode="tel" autocomplete="tel-national" maxlength="15" placeholder="(41) 90000-0000">'+
'<p id="lead-e" class="erro" role="alert"></p>'+
'<p class="nota">Não guardamos esses dados no site. Eles seguem só na mensagem do WhatsApp, e você confere antes de enviar. A pré-análise não garante aprovação: quem decide é a financeira.</p>'+
'<div class="dlg-acoes"><button class="btn pri" type="submit">Abrir WhatsApp</button><button class="btn ghost" type="button" id="lead-x">Cancelar</button></div></form>';
document.body.appendChild(D);
var f=D.querySelector("#lead-f"),n=D.querySelector("#lead-n"),c=D.querySelector("#lead-c"),t=D.querySelector("#lead-p"),e=D.querySelector("#lead-e");
c.oninput=function(){c.value=cpf(c.value)};t.oninput=function(){t.value=tel(t.value)};
D.querySelector("#lead-x").onclick=function(){D.close()};
D.onclick=function(ev){if(ev.target===D)D.close()};
D.onclose=function(){f.reset();e.textContent=""};
f.onsubmit=function(ev){ev.preventDefault();var er="",foco;
if(n.value.trim().length<3){er="Informe seu nome.";foco=n}
else if(!cpfOk(c.value)){er="CPF inválido. Confira os números.";foco=c}
else if(t.value.replace(/\D/g,"").length<10){er="Informe o telefone com DDD.";foco=t}
e.textContent=er;if(er){foco.focus();return}
var a=document.createElement("a");a.href=url(cur,n.value.trim(),c.value,t.value);a.target="_blank";a.rel="noopener noreferrer";document.body.appendChild(a);a.click();a.remove();D.close()}}
window.BTLead={abrir:function(s){if(!D)build();cur=s;D.querySelector("#lead-s").textContent="Seus dados vão para o WhatsApp da "+s.curto+".";D.showModal();D.querySelector("#lead-n").focus()},cpf:cpf,tel:tel,cpfOk:cpfOk,url:url}})();
