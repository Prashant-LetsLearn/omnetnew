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

  /* ── DROPDOWNS (click-based, not hover-only) ── */
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(drop => {
    const btn  = drop.querySelector('.dropdown-btn');
    const menu = drop.querySelector('.dropdown-menu');
    if (!btn || !menu) return;

    // Wrap menu contents in inner div if not already done
    if (!menu.querySelector('.dropdown-menu-inner')) {
      const inner = document.createElement('div');
      inner.className = 'dropdown-menu-inner';
      while (menu.firstChild) inner.appendChild(menu.firstChild);
      menu.appendChild(inner);
    }

    // Toggle on button click
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      // Close all other dropdowns first
      document.querySelectorAll('.dropdown-menu.open').forEach(m => {
        m.classList.remove('open');
        m.closest('.nav-dropdown')?.querySelector('.dropdown-btn')?.classList.remove('active');
      });
      if (!isOpen) {
        menu.classList.add('open');
        btn.classList.add('active');
      }
    });

    // Keep open when mouse is anywhere inside the dropdown (button + menu)
    drop.addEventListener('mouseleave', () => {
      // Small delay so fast mouse movements don't instantly close
      drop._closeTimer = setTimeout(() => {
        menu.classList.remove('open');
        btn.classList.remove('active');
      }, 150);
    });

    drop.addEventListener('mouseenter', () => {
      clearTimeout(drop._closeTimer);
      // Also open on hover for desktop convenience
      menu.classList.add('open');
      btn.classList.add('active');
    });
  });

  // Close all dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => {
      m.classList.remove('open');
      m.closest('.nav-dropdown')?.querySelector('.dropdown-btn')?.classList.remove('active');
    });
  });

  /* ── MOBILE MENU TOGGLE ── */
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
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── CONTACT FORM ── */
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
      const data     = new FormData(form);
      const response = await fetch('https://readdy.ai/api/form/d6mj9aaqoe30lj0v8ck0', {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      if (response.ok) {
        if (successMsg) successMsg.style.display = 'flex';
        if (errorMsg)   errorMsg.style.display   = 'none';
        form.reset();
        if (counter) counter.textContent = '0/500';
      } else {
        throw new Error('Server error');
      }
    } catch {
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
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
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
