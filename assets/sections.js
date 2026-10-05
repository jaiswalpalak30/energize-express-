/* NEXT-LEVEL VISUAL LAYER — hero canvas scene, tilt cards, aurora, magnetic buttons */
(function(){
"use strict";
var d=document,rm=matchMedia("(prefers-reduced-motion:reduce)").matches,fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
var $=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};

function ready(f){d.readyState!=="loading"?f():d.addEventListener("DOMContentLoaded",f)}
ready(function(){

/* ---------- aurora in dark sections ---------- */
$("#mission-vision,#careers,#solutions,#process").forEach(function(s){
  var a=d.createElement("div");a.className="nl-aurora";a.innerHTML="<b></b><b></b><b></b>";s.insertBefore(a,s.firstChild);
});

/* ---------- floating 3D orbs + rings in light sections ---------- */
function deco(sel,items){var s=d.querySelector(sel);if(!s)return;s.style.overflow="hidden";
  items.forEach(function(o){var e=d.createElement("div");e.className=o.c;e.style.cssText=o.s;s.appendChild(e);if(o.p)e.dataset.par=o.p})}
deco("#about",[{c:"nl-orb",s:"width:90px;height:90px;right:6%;top:90px;animation-delay:-2s",p:"-30"},{c:"nl-ring",s:"width:420px;height:420px;left:-180px;top:34%"}]);
deco("#solutions",[{c:"nl-orb",s:"width:60px;height:60px;left:3%;top:180px;animation-delay:-4s",p:"40"},{c:"nl-ring",s:"width:520px;height:520px;right:-240px;top:20%"}]);
deco("#why-us",[{c:"nl-orb",s:"width:110px;height:110px;right:4%;bottom:90px;animation-delay:-1s",p:"-50"},{c:"nl-ring",s:"width:380px;height:380px;left:-160px;top:10%"}]);

/* ---------- HERO scene ---------- */
var home=d.getElementById("home");
function chartScene(home,withChips){
if(home){
  var cv=d.createElement("canvas");cv.className="nl-canvas";cv.setAttribute("aria-hidden","true");home.insertBefore(cv,home.firstChild);
  var vg=d.createElement("div");vg.className="nl-vignette";var gr=d.createElement("div");gr.className="nl-grain";home.appendChild(vg);home.appendChild(gr);
  var chips=d.createElement("div");chips.className="nl-chips";chips.setAttribute("aria-hidden","true");
  var ic={
    r:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    t:'<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
    s:'<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>'};
  chips.innerHTML='<div class="nl-chip"><i>'+ic.r+'</i><div>Research-Driven<small>Every decision</small></div></div>'+
    '<div class="nl-chip"><i>'+ic.t+'</i><div>Goal-Based Growth<small>Long-term view</small></div></div>'+
    '<div class="nl-chip"><i>'+ic.s+'</i><div>Protection<small>Insurance solutions</small></div></div>';
  home.appendChild(chips);
  var cue=d.createElement("div");cue.className="nl-scroll";cue.setAttribute("aria-hidden","true");home.appendChild(cue);
  if(!withChips){chips.remove();cue.remove();}

  var ctx=cv.getContext("2d"),W=0,H=0,dpr=1,mx=0,my=0,tx=0,ty=0,run=true,t0=performance.now();
  var P=[],N=0;
  function size(){var r=home.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    N=Math.round(Math.min(110,W*H/16000));P=[];for(var i=0;i<N;i++)P.push({x:Math.random()*W,y:Math.random()*H,z:Math.random()*.9+.1,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,g:Math.random()<.3})}
  size();addEventListener("resize",size);
  if(fine)home.addEventListener("mousemove",function(e){var r=home.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5},{passive:true});
  if("IntersectionObserver" in window)new IntersectionObserver(function(e){run=e[0].isIntersecting;if(run)loop()}).observe(home);

  /* chart path (decorative, not data) */
  function chartY(u){ /* u 0..1 → y 0..1 (0 top) */
    return 1-(.12+.78*Math.pow(u,1.35)+.07*Math.sin(u*14)+.04*Math.sin(u*31+1));}

  function draw(now){
    var t=(now-t0)/1000;mx+=(tx-mx)*.05;my+=(ty-my)*.05;
    ctx.clearRect(0,0,W,H);
    /* orbs */
    var orbs=[[.78,.38,.42,"76,141,255",.30],[.12,.85,.34,"240,201,122",.22],[.55,.2,.26,"63,208,201",.14]];
    orbs.forEach(function(o,i){var ox=o[0]*W+Math.sin(t*.3+i)*60-mx*60*(i+1),oy=o[1]*H+Math.cos(t*.25+i*2)*40-my*40*(i+1),r=o[2]*Math.max(W,H);
      var g=ctx.createRadialGradient(ox,oy,0,ox,oy,r);g.addColorStop(0,"rgba("+o[3]+","+o[4]+")");g.addColorStop(1,"rgba("+o[3]+",0)");ctx.fillStyle=g;ctx.fillRect(0,0,W,H)});

    /* perspective grid floor */
    var hz=H*.62,gh=H-hz,vx=W*.5+mx*140;
    ctx.save();ctx.beginPath();ctx.rect(0,hz,W,gh);ctx.clip();
    var fg=ctx.createLinearGradient(0,hz,0,H);fg.addColorStop(0,"rgba(240,201,122,0)");fg.addColorStop(1,"rgba(240,201,122,.16)");ctx.fillStyle=fg;ctx.fillRect(0,hz,W,gh);
    ctx.lineWidth=1;
    for(var i=-24;i<=24;i++){var a=.05+.22*(1-Math.abs(i)/24);ctx.strokeStyle="rgba(240,201,122,"+a+")";ctx.beginPath();ctx.moveTo(vx+i*14,hz);ctx.lineTo(vx+i*W*.11,H);ctx.stroke()}
    var off=(t*.35)%1;
    for(var k=0;k<14;k++){var u=(k+off)/14,y=hz+gh*Math.pow(u,2.2);ctx.strokeStyle="rgba(240,201,122,"+(.08+.3*u)+")";ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
    ctx.restore();
    var hg=ctx.createLinearGradient(0,hz-2,0,hz+30);hg.addColorStop(0,"rgba(240,201,122,.55)");hg.addColorStop(1,"rgba(240,201,122,0)");ctx.fillStyle=hg;ctx.fillRect(0,hz-1,W,30);

    /* rising chart — draws itself, loops */
    var cx0=W*.42,cx1=W*.98,cy0=H*.14,cy1=H*.7,cyc=(t%9)/9,prog=Math.min(1,cyc/.55),fade=cyc>.85?1-(cyc-.85)/.15:1,seg=90;
    var px=mx*-40,py=my*-24;
    ctx.save();ctx.globalAlpha=fade*(W<700?.4:1);
    /* bars */
    var nb=22;for(var b=0;b<nb;b++){var u=b/(nb-1);if(u>prog)break;var bx=cx0+(cx1-cx0)*u+px,top=cy0+(cy1-cy0)*chartY(u)+py+40,bh=Math.max(0,cy1+py+80-top);
      var bg=ctx.createLinearGradient(0,top,0,top+bh);bg.addColorStop(0,"rgba(63,208,201,.30)");bg.addColorStop(1,"rgba(63,208,201,0)");ctx.fillStyle=bg;ctx.fillRect(bx-6,top,12,bh)}
    /* glow line */
    var pts=[];for(var s=0;s<=seg;s++){var u2=s/seg*prog;pts.push([cx0+(cx1-cx0)*u2+px,cy0+(cy1-cy0)*chartY(u2)+py])}
    if(pts.length>1){
      var fillg=ctx.createLinearGradient(0,cy0,0,cy1+80);fillg.addColorStop(0,"rgba(240,201,122,.25)");fillg.addColorStop(1,"rgba(240,201,122,0)");
      ctx.beginPath();ctx.moveTo(pts[0][0],cy1+80+py);pts.forEach(function(p){ctx.lineTo(p[0],p[1])});ctx.lineTo(pts[pts.length-1][0],cy1+80+py);ctx.closePath();ctx.fillStyle=fillg;ctx.fill();
      ctx.lineJoin="round";ctx.lineCap="round";
      [[14,.10],[7,.22],[2.6,1]].forEach(function(l,i){ctx.beginPath();pts.forEach(function(p,j){j?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])});
        var lg=ctx.createLinearGradient(cx0,0,cx1,0);lg.addColorStop(0,"rgba(63,208,201,"+l[1]+")");lg.addColorStop(1,"rgba(255,223,158,"+l[1]+")");ctx.strokeStyle=lg;ctx.lineWidth=l[0];ctx.stroke()});
      var hd=pts[pts.length-1],pr=8+3*Math.sin(t*5);
      var hg2=ctx.createRadialGradient(hd[0],hd[1],0,hd[0],hd[1],pr*4);hg2.addColorStop(0,"rgba(255,230,170,.9)");hg2.addColorStop(1,"rgba(255,230,170,0)");ctx.fillStyle=hg2;ctx.beginPath();ctx.arc(hd[0],hd[1],pr*4,0,7);ctx.fill();
      ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(hd[0],hd[1],4,0,7);ctx.fill();
    }
    ctx.restore();

    /* particle network */
    for(var i2=0;i2<N;i2++){var p=P[i2];p.x+=p.vx*p.z;p.y+=p.vy*p.z;if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;if(p.y<-10)p.y=H+10;if(p.y>H+10)p.y=-10;
      var X=p.x-mx*80*p.z,Y=p.y-my*50*p.z;p._x=X;p._y=Y;
      ctx.fillStyle=p.g?"rgba(240,201,122,"+(.35+.5*p.z)+")":"rgba(190,215,255,"+(.25+.5*p.z)+")";ctx.beginPath();ctx.arc(X,Y,.6+1.6*p.z,0,7);ctx.fill()}
    ctx.lineWidth=.6;
    for(var a2=0;a2<N;a2++){for(var b2=a2+1;b2<N;b2++){var A=P[a2],B=P[b2],dx=A._x-B._x,dy=A._y-B._y,dd=dx*dx+dy*dy;if(dd<12000){ctx.strokeStyle="rgba(240,201,122,"+(.16*(1-dd/12000))+")";ctx.beginPath();ctx.moveTo(A._x,A._y);ctx.lineTo(B._x,B._y);ctx.stroke()}}}
  }
  function loop(){if(!run||rm)return;draw(performance.now());requestAnimationFrame(loop)}
  if(rm){draw(t0+4000)}else loop();

  /* chips parallax */
  if(fine&&!rm){var cs=$(".nl-chip",chips);(function pl(){cs.forEach(function(c,i){c.style.transform="translate("+(-mx*(30+i*18))+"px,"+(-my*(20+i*12))+"px)"});requestAnimationFrame(pl)})()}
}
}
/* old chart scene now lives at the END of the page (contact) */
chartScene(d.getElementById("contact"),false);

/* ---------- NEW HERO: interactive 3D energy core ---------- */
(function(){
  if(!home)return;
  var giant=d.createElement("div");giant.className="nl-giant";giant.setAttribute("aria-hidden","true");giant.textContent="ENERGIZE";home.insertBefore(giant,home.firstChild);
  var cv=d.createElement("canvas");cv.className="nl-canvas nl-core";cv.setAttribute("aria-hidden","true");home.insertBefore(cv,home.firstChild);
  var hud=d.createElement("div");hud.className="nl-hudwrap";hud.setAttribute("aria-hidden","true");
  var LABELS=[["01","Portfolio Management"],["02","Insurance & Protection"],["03","Research-Driven"]];
  hud.innerHTML=LABELS.map(function(l){return'<div class="nl-hud"><b>'+l[0]+'</b>'+l[1]+'</div>'}).join("");home.appendChild(hud);
  var hudEls=$(".nl-hud",hud);
  var vg=d.createElement("div");vg.className="nl-vignette";home.appendChild(vg);
  var ctx=cv.getContext("2d"),W=0,H=0,dpr=1,run=true,t0=performance.now();
  var pts=[],edges=[],N=0,mx=-999,my=-999,tmx=0,tmy=0,ry=0,rxv=.35,smx=0,smy=0,cx=0,cy=0,R=0,small=false;
  function build(){
    N=W<700?300:620;pts=[];
    for(var i=0;i<N;i++){var y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),th=i*2.399963;pts.push({x:Math.cos(th)*r,y:y,z:Math.sin(th)*r})}
    var set={};edges=[];
    for(var a=0;a<N;a++){var best=[];for(var b=0;b<N;b++){if(a===b)continue;var dx=pts[a].x-pts[b].x,dy=pts[a].y-pts[b].y,dz=pts[a].z-pts[b].z;best.push([dx*dx+dy*dy+dz*dz,b])}
      best.sort(function(p,q){return p[0]-q[0]});for(var k=0;k<3;k++){var bb=best[k][1],key=a<bb?a+"_"+bb:bb+"_"+a;if(!set[key]){set[key]=1;edges.push([a,bb])}}}
  }
  function size(){var r=home.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);small=W<900;
    cx=small?W*.5:W*.72;cy=small?H*.8:H*.5;R=small?Math.min(W*.32,H*.2):Math.min(H*.36,W*.2);build()}
  size();var rt;addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(size,150)});
  if(fine){home.addEventListener("mousemove",function(e){var r=home.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;tmx=mx/r.width-.5;tmy=my/r.height-.5},{passive:true});home.addEventListener("mouseleave",function(){mx=my=-999})}
  if("IntersectionObserver" in window)new IntersectionObserver(function(e){run=e[0].isIntersecting;if(run)loop()}).observe(home);
  var anchors=[Math.floor(N*.2),Math.floor(N*.5),Math.floor(N*.8)];
  function mixc(t){/* teal -> gold */return[Math.round(63+(240-63)*t),Math.round(208+(201-208)*t),Math.round(201+(122-201)*t)]}
  function draw(now){
    var t=(now-t0)/1000;ctx.clearRect(0,0,W,H);
    smx+=(tmx-smx)*.05;smy+=(tmy-smy)*.05;
    ry+=.004+smx*.01;rxv=.32+smy*.5;
    var cyw=Math.cos(ry),syw=Math.sin(ry),cxw=Math.cos(rxv),sxw=Math.sin(rxv),cam=3.2;
    /* core glow */
    var pu=1+.06*Math.sin(t*2),gl=ctx.createRadialGradient(cx,cy,0,cx,cy,R*1.9*pu);gl.addColorStop(0,"rgba(255,226,160,.38)");gl.addColorStop(.35,"rgba(240,201,122,.14)");gl.addColorStop(.7,"rgba(63,208,201,.07)");gl.addColorStop(1,"rgba(63,208,201,0)");ctx.fillStyle=gl;ctx.fillRect(0,0,W,H);
    function proj(x,y,z,disp){
      var x1=x*cyw+z*syw,z1=-x*syw+z*cyw,y2=y*cxw-z1*sxw,z2=y*sxw+z1*cxw,s=cam/(cam+z2*.8);
      return[cx+x1*R*s*disp,cy+y2*R*s*disp,z2,s]}
    var proj_=new Array(N);
    for(var i=0;i<N;i++){var p=pts[i],wave=Math.exp(-Math.pow((p.y-Math.sin(t*.7))*3.2,2));
      var disp=1+.07*Math.sin(3*p.x+t*1.2)*Math.cos(3*p.y-t)+.05*Math.sin(5*p.z+t*.8)+.13*wave;
      var q=proj(p.x,p.y,p.z,disp);
      var dx=q[0]-mx,dy=q[1]-my,dd=Math.sqrt(dx*dx+dy*dy);if(dd<150&&dd>0.1){var f=Math.pow(1-dd/150,2)*46;q[0]+=dx/dd*f;q[1]+=dy/dd*f}
      q.push(wave);proj_[i]=q}
    /* back rings */
    function ring(k,front){
      var rad=1.45+.16*k,tilt=.5+k*.55,sp=t*(.25+k*.12)*(k%2?-1:1),n=90,prev=null;
      ctx.lineWidth=1.2;
      for(var s=0;s<=n;s++){var a=s/n*6.2832,x=Math.cos(a)*rad,z=Math.sin(a)*rad,y=0;
        var ya=y*Math.cos(tilt)-z*Math.sin(tilt),za=y*Math.sin(tilt)+z*Math.cos(tilt);
        var x2=x*Math.cos(sp)+za*Math.sin(sp),z3=-x*Math.sin(sp)+za*Math.cos(sp);
        var q=proj(x2,ya,z3,1);
        if(prev&&((q[2]>0)!==front)){ctx.strokeStyle="rgba("+(k%2?"63,208,201":"240,201,122")+","+(front?.55:.18)+")";ctx.beginPath();ctx.moveTo(prev[0],prev[1]);ctx.lineTo(q[0],q[1]);ctx.stroke()}
        prev=q}
      /* satellite */
      var sa=t*(1.1+k*.4),sx=Math.cos(sa)*rad,sz=Math.sin(sa)*rad,ya2=-sz*Math.sin(tilt),za2=sz*Math.cos(tilt),x3=sx*Math.cos(sp)+za2*Math.sin(sp),z4=-sx*Math.sin(sp)+za2*Math.cos(sp),sq=proj(x3,ya2,z4,1);
      if((sq[2]>0)!==front){ctx.fillStyle=k%2?"#8ff3ec":"#ffe7b0";ctx.shadowColor=k%2?"#3fd0c9":"#f0c97a";ctx.shadowBlur=16;ctx.beginPath();ctx.arc(sq[0],sq[1],front?4.5:3,0,7);ctx.fill();ctx.shadowBlur=0}
    }
    ring(0,false);ring(1,false);ring(2,false);
    /* edges */
    ctx.lineWidth=.7;
    for(var e=0;e<edges.length;e++){var A=proj_[edges[e][0]],B=proj_[edges[e][1]],dep=(A[2]+B[2])/2,al=Math.max(.04,.5-dep*.38),m=((pts[edges[e][0]].y+1)/2),c=mixc(m);
      var hot=(A[4]+B[4])/2;al+=hot*.45;ctx.strokeStyle="rgba("+c[0]+","+c[1]+","+c[2]+","+Math.min(.95,al)+")";ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.stroke()}
    /* points */
    for(var i2=0;i2<N;i2++){var Q=proj_[i2],dp=Q[2],m2=(pts[i2].y+1)/2,c2=mixc(m2),al2=Math.max(.15,.95-dp*.5);
      ctx.fillStyle="rgba("+c2[0]+","+c2[1]+","+c2[2]+","+Math.min(1,al2+Q[4]*.4)+")";ctx.beginPath();ctx.arc(Q[0],Q[1],(1+1.6*(1-dp)*.6)+Q[4]*1.8,0,7);ctx.fill()}
    ring(0,true);ring(1,true);ring(2,true);
    /* HUD labels tied to vertices */
    hudEls.forEach(function(el,k){var Q=proj_[anchors[k]],vis=Q[2]<.35&&!small;
      el.style.opacity=vis?1:0;
      if(vis){var ox=k===1?90:(k===0?-70:70),oy=k===1?60:-70;el.style.transform="translate("+(Q[0]+ox)+"px,"+(Q[1]+oy)+"px) translate(-50%,-50%)";
        ctx.strokeStyle="rgba(240,201,122,.65)";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(Q[0],Q[1]);ctx.lineTo(Q[0]+ox,Q[1]+oy);ctx.stroke();
        ctx.fillStyle="#fff";ctx.shadowColor="#f0c97a";ctx.shadowBlur=14;ctx.beginPath();ctx.arc(Q[0],Q[1],4,0,7);ctx.fill();ctx.shadowBlur=0}});
  }
  function loop(){if(!run||rm)return;draw(performance.now());requestAnimationFrame(loop)}
  if(rm)draw(t0+3000);else loop();
  /* giant word parallax */
  if(fine&&!rm){(function gp(){giant.style.transform="translate("+(smx*-60)+"px,"+(smy*-30)+"px)";requestAnimationFrame(gp)})()}
})();

