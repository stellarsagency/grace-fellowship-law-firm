(function(){
try {

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
    rv.forEach(function(el){ io.observe(el); });
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
      tt.classList.toggle('visible', window.scrollY > 400);
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
          window.scrollTo({top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior:'smooth'});
        }
      }
    });
  });

  var da = document.querySelectorAll('.donate-amt');
  da.forEach(function(d){
    d.addEventListener('click', function(){
      da.forEach(function(x){ x.classList.remove('active'); });
      d.classList.add('active');
    });
  });

} catch(err) {
  console.error('Script error:', err);
}
})();
