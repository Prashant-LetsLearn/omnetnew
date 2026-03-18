/* ── HEADER SCROLL ── */
(function () {
  const header  = document.querySelector('.site-header');
  const backTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
  });

  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── DROPDOWNS ── */
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(drop => {
    const btn  = drop.querySelector('.dropdown-btn');
    const menu = drop.querySelector('.dropdown-menu');
    if (!btn || !menu) return;
    if (!menu.querySelector('.dropdown-menu-inner')) {
      const inner = document.createElement('div');
      inner.className = 'dropdown-menu-inner';
      while (menu.firstChild) inner.appendChild(menu.firstChild);
      menu.appendChild(inner);
    }
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      document.querySelectorAll('.dropdown-menu.open').forEach(m => {
        m.classList.remove('open');
        m.closest('.nav-dropdown')?.querySelector('.dropdown-btn')?.classList.remove('active');
      });
      if (!isOpen) { menu.classList.add('open'); btn.classList.add('active'); }
    });
    drop.addEventListener('mouseleave', () => {
      drop._closeTimer = setTimeout(() => {
        menu.classList.remove('open'); btn.classList.remove('active');
      }, 150);
    });
    drop.addEventListener('mouseenter', () => {
      clearTimeout(drop._closeTimer);
      menu.classList.add('open'); btn.classList.add('active');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => {
      m.classList.remove('open');
      m.closest('.nav-dropdown')?.querySelector('.dropdown-btn')?.classList.remove('active');
    });
  });

  /* ── MOBILE MENU ── */
  const menuBtn   = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = mobileNav.classList.contains('open') ? 'ri-close-line' : 'ri-menu-line';
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) link.classList.add('active');
  });
})();

/* ── SEND TO WEB3FORMS ── */
async function sendToWeb3Forms(fields) {
  var ACCESS_KEY = '2af0c0f5-01fa-4349-b83c-fff623cb969b';
  var payload = Object.assign({ access_key: ACCESS_KEY }, fields);
  var res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  var json = await res.json();
  if (!json.success) throw new Error('Web3Forms error: ' + JSON.stringify(json));
  return json;
}

/* ── CONTACT FORM (contact.html) ── */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const counter = document.getElementById('msg-counter');
  const msgArea = form.querySelector('textarea[name="message"]');
  if (msgArea && counter) {
    msgArea.addEventListener('input', () => {
      counter.textContent = msgArea.value.length + '/500';
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn        = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('form-success');
    const errorMsg   = document.getElementById('form-error');

    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i> Sending...';

    try {
      const data = new FormData(form);
      await sendToWeb3Forms({
        'Source'  : 'Contact Page - Send Us a Message',
        'Name'    : data.get('name') || 'N/A',
        'Email'   : data.get('email') || 'N/A',
        'Phone'   : data.get('phone') || 'N/A',
        'Company' : data.get('company') || 'N/A',
        'Service' : data.get('service') || 'N/A',
        'Message' : data.get('message') || 'N/A'
      });
      if (successMsg) successMsg.style.display = 'flex';
      if (errorMsg)   errorMsg.style.display   = 'none';
      form.reset();
      if (counter) counter.textContent = '0/500';
    } catch(err) {
      console.error(err);
      if (errorMsg)   errorMsg.style.display   = 'flex';
      if (successMsg) successMsg.style.display = 'none';
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="ri-send-plane-line"></i> Send Message';
    }
  });
})();

/* ── SCROLL REVEAL ── */
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });
})();

/* ── SPIN KEYFRAME ── */
const _s = document.createElement('style');
_s.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
document.head.appendChild(_s);