/* ---------- 3D tilt + spotlight cards ---------- */
if(fine&&!rm){
  $(".solution-card,.why-card,.perk-card,.mv-card,.blog-card").forEach(function(c){
    c.classList.add("nl-tilt");
    c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      c.style.setProperty("--mx",x*100+"%");c.style.setProperty("--my",y*100+"%");
      c.style.transform="perspective(1000px) rotateX("+((.5-y)*9)+"deg) rotateY("+((x-.5)*11)+"deg) translateY(-6px) scale(1.015)"});
    c.addEventListener("mouseleave",function(){c.style.transform=""});
  });
  /* magnetic buttons */
  $(".btn").forEach(function(b){
    b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+((e.clientX-r.left-r.width/2)*.25)+"px,"+((e.clientY-r.top-r.height/2)*.35)+"px)"});
    b.addEventListener("mouseleave",function(){b.style.transform=""});
  });
}


/* ---------- INSURANCE: 3D orbit ring driven by scroll ---------- */
(function(){
  var grid=d.querySelector("#solutions .card-grid.three");if(!grid)return;
  var cards=$(".solution-card",grid),n=cards.length;if(!n)return;
  var tags=["Protection","Wellness","Legacy"];
  grid.classList.add("nl-ring3d");
  var floor=d.createElement("div");floor.className="nl-floor";floor.innerHTML="<i></i><i></i><i></i>";
  var stage=d.createElement("div");stage.className="nl-stage";
  cards.forEach(function(c,i){stage.appendChild(c);var t=d.createElement("span");t.className="nl-tag";t.textContent=tags[i%tags.length];c.appendChild(t)});
  var ui=d.createElement("div");ui.className="nl-ring-ui";ui.innerHTML='<button aria-label="Previous">&#8592;</button><span>Scroll or tap to rotate</span><button aria-label="Next">&#8594;</button>';
  grid.appendChild(floor);grid.appendChild(stage);grid.appendChild(ui);
  var step=360/n,off=0,offT=0,cur=0,mob=function(){return innerWidth<=900};
  function R(){return mob()?(innerWidth<420?330:380):(n>2?520:420)}
  var b=ui.querySelectorAll("button");
  b[0].onclick=function(){offT+=step};b[1].onclick=function(){offT-=step};
  cards.forEach(function(c,i){c.addEventListener("click",function(e){
    var a=(((i*step+cur)%360)+540)%360-180; if(Math.abs(a)>5){offT-=a;e.preventDefault()}})});
  var my=0,tmy=0;
  if(fine)grid.addEventListener("mousemove",function(e){var r=grid.getBoundingClientRect();tmy=((e.clientY-r.top)/r.height-.5)});
  function frame(){
    var r=grid.getBoundingClientRect(),c=(r.top+r.height/2-innerHeight/2)/innerHeight;
    var target=(rm?0:-c*420)+offT;
    off+=(target-off)*.08;my+=(tmy-my)*.06;cur=off;
    var rad=R();
    stage.style.transform="translateZ("+(-rad)+"px) rotateX("+(-6+my*-10)+"deg) rotateY("+off+"deg)";
    cards.forEach(function(card,i){
      var ang=i*step;
      card.style.transform="rotateY("+ang+"deg) translateZ("+rad+"px)";
      var a=(((ang+off)%360)+360)%360,f=Math.cos(a*Math.PI/180);
      var vis=Math.max(0,(f+.35)/1.35);
      card.style.opacity=(.18+.82*vis).toFixed(3);
      card.style.filter=f<.5?"blur("+((.5-f)*3).toFixed(1)+"px) saturate("+(.5+vis*.5).toFixed(2)+")":"none";
      card.style.pointerEvents=f>.55?"auto":"none";
      card.style.zIndex=Math.round(f*100)+100;
    });
    requestAnimationFrame(frame);
  }
  frame();
})();


