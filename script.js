(function(){
'use strict';
function hideLoader(){var l=document.querySelector('.page-loader');if(l){l.classList.add('loaded');setTimeout(function(){l.style.display='none'},600)}}
if(document.readyState==='complete')setTimeout(hideLoader,300);else{window.addEventListener('load',function(){setTimeout(hideLoader,300)});setTimeout(hideLoader,3000)}
var nb=document.getElementById('navbar');
if(nb)window.addEventListener('scroll',function(){nb.classList.toggle('scrolled',window.scrollY>60)},{passive:true});
var hb=document.getElementById('hamburger'),nl=document.getElementById('navLinks');
if(hb&&nl){hb.addEventListener('click',function(){nl.classList.toggle('open');hb.classList.toggle('active');document.body.style.overflow=nl.classList.contains('open')?'hidden':''});
nl.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nl.classList.remove('open');hb.classList.remove('active');document.body.style.overflow=''})})}
var rv=document.querySelectorAll('.reveal');
if(rv.length&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in-view');io.unobserve(x.target)}})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
rv.forEach(function(el,i){el.style.setProperty('--reveal-delay',(i%5)*.08+'s');io.observe(el)})}else rv.forEach(function(el){el.classList.add('in-view')});
var ct=document.querySelectorAll('[data-count]');
function ac(el){var t=parseInt(el.getAttribute('data-count'),10),s=el.getAttribute('data-suffix')||'',d=1800,st=performance.now();
function step(now){var p=Math.min((now-st)/d,1),e=1-Math.pow(1-p,4);el.textContent=Math.floor(t*e)+s;if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
if(ct.length&&'IntersectionObserver' in window){var cio=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){ac(x.target);cio.unobserve(x.target)}})},{threshold:.5});ct.forEach(function(c){cio.observe(c)})}
var tt=document.getElementById('toTop');
if(tt){window.addEventListener('scroll',function(){tt.classList.toggle('visible',window.scrollY>500)},{passive:true});tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})})}
var ye=document.getElementById('year');if(ye)ye.textContent=new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=this.getAttribute('href');if(id&&id.length>1){var t=document.querySelector(id);if(t){e.preventDefault();var o=nb?nb.offsetHeight+16:80;window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-o,behavior:'smooth'})}}})});
var fb=document.querySelectorAll('.filter-btn'),gi=document.querySelectorAll('.gallery-item');
fb.forEach(function(b){b.addEventListener('click',function(){fb.forEach(function(x){x.classList.remove('active')});b.classList.add('active');var f=b.getAttribute('data-filter');gi.forEach(function(item){if(f==='all'||item.getAttribute('data-category')===f){item.style.display='';item.style.animation='fadeUp .5s ease forwards'}else item.style.display='none'})})});
var lb=document.getElementById('lightbox'),li=document.getElementById('lightboxImg'),lc=document.getElementById('lightboxCaption'),lx=document.getElementById('lightboxClose'),lp=document.getElementById('lightboxPrev'),ln=document.getElementById('lightboxNext'),ci=0,ld=[];
gi.forEach(function(item,i){var img=item.querySelector('img'),title=item.getAttribute('data-title')||'';ld.push({src=img?img.src:'',alt=img?img.alt:'',title:title});item.addEventListener('click',function(){ol(i)})});
function ol(i){if(!lb||!ld[i]||!ld[i].src)return;ci=i;li.src=ld[i].src;li.alt=ld[i].alt;lc.textContent=ld[i].title;lb.classList.add('active');document.body.style.overflow='hidden'}
function cl(){if(lb){lb.classList.remove('active');document.body.style.overflow=''}}
if(lx)lx.addEventListener('click',cl);
if(lb)lb.addEventListener('click',function(e){if(e.target===lb)cl()});
if(lp)lp.addEventListener('click',function(e){e.stopPropagation();ci=(ci-1+ld.length)%ld.length;ol(ci)});
if(ln)ln.addEventListener('click',function(e){e.stopPropagation();ci=(ci+1)%ld.length;ol(ci)});
document.addEventListener('keydown',function(e){if(!lb||!lb.classList.contains('active'))return;if(e.key==='Escape')cl();if(e.key==='ArrowLeft'){ci=(ci-1+ld.length)%ld.length;ol(ci)}if(e.key==='ArrowRight'){ci=(ci+1)%ld.length;ol(ci)}});
var mt=document.querySelectorAll('.media-tab'),mp=document.querySelectorAll('.media-panel');
mt.forEach(function(t){t.addEventListener('click',function(){mt.forEach(function(x){x.classList.remove('active')});t.classList.add('active');var id='panel-'+t.getAttribute('data-tab');mp.forEach(function(p){p.classList.remove('active')});var target=document.getElementById(id);if(target)target.classList.add('active')})});
document.querySelectorAll('.service-card,.value-card,.impact-card-light').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,cx=r.width/2,cy=r.height/2;c.style.transform='perspective(1000px) rotateX('+(y-cy)/cy*-3+'deg) rotateY('+(x-cx)/cx*3+'deg) translateY(-10px)'});c.addEventListener('mouseleave',function(){c.style.transform=''})});
window.handleSubmit=function(e){e.preventDefault();var f=e.target,n=document.getElementById('formNote'),d=new FormData(f),nm=d.get('name');if(n){n.textContent='Thank you, '+nm+'. Your request has been received.';n.style.color='#1a7a3a';n.style.fontWeight='600'}f.reset();setTimeout(function(){if(n){n.textContent='Your information will be treated with strict confidentiality.';n.style.color='';n.style.fontWeight=''}},5000)};
})();
