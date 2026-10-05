(function(){
var d=document,h=d.documentElement,rm=matchMedia("(prefers-reduced-motion:reduce)").matches,fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
var $=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
/* progress bar */
var bar=d.createElement("div");bar.className="prog";d.body.appendChild(bar);
/* preloader */
var home=d.getElementById("home"),pre;
function start(){if(home)home.classList.add("go")}
if(!rm){pre=d.createElement("div");pre.className="pre";pre.innerHTML='<div><b><i>Energize Express</i></b><span></span></div>';d.body.appendChild(pre);
var hide=function(){if(pre.done)return;pre.done=1;pre.classList.add("done");setTimeout(start,350);setTimeout(function(){pre.remove()},1100)};
setTimeout(hide,1500);}else start();
/* hero headline split */
var h1=d.querySelector("#home h1");
if(h1){var t=h1.textContent.trim().split(/\s+/);h1.setAttribute("aria-label",t.join(" "));h1.innerHTML=t.map(function(w,i){return '<span class="w" aria-hidden="true"><i style="--i:'+i+'">'+w+"</i></span>"}).join(" ")}
/* cursor */
if(fine){h.classList.add("cur");var dot=d.createElement("div"),ring=d.createElement("div");dot.className="cur-dot";ring.className="cur-ring";ring.innerHTML="<em></em>";d.body.append(ring,dot);
var mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,lab=ring.firstChild;
addEventListener("mousemove",function(e){mx=e.clientX;my=e.clientY;dot.style.transform="translate("+mx+"px,"+my+"px)"},{passive:true});
(function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform="translate("+rx+"px,"+ry+"px)";requestAnimationFrame(loop)})();
var lastT=null;
function setRing(t){lastT=t;ring.className="cur-ring";if(!t)return;
/* blog card first: its full-card overlay link would otherwise win as a plain <a> */
var el=t.closest(".blog-card")||t.closest("a,button,.btn,.job-trigger,.solution-card,.why-card,.philosophy-card,.perk-card");if(!el)return;
if(el.matches(".btn"))ring.classList.add("btnh");else if(el.matches(".blog-card")){ring.classList.add("lbl");lab.textContent="Read"}else if(el.matches(".job-trigger")){ring.classList.add("lbl");lab.textContent=el.parentNode.classList.contains("open")?"Close":"Open"}else ring.classList.add("link")}
d.addEventListener("mouseover",function(e){setRing(e.target)});
/* after a click (e.g. FAQ/job opens or closes) refresh the label straight away */
d.addEventListener("click",function(e){if(e.target.closest&&e.target.closest(".job-trigger")){setTimeout(function(){setRing(lastT)},0)}});
d.addEventListener("mouseleave",function(){ring.className="cur-ring"})}
/* magnetic buttons, spotlight, tilt */
if(fine&&!rm){$(".btn,.hamburger").forEach(function(b){b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+(e.clientX-r.left-r.width/2)*.28+"px,"+(e.clientY-r.top-r.height/2)*.4+"px)"});b.addEventListener("mouseleave",function(){b.style.transform=""})});
$(".philosophy-card,.solution-card,.why-card,.perk-card,.mv-card,.blog-card").forEach(function(c){c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty("--mx",x+"px");c.style.setProperty("--my",y+"px");if(!c.matches(".mv-card"))c.style.transform="perspective(900px) rotateX("+((y/r.height-.5)*-6)+"deg) rotateY("+((x/r.width-.5)*6)+"deg) translateY(-6px)"});c.addEventListener("mouseleave",function(){c.style.transform=""})})}
/* marquee from existing solution names */
var hs=d.querySelector(".hero-strip");
if(hs&&$(".solution-card h4").length){var names=$(".solution-card h4").map(function(n){return n.textContent}),m=d.createElement("div");m.className="marquee";m.setAttribute("aria-hidden","true");var s=names.map(function(n){return"<span>"+n+"</span>"}).join("");m.innerHTML="<div>"+s+s+"</div>";hs.after(m)}
/* hero canvas: rising lines */
var cv=null;
if(home&&!rm){cv=d.createElement("canvas");cv.id="fx";home.insertBefore(cv,home.firstChild);var g=cv.getContext("2d"),W,H,pts=[];
var fit=function(){W=cv.width=home.offsetWidth;H=cv.height=home.offsetHeight};fit();addEventListener("resize",fit);
for(var i=0;i<46;i++)pts.push({x:Math.random(),y:Math.random(),s:.0001+Math.random()*.0003,r:1+Math.random()*1.6});
var tt=0;(function draw(){tt+=.006;g.clearRect(0,0,W,H);
for(var k=0;k<3;k++){g.beginPath();for(var x=0;x<=W;x+=14){var u=x/W,y=H*(.78-.42*u-k*.07)+Math.sin(u*9+tt+k*2)*14+Math.sin(u*23-tt*2)*5;x?g.lineTo(x,y):g.moveTo(x,y)}g.strokeStyle="rgba(240,201,122,"+(.34-k*.09)+")";g.lineWidth=1.4;g.stroke()}
pts.forEach(function(p){p.y-=p.s*8;p.x+=p.s*3;if(p.y<0){p.y=1;p.x=Math.random()}g.beginPath();g.arc(p.x*W,p.y*H,p.r,0,6.3);g.fillStyle="rgba(240,201,122,.55)";g.fill()});
requestAnimationFrame(draw)})()}
/* counter */
var yr=d.querySelector(".hero-strip-item .k");
if(yr&&/^\d{4}$/.test(yr.textContent.trim())&&!rm){var tgt=+yr.textContent,t0=0;setTimeout(function(){(function f(n){t0=t0||n;var p=Math.min((n-t0)/1600,1);yr.textContent=Math.round(tgt-(1-(1-Math.pow(1-p,3)))*0+ (p-1)*70*(1-p>0?1:0));if(p<1)requestAnimationFrame(f);else yr.textContent=tgt})(performance.now())},1500)}
/* reveal + stagger */
$(".card-grid,.philosophy-grid,.why-grid,.careers-perks,.timeline,.blog-grid,.mv-grid,.contact-details,.founders-panel ul").forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.classList.add("reveal");c.setAttribute("data-from",["l","b","r","t","f","z"][i%6]);c.style.setProperty("--d",Math.min(i,6)*110+"ms")})});
$(".blog-hero h1,.blog-hero p,.legal h1,main h1").forEach(function(e){if(!e.closest("#home"))e.classList.add("reveal")});
var els=$(".reveal");
if(rm||!("IntersectionObserver" in window))els.forEach(function(e){e.classList.add("in")});
else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add("in");io.unobserve(t);setTimeout(function(){t.classList.add("done")},1300+(parseInt(t.style.getPropertyValue("--d"))||0))}})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});els.forEach(function(e){io.observe(e)})}
/* scroll: progress, parallax, nav hide, timeline fill */
var hd=d.getElementById("top"),tl=d.querySelector(".timeline"),last=0,tick=false;
function onS(){var y=scrollY,max=h.scrollHeight-innerHeight;bar.style.transform="scaleX("+(max>0?y/max:0)+")";
if(home&&!rm&&y<innerHeight*1.2)home.style.setProperty("--py",y*.25+"px");
if(hd){hd.classList.toggle("hide",y>last&&y>260&&!d.getElementById("mobileNav").classList.contains("open"));}
last=y;
if(tl){var r=tl.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.8-r.top)/(r.height+innerHeight*.2)));tl.style.setProperty("--p",p)}
tick=false}
addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(onS)}},{passive:true});onS();
})();

