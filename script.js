/* ── HEADER SCROLL ── */
(function () {
  const header = document.querySelector('.site-header');
  const backTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    if (backTop) {
      if (window.scrollY > 400) backTop.classList.add('visible');
      else backTop.classList.remove('visible');
    }
  });

  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Mobile menu toggle */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = menuBtn.querySelector('i');
      if (mobileNav.classList.contains('open')) {
        icon.className = 'ri-close-line';
      } else {
        icon.className = 'ri-menu-line';
      }
    });
  }

  /* Active nav link */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .dropdown-btn').forEach(link => {
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
    const btn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i> Sending...';

    try {
      const data = new FormData(form);
      const response = await fetch('https://readdy.ai/api/form/d6mj9aaqoe30lj0v8ck0', {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (response.ok) {
        if (successMsg) successMsg.style.display = 'flex';
        if (errorMsg) errorMsg.style.display = 'none';
        form.reset();
        if (counter) counter.textContent = '0/500';
      } else {
        throw new Error('Server error');
      }
    } catch {
      if (errorMsg) errorMsg.style.display = 'flex';
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
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });
})();

/* spin keyframe via JS */
const style = document.createElement('style');
style.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
document.head.appendChild(style);
