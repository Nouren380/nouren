document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const header = document.getElementById('site-header');
  const progress = document.getElementById('scroll-progress');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  const setMenu = (open) => {
    if (!mobileToggle || !mobileMenu) return;
    mobileMenu.classList.toggle('open', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
    const icon = mobileToggle.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = open ? 'close' : 'menu';
  };
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
    document.querySelectorAll('.mobile-nav-link').forEach(link =>
      link.addEventListener('click', () => setMenu(false)));
    window.addEventListener('resize', () => { if (window.innerWidth >= (mobileToggle.classList.contains('xl:hidden') ? 1280 : 1024)) setMenu(false); });
  }

  /* ---------- Theme toggle (saved in localStorage) ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const setIcon = () => {
    const icon = themeToggle && themeToggle.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = root.classList.contains('dark') ? 'light_mode' : 'dark_mode';
  };
  setIcon();
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
      setIcon();
    });
  }

  /* ---------- Typewriter for the name ---------- */
  const typed = document.getElementById('typed');
  if (typed) {
    const text = 'Nouren Gamal';
    if (reduceMotion) {
      typed.textContent = text;
    } else {
      let i = 0, deleting = false;
      const tick = () => {
        typed.textContent = text.slice(0, i);
        let delay = deleting ? 70 : 130;
        if (!deleting && i === text.length) { deleting = true; delay = 1800; }
        else if (deleting && i === 0) { deleting = false; delay = 500; }
        i += deleting ? -1 : 1;
        setTimeout(tick, delay);
      };
      tick();
    }
  }

  /* ---------- Header: fixed, shadow on scroll + scroll-spy ---------- */
  let lastY = window.scrollY;
  let ticking = false;

  const sections = ['home', ...Array.from(document.querySelectorAll('main section[id]')).map(el => el.id)];
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const CLS = {
    deskActive: 'nav-link is-active',
    desk: 'nav-link',
    mobActive: 'mobile-nav-link font-label-md text-label-md text-primary font-semibold py-1',
    mob: 'mobile-nav-link font-label-md text-label-md text-on-surface-variant hover:text-primary py-1'
  };

  function updateScrollSpy(y) {
    const pos = y + 160;
    let current = 'home';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) { current = id; break; }
    }
    // Short last section: activate it when the page bottom is reached
    if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = 'contact';
    navLinks.forEach(l => (l.className = l.dataset.nav === current ? CLS.deskActive : CLS.desk));
    mobileNavLinks.forEach(l => (l.className = l.dataset.nav === current ? CLS.mobActive : CLS.mob));
  }

  function onScroll() {
    const y = Math.max(0, window.scrollY);
    const delta = y - lastY;

    if (header) {
      header.classList.toggle('is-scrolled', y > 10);
    }
    if (Math.abs(delta) > 6 || y < 80) lastY = y;

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    }
    updateScrollSpy(y);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Scroll reveal animation ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll(
      '.section-title, .story-card, .glass-panel');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('in');
        io.unobserve(el);
        // Clean up so normal hover transitions are not affected afterwards
        const wait = parseInt(el.style.getPropertyValue('--d') || '0', 10) + 900;
        setTimeout(() => { el.classList.remove('reveal', 'in'); el.style.removeProperty('--d'); }, wait);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => {
      // Stagger siblings inside the same grid / list
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.matches('.glass-panel')) : [];
      const idx = siblings.indexOf(el);
      el.style.setProperty('--d', `${idx > 0 ? Math.min(idx, 4) * 90 : 0}ms`);
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- Image links (js/config.js) + placeholder fallback ---------- */
  const normalizeUrl = (u) => {
    u = (u || '').trim();
    if (!u) return '';
    let m;
    if ((m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/)) || (m = u.match(/drive\.google\.com\/(?:open|uc)\?(?:[^#]*&)?id=([\w-]+)/)))
      return 'https://lh3.googleusercontent.com/d/' + m[1];
    if (/dropbox\.com/.test(u)) return u.replace(/[?&]dl=0/, '').replace(/www\.dropbox\.com/, 'dl.dropboxusercontent.com');
    if ((m = u.match(/^https?:\/\/github\.com\/(.+?)\/blob\/(.+)$/))) return 'https://raw.githubusercontent.com/' + m[1] + '/' + m[2];
    if ((m = u.match(/^https?:\/\/imgur\.com\/(\w+)$/))) return 'https://i.imgur.com/' + m[1] + '.jpg';
    return u;
  };
  const cfg = window.SITE_CONFIG || {};
  const holderOf = (img) => img.closest('.img-slot, .photo-ring');
  document.querySelectorAll('.img-slot img, .photo-ring img').forEach(img => {
    const holder = holderOf(img);
    const local = img.getAttribute('src');
    const linked = normalizeUrl(cfg[img.dataset.img]);
    img.addEventListener('load', () => holder && holder.classList.remove('img-missing'));
    img.addEventListener('error', () => {
      if (linked && img.getAttribute('src') === linked && local) { img.src = local; return; } // bad link -> try local file
      if (holder) holder.classList.add('img-missing');
    });
    if (linked) img.src = linked;
    else if (img.complete && img.naturalWidth === 0 && holder) holder.classList.add('img-missing');
  });

  /* ---------- Lightbox for project / certificate images ---------- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); };
  if (lb && lbImg) {
    document.querySelectorAll('[data-lightbox]').forEach(fig => {
      fig.addEventListener('click', () => {
        if (fig.classList.contains('img-missing')) return;
        const img = fig.querySelector('img');
        lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
        lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
      });
    });
    lb.addEventListener('click', (e) => { if (e.target !== lbImg) closeLb(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
  }

  /* ---------- "Request this service" -> pre-fill the contact subject ---------- */
  document.querySelectorAll('[data-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      const subj = document.getElementById('contact-subject');
      if (subj) subj.value = 'Service request: ' + btn.dataset.service;
    });
  });

  /* ---------- Contact form -> Node API (falls back to email app) ---------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      status.classList.remove('hidden');
      status.textContent = 'Sending...';
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('api');
        status.textContent = 'Thank you! Your message has been sent.';
        form.reset();
      } catch {
        // No backend running (e.g. opened with Live Server): open the visitor's email app instead
        const mailLink = document.querySelector('a[href^="mailto:"]');
        const to = mailLink ? mailLink.getAttribute('href').replace('mailto:', '') : '';
        const body = `${data.message}\n\n— ${data.name} (${data.email})`;
        status.textContent = 'Opening your email app to send the message...';
        window.location.href = `mailto:${to}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
      }
    });
  }
});