/* =========================================================
   ENERGIZE EXPRESS — IMMERSIVE V2 INTERACTION LAYER
   Adds a lightweight GPU-friendly canvas visual without changing content.
   ========================================================= */
(function(){
  var d=document, root=d.documentElement;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var hero=d.getElementById('home');
  if(!hero || reduce) return;

  /* Ambient particle / fluid field */
  var cv=d.createElement('canvas'); cv.id='fx-v2';
  hero.insertBefore(cv, hero.firstChild);
  var ctx=cv.getContext('2d',{alpha:true});
  var W=0,H=0,dpr=Math.min(devicePixelRatio||1,1.75), raf=0;
  var mouse={x:.72,y:.48,tx:.72,ty:.48};
  var blobs=[];
  var count=Math.min(34,Math.max(18,Math.floor(innerWidth/45)));
  for(var i=0;i<count;i++) blobs.push({
    a:Math.random()*Math.PI*2,r:.18+Math.random()*.38,s:.00025+Math.random()*.0005,
    size:30+Math.random()*90,alpha:.04+Math.random()*.10,phase:Math.random()*10
  });
  function fit(){W=hero.clientWidth;H=hero.clientHeight;cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
  fit(); addEventListener('resize',fit,{passive:true});
  addEventListener('pointermove',function(e){mouse.tx=e.clientX/innerWidth;mouse.ty=e.clientY/innerHeight},{passive:true});
  function glow(x,y,r,c,a){var g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba('+c+','+a+')');g.addColorStop(.42,'rgba('+c+','+(a*.35)+')');g.addColorStop(1,'rgba('+c+',0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}
  function draw(t){
    var time=t*.001; mouse.x+=(mouse.tx-mouse.x)*.035; mouse.y+=(mouse.ty-mouse.y)*.035;
    ctx.clearRect(0,0,W,H);
    /* three slow-moving energy fields */
    glow(W*(.70+Math.sin(time*.17)*.04)+mouse.x*W*.025,H*(.46+Math.cos(time*.13)*.08)+mouse.y*H*.025,Math.min(W,H)*.43,'104,119,255',.16);
    glow(W*(.84+Math.cos(time*.11)*.06),H*(.68+Math.sin(time*.15)*.07),Math.min(W,H)*.30,'103,232,249',.10);
    glow(W*(.56+Math.sin(time*.09)*.05),H*(.24+Math.cos(time*.12)*.06),Math.min(W,H)*.28,'167,139,250',.07);
    /* orbital particles */
    blobs.forEach(function(p,i){
      p.a+=p.s*(i%2?-1:1)*1.4;
      var cx=W*(.72+Math.sin(time*.07+p.phase)*.11), cy=H*(.50+Math.cos(time*.09+p.phase)*.15);
      var x=cx+Math.cos(p.a+time*.05)*W*p.r*.34;
      var y=cy+Math.sin(p.a+time*.04)*H*p.r*.34;
      x+=(mouse.x-.5)*30; y+=(mouse.y-.5)*22;
      ctx.beginPath();ctx.arc(x,y,p.size*.035,0,Math.PI*2);ctx.fillStyle='rgba(217,255,99,'+p.alpha+')';ctx.fill();
    });
    /* fine flowing contour lines */
    for(var k=0;k<5;k++){
      ctx.beginPath();
      for(var x=0;x<=W;x+=16){
        var u=x/W;
        var y=H*(.68-.18*u-k*.045)+Math.sin(u*7.5+time*.28+k)*18+Math.sin(u*18-time*.18)*7+(mouse.x-.5)*12;
        if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.strokeStyle='rgba(103,232,249,'+(0.055-k*.006)+')';ctx.lineWidth=1;ctx.stroke();
    }
    raf=requestAnimationFrame(draw);
  }
  raf=requestAnimationFrame(draw);

  /* Section spotlight follows the pointer */
  if(fine){
    var sections=d.querySelectorAll('.section-pad,#pull-quote,#mission-vision,#careers');
    sections.forEach(function(sec){
      sec.addEventListener('pointermove',function(e){var r=sec.getBoundingClientRect();sec.style.setProperty('--section-x',((e.clientX-r.left)/r.width*100)+'%')},{passive:true});
    });

    /* Magnetic CTA, intentionally subtle */
    d.querySelectorAll('.btn').forEach(function(btn){
      btn.addEventListener('pointermove',function(e){var r=btn.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;btn.style.transform='translate('+x*.10+'px,'+y*.16+'px)'});
      btn.addEventListener('pointerleave',function(){btn.style.transform='' });
    });
  }

  /* Dynamic active nav based on visible sections */
  var links=[].slice.call(d.querySelectorAll('nav.primary-nav a[href^="#"]'));
  var targets=links.map(function(a){return d.querySelector(a.getAttribute('href'))}).filter(Boolean);
  if('IntersectionObserver' in window){
    var active=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-42% 0px -48% 0px',threshold:0});
    targets.forEach(function(t){active.observe(t)});
  }
})();