/* ---------- WHY-US: 3D cube ---------- */
(function(){
  var s=d.getElementById("why-us");if(!s)return;
  var w=d.createElement("div");w.className="nl-cube-wrap";w.setAttribute("aria-hidden","true");
  w.innerHTML='<div class="nl-cube-shadow"></div><div class="nl-cube-orbit"><i></i></div><div class="nl-cube-orbit o2"><i></i></div><div class="nl-cube"><b>Trust</b><b>Clarity</b><b>Research</b><b>Care</b><b>Focus</b><b>Growth</b></div>';
  s.appendChild(w);
})();

/* ---------- ABOUT: animated 3D bar-landscape (decorative) ---------- */
(function(){
  var fig=d.querySelector(".about-fig");if(!fig)return;
  var cv=d.createElement("canvas");cv.className="nl-g3d";cv.setAttribute("role","img");cv.setAttribute("aria-label","Animated 3D illustration of rising growth bars");
  fig.appendChild(cv);
  var note=d.createElement("span");note.className="nl-note";note.textContent="Illustrative visual";fig.appendChild(note);
  var ctx=cv.getContext("2d"),W=0,H=0,dpr=1,run=false,t0=performance.now(),started=0;
  var COLS=15,ROWS=4,ox=0,oy=0,dragYaw=0,tYaw=0;
  function size(){var r=fig.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  size();addEventListener("resize",size);
  if(fine){fig.addEventListener("mousemove",function(e){var r=fig.getBoundingClientRect();tYaw=((e.clientX-r.left)/r.width-.5)*.9;});fig.addEventListener("mouseleave",function(){tYaw=0})}
  if("IntersectionObserver" in window)new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!run){run=true;if(!started)started=performance.now();loop()}else if(!v)run=false}).observe(fig);else{run=true;started=performance.now();loop()}
  function ease(x){x=Math.max(0,Math.min(1,x));return 1-Math.pow(1-x,3)}
  function mix(a,b,t){return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t]}
  var C1=[63,208,201],C2=[240,201,122],C3=[255,157,108];
  function col(t,sh,al){var c=t<.5?mix(C1,C2,t*2):mix(C2,C3,(t-.5)*2);return"rgba("+Math.round(c[0]*sh)+","+Math.round(c[1]*sh)+","+Math.round(c[2]*sh)+","+(al==null?1:al)+")"}
  function draw(now){
    var t=(now-t0)/1000,g=(now-started)/1000;
    ctx.clearRect(0,0,W,H);
    dragYaw+=(tYaw-dragYaw)*.05;
    var yaw=.55*Math.sin(t*.28)+dragYaw+(-.35),pitch=.62+.05*Math.sin(t*.4);
    var cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
    var sc=Math.min(W/23,H/8.2),D=22;
    function P(x,y,z){var x1=x*cy-z*sy,z1=x*sy+z*cy,y2=y*cp+z1*sp,z2=-y*sp+z1*cp,s=D/(D+z2);return[W/2+x1*s*sc,H*.74-y2*s*sc,z2]}
    /* glow */
    var gg=ctx.createRadialGradient(W*.5,H*.7,0,W*.5,H*.7,W*.5);gg.addColorStop(0,"rgba(240,201,122,.22)");gg.addColorStop(1,"rgba(240,201,122,0)");ctx.fillStyle=gg;ctx.fillRect(0,0,W,H);
    /* floor grid */
    ctx.lineWidth=1;
    for(var i=-9;i<=9;i++){var a=P(i,0,-4.5),b=P(i,0,4.5);ctx.strokeStyle="rgba(240,201,122,"+(.07+.1*(1-Math.abs(i)/9))+")";ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()}
    for(var k=-5;k<=5;k++){var a2=P(-9,0,k*.9),b2=P(9,0,k*.9);ctx.strokeStyle="rgba(240,201,122,.09)";ctx.beginPath();ctx.moveTo(a2[0],a2[1]);ctx.lineTo(b2[0],b2[1]);ctx.stroke()}
    /* bars → faces */
    var faces=[],tops=[];
    for(var r=0;r<ROWS;r++){for(var c=0;c<COLS;c++){
      var u=c/(COLS-1),base=.5+4.4*Math.pow(u,1.45),row=(r/(ROWS-1)),wave=Math.sin(c*.9+r*1.3+t*1.1)*.28+Math.sin(t*.7+c*.4)*.12;
      var hh=Math.max(.15,(base*(0.55+.45*(1-Math.abs(row-.5)*1.3))+wave)*ease(g*.55-c*.045-r*.06));
      var x0=(c-(COLS-1)/2)*1.12-.45,x1=x0+.9,z0=(r-(ROWS-1)/2)*1.3-.45,z1=z0+.9;
      var V=[[x0,0,z0],[x1,0,z0],[x1,0,z1],[x0,0,z1],[x0,hh,z0],[x1,hh,z0],[x1,hh,z1],[x0,hh,z1]].map(function(v){return P(v[0],v[1],v[2])});
      var def=[[4,5,6,7,1.0],[0,1,5,4,.62],[1,2,6,5,.8],[2,3,7,6,.55],[3,0,4,7,.72]];
      def.forEach(function(f){var dz=(V[f[0]][2]+V[f[1]][2]+V[f[2]][2]+V[f[3]][2])/4;faces.push({v:[V[f[0]],V[f[1]],V[f[2]],V[f[3]]],z:dz+(f[4]===1?-.001:0),sh:f[4],u:Math.min(1,hh/5.2),top:f[4]===1})});
      if(r===1)tops.push([(x0+x1)/2,hh+.5,(z0+z1)/2]);
    }}
    faces.sort(function(a,b){return b.z-a.z});
    faces.forEach(function(f){
      ctx.beginPath();ctx.moveTo(f.v[0][0],f.v[0][1]);for(var q=1;q<4;q++)ctx.lineTo(f.v[q][0],f.v[q][1]);ctx.closePath();
      ctx.fillStyle=col(f.u,f.sh,f.top?1:.96);ctx.fill();ctx.strokeStyle="rgba(255,255,255,"+(f.top?.5:.14)+")";ctx.lineWidth=f.top?1:.7;ctx.stroke();
    });
    /* floating glow line */
    var pts=tops.map(function(p){return P(p[0],p[1]+Math.sin(t*1.5+p[0])*.12,p[2])}),prog=Math.min(1,g*.35);
    var n=Math.max(2,Math.floor(pts.length*prog));
    ctx.lineJoin="round";ctx.lineCap="round";
    [[12,.12],[6,.28],[2.4,1]].forEach(function(l){ctx.beginPath();for(var i2=0;i2<n;i2++){i2?ctx.lineTo(pts[i2][0],pts[i2][1]):ctx.moveTo(pts[i2][0],pts[i2][1])}ctx.strokeStyle="rgba(255,236,190,"+l[1]+")";ctx.lineWidth=l[0];ctx.stroke()});
    var hd=pts[n-1],pr=7+2.5*Math.sin(t*5),hg=ctx.createRadialGradient(hd[0],hd[1],0,hd[0],hd[1],pr*4);hg.addColorStop(0,"rgba(255,240,200,.95)");hg.addColorStop(1,"rgba(255,240,200,0)");ctx.fillStyle=hg;ctx.beginPath();ctx.arc(hd[0],hd[1],pr*4,0,7);ctx.fill();ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(hd[0],hd[1],3.5,0,7);ctx.fill();
    /* floating particles */
    for(var s=0;s<26;s++){var px=((s*97.3+t*12*(1+s%3*.4))%1000)/1000*W,py=H*(.1+((s*53.7)%100)/130)-((t*10*(1+s%4*.3)+s*40)%H)*.0+Math.sin(t+s)*6;ctx.fillStyle="rgba(240,201,122,"+(.15+.35*((s%5)/5))+")";ctx.beginPath();ctx.arc(px,py,1+(s%3)*.7,0,7);ctx.fill()}
  }
  function loop(){if(!run)return;draw(performance.now());if(!rm)requestAnimationFrame(loop)}
  if(rm){started=t0-9e3;draw(performance.now())}
})();

/* ---------- scroll parallax for decor ---------- */
var par=$("[data-par]");
if(par.length&&!rm){var tk=0;addEventListener("scroll",function(){if(tk)return;tk=1;requestAnimationFrame(function(){tk=0;par.forEach(function(e){var r=e.parentNode.getBoundingClientRect();e.style.translate="0 "+(r.top*parseFloat(e.dataset.par)/100)+"px"})})},{passive:true})}

/* ---------- about image slow parallax ---------- */
var af=d.querySelector(".about-fig img");
if(af&&!rm){addEventListener("scroll",function(){var r=af.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;af.style.objectPosition="50% "+(50+(r.top/innerHeight-.3)*30)+"%"},{passive:true})}

});
})();
