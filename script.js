(function(){
try {

  var nb = document.getElementById('navbar');
  var tb = document.querySelector('.top-bar');
  var gl = document.querySelector('.gold-line');
  if (nb) {
    window.addEventListener('scroll', function(){
      var scrolled = window.scrollY > 60;
      nb.classList.toggle('scrolled', scrolled);
      if (tb) tb.style.display = scrolled ? 'none' : '';
      if (gl) gl.style.display = scrolled ? 'none' : '';
    }, {passive:true});
  }

  var hb = document.getElementById('hamburger');
  var nl = document.getElementById('navLinks');
  if (hb && nl) {
    hb.addEventListener('click', function(){
      nl.classList.toggle('open');
      hb.classList.toggle('active');
      document.body.style.overflow = nl.classList.contains('open') ? 'hidden' : '';
    });
    nl.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nl.classList.remove('open');
        hb.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Hero Slider
  var slider = document.getElementById('heroSlider');
  if (slider) {
    var slides = slider.querySelectorAll('.hero-slide');
    var dots = slider.querySelectorAll('.hero-dot');
    var prevBtn = document.getElementById('prevSlide');
    var nextBtn = document.getElementById('nextSlide');
    var current = 0;
    var total = slides.length;
    var autoInterval;

    function goToSlide(n) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (n + total) % total;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function nextSlide() { goToSlide(current + 1); }
    function prevSlide() { goToSlide(current - 1); }

    function startAuto() { autoInterval = setInterval(nextSlide, 5000); }
    function stopAuto() { clearInterval(autoInterval); }

    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        stopAuto();
        goToSlide(parseInt(this.getAttribute('data-slide')));
        startAuto();
      });
    });

    if (nextBtn) nextBtn.addEventListener('click', function() { stopAuto(); nextSlide(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', function() { stopAuto(); prevSlide(); startAuto(); });

    startAuto();
  }

  var rv = document.querySelectorAll('.reveal');
  if (rv.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(x){
        if (x.isIntersecting) {
          x.target.classList.add('in-view');
          io.unobserve(x.target);
        }
      });
    }, {threshold:.1, rootMargin:'0px 0px -40px 0px'});
    rv.forEach(function(el,i){
      el.style.setProperty('--reveal-delay', (i%5)*.08+'s');
      io.observe(el);
    });
  } else {
    rv.forEach(function(el){ el.classList.add('in-view'); });
  }

  var ct = document.querySelectorAll('[data-count]');
  function ac(el){
    var t = parseInt(el.getAttribute('data-count'),10);
    var s = el.getAttribute('data-suffix') || '';
    var d = 1800;
    var st = performance.now();
    function step(now){
      var p = Math.min((now-st)/d,1);
      var e = 1 - Math.pow(1-p,4);
      el.textContent = Math.floor(t*e) + s;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (ct.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(x){
        if (x.isIntersecting) { ac(x.target); cio.unobserve(x.target); }
      });
    }, {threshold:.5});
    ct.forEach(function(c){ cio.observe(c); });
  }

  var tt = document.getElementById('toTop');
  if (tt) {
    window.addEventListener('scroll', function(){
      tt.classList.toggle('visible', window.scrollY > 500);
    }, {passive:true});
    tt.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  var ye = document.getElementById('year');
  if (ye) ye.textContent = new Date().getFullYear();

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = this.getAttribute('href');
      if (id && id.length > 1) {
        var t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          var o = nb ? nb.offsetHeight + 16 : 80;
          window.scrollTo({top: t.getBoundingClientRect().top + window.pageYOffset - o, behavior:'smooth'});
        }
      }
    });
  });

  var gi = document.querySelectorAll('.gallery-item');
  var lb = document.getElementById('lightbox');
  var li = document.getElementById('lightboxImg');
  var lc = document.getElementById('lightboxCaption');
  var lx = document.getElementById('lightboxClose');
  var lp = document.getElementById('lightboxPrev');
  var ln = document.getElementById('lightboxNext');
  var ci = 0;
  var ld = [];
  if (lb) {
    gi.forEach(function(item, i){
      var img = item.querySelector('img');
      var title = item.getAttribute('data-title') || '';
      ld.push({src: img ? img.src : '', alt: img ? img.alt : '', title: title});
      item.addEventListener('click', function(){ ol(i); });
    });
  }
  function ol(i){
    if (!lb || !ld[i] || !ld[i].src) return;
    ci = i;
    li.src = ld[i].src;
    li.alt = ld[i].alt;
    lc.textContent = ld[i].title;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function cl(){
    if (lb) { lb.classList.remove('active'); document.body.style.overflow = ''; }
  }
  if (lx) lx.addEventListener('click', cl);
  if (lb) lb.addEventListener('click', function(e){ if (e.target === lb) cl(); });
  if (lp) lp.addEventListener('click', function(e){ e.stopPropagation(); ci = (ci-1+ld.length)%ld.length; ol(ci); });
  if (ln) ln.addEventListener('click', function(e){ e.stopPropagation(); ci = (ci+1)%ld.length; ol(ci); });
  document.addEventListener('keydown', function(e){
    if (!lb || !lb.classList.contains('active')) return;
    if (e.key === 'Escape') cl();
    if (e.key === 'ArrowLeft') { ci = (ci-1+ld.length)%ld.length; ol(ci); }
    if (e.key === 'ArrowRight') { ci = (ci+1)%ld.length; ol(ci); }
  });

  var mt = document.querySelectorAll('.media-tab');
  var mp = document.querySelectorAll('.media-panel');
  mt.forEach(function(t){
    t.addEventListener('click', function(){
      mt.forEach(function(x){ x.classList.remove('active'); });
      t.classList.add('active');
      var id = 'panel-' + t.getAttribute('data-tab');
      mp.forEach(function(p){ p.classList.remove('active'); });
      var target = document.getElementById(id);
      if (target) target.classList.add('active');
    });
  });

  if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var tiltCards = document.querySelectorAll('.service-card, .value-card, .team-card');
    tiltCards.forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-8px) scale(1.02)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transform = '';
      });
    });
  }

} catch(err) {
  console.error('Script error:', err);
}
})();
