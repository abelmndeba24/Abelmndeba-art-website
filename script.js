// Small interactive behaviors: year, lightbox, smooth scroll, reveal
document.addEventListener('DOMContentLoaded', () => {
  // fill year
  const y = new Date().getFullYear();
  document.getElementById('year') && (document.getElementById('year').textContent = y);

  // smooth nav scroll
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        el && el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lb-image');
  const lbCaption = document.querySelector('.lb-caption');
  const lbClose = document.querySelector('.lb-close');
  const lbWA = document.querySelector('.lb-whatsapp');

  function openLightbox(src, title){
    lbImg.src = src; lbImg.alt = title || '';
    lbCaption.textContent = title || '';
    lbWA.href = `https://wa.me/255755270990?text=${encodeURIComponent('Hello Abel, I am interested in "'+(title||'this work')+'" from your website')}`;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
  }

  function closeLightbox(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
  }

  document.querySelectorAll('.piece-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const src = link.dataset.src || link.querySelector('img')?.src;
      const title = link.dataset.title || link.querySelector('img')?.alt || '';
      if (src) openLightbox(src, title);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // reveal on scroll
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting) ent.target.classList.add('show');
    });
  },{threshold:0.12});
  document.querySelectorAll('.sr').forEach(el=>obs.observe(el));
});
