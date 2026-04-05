/* ═══ OMNET SHOP ENGINE ═══
   Cart, Enquiry, Filter, Checkout
   Uses Web3Forms for email delivery (same key as contact form)
   ════════════════════════════════ */

(function () {
  'use strict';

  /* ── CART STATE ── */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('omnet_cart') || '[]'); } catch(e) { cart = []; }

  function saveCart() {
    try { localStorage.setItem('omnet_cart', JSON.stringify(cart)); } catch(e) {}
    updateCartUI();
  }

  /* ── ADD TO CART ── */
  window.addToCart = function (name, cat, icon) {
    if (cart.find(i => i.name === name)) {
      showToast('ℹ️ Already in your enquiry cart');
      return;
    }
    cart.push({ name, cat, icon });
    saveCart();
    showToast('✅ Added to enquiry cart!');
  };

  /* ── REMOVE FROM CART ── */
  window.removeFromCart = function (name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
  };

  /* ── UPDATE CART UI ── */
  function updateCartUI() {
    const badge   = document.getElementById('cartBadge');
    const body    = document.getElementById('cartBody');
    const foot    = document.getElementById('cartFoot');
    const count   = document.getElementById('cartCount');

    if (badge) badge.textContent = cart.length;

    if (!body) return;

    if (cart.length === 0) {
      body.innerHTML = '<div class="cart-empty"><i class="ri-shopping-cart-line"></i><p>Your cart is empty.<br>Add products to send a bulk enquiry.</p></div>';
      if (foot) foot.style.display = 'none';
      return;
    }

    if (foot) foot.style.display = 'block';
    if (count) count.textContent = cart.length + (cart.length === 1 ? ' item' : ' items');

    body.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="ci-icon"><i class="${item.icon || 'ri-box-3-line'}"></i></div>
        <div class="ci-info">
          <div class="ci-name">${item.name}</div>
          <div class="ci-desc">${item.cat}</div>
          <div class="ci-price">Contact for Best Price</div>
        </div>
        <button class="ci-remove" onclick="removeFromCart(${JSON.stringify(item.name)})" title="Remove"><i class="ri-delete-bin-line"></i></button>
      </div>
    `).join('');
  }

  /* ── TOGGLE CART DRAWER ── */
  window.toggleCart = function () {
    const overlay = document.getElementById('cartOverlay');
    const drawer  = document.getElementById('cartDrawer');
    if (!overlay || !drawer) return;
    const isOpen = drawer.classList.contains('open');
    overlay.classList.toggle('open', !isOpen);
    drawer.classList.toggle('open', !isOpen);
  };

  /* ── FILTER ── */
  function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        document.querySelectorAll('.prod-card').forEach(card => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.style.display = show ? 'flex' : 'none';
        });
      });
    });
  }

  /* ── ENQUIRY MODAL ── */
  window.openEnquiry = function (product) {
    const modal   = document.getElementById('enquiryModal');
    const display = document.getElementById('enqProductDisplay');
    const form    = document.getElementById('enquiryForm');
    const success = document.getElementById('enquirySuccess');
    if (!modal) return;
    if (form)    form.style.display    = '';
    if (success) success.style.display = 'none';
    if (display) display.value = product || 'General Enquiry';
    modal.classList.add('active');
  };

  window.closeModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  };

  window.submitEnquiry = async function () {
    const name    = (document.getElementById('enqName')?.value || '').trim();
    const phone   = (document.getElementById('enqPhone')?.value || '').trim();
    const email   = (document.getElementById('enqEmail')?.value || '').trim();
    const product = document.getElementById('enqProductDisplay')?.value || '';
    const qty     = document.getElementById('enqQty')?.value || '1';
    const company = document.getElementById('enqCompany')?.value || '';
    const msg     = document.getElementById('enqMsg')?.value || '';

    if (!name || !phone || !email) {
      alert('Please fill in your Name, Phone, and Email to proceed.');
      return;
    }

    const submitBtn = document.querySelector('#enquiryForm button[onclick="submitEnquiry()"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

    try {
      await sendToWeb3Forms({
        subject:   `Shop Enquiry: ${product} — ${name}`,
        name, phone, email, company,
        product, quantity: qty, message: msg || 'No additional message',
        form_type: 'shop_enquiry'
      });
    } catch (e) { /* silent — still show success */ }

    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Enquiry'; }

    const form    = document.getElementById('enquiryForm');
    const success = document.getElementById('enquirySuccess');
    if (form)    form.style.display    = 'none';
    if (success) success.style.display = '';
  };

  /* ── OPEN CHECKOUT ── */
  window.openCheckout = function () {
    if (cart.length === 0) { alert('Your cart is empty. Add products first.'); return; }
    window.toggleCart();

    const modal   = document.getElementById('checkoutModal');
    const step1   = document.getElementById('checkoutStep1');
    const success = document.getElementById('checkoutSuccess');
    if (!modal) return;
    if (step1)   step1.style.display   = '';
    if (success) success.style.display = 'none';

    const summary = document.getElementById('checkoutOrderSummary');
    if (summary) {
      summary.innerHTML = `
        <div class="order-summary-mini">
          <div class="osm-title">Selected Products</div>
          ${cart.map(i => `<div class="osm-item"><span>${i.name}</span><span>Contact for Price</span></div>`).join('')}
          <div class="osm-item total"><span>Total Items</span><span>${cart.length}</span></div>
        </div>`;
    }
    modal.classList.add('active');
  };

  /* ── SUBMIT BULK ENQUIRY ── */
  window.submitBulkEnquiry = async function () {
    const name    = (document.getElementById('coName')?.value || '').trim();
    const phone   = (document.getElementById('coPhone')?.value || '').trim();
    const email   = (document.getElementById('coEmail')?.value || '').trim();
    const company = document.getElementById('coCompany')?.value || '';
    const gst     = document.getElementById('coGST')?.value || '';
    const time    = document.getElementById('coTime')?.value || '';

    if (!name || !phone || !email) {
      alert('Please fill in your Name, Phone, and Email to proceed.');
      return;
    }

    const submitBtn = document.querySelector('#checkoutStep1 button[onclick="submitBulkEnquiry()"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

    const productList = cart.map(i => `• ${i.name}`).join('\n');
    const refNum      = '#ENQ-' + new Date().getFullYear() + '-' + String(Date.now()).slice(-5);

    try {
      await sendToWeb3Forms({
        subject:          `Bulk Enquiry — ${cart.length} items — ${name}`,
        name, phone, email, company,
        gstin:            gst,
        preferred_time:   time,
        products:         productList,
        reference:        refNum,
        form_type:        'bulk_shop_enquiry'
      });
    } catch (e) { /* silent */ }

    const refEl = document.getElementById('enquiryRef');
    if (refEl) refEl.textContent = refNum;

    const step1   = document.getElementById('checkoutStep1');
    const success = document.getElementById('checkoutSuccess');
    if (step1)   step1.style.display   = 'none';
    if (success) success.style.display = '';

    cart = [];
    saveCart();
  };

  /* ── TOAST ── */
  window.showToast = function (msg) {
    let toast = document.getElementById('shopToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'shopToast';
      Object.assign(toast.style, {
        position: 'fixed', bottom: '6rem', left: '50%',
        transform: 'translateX(-50%)',
        background: '#111827', color: '#fff',
        padding: '.65rem 1.5rem', borderRadius: '50px',
        fontSize: '.85rem', fontWeight: '700',
        zIndex: '99999', transition: 'opacity .4s',
        whiteSpace: 'nowrap', pointerEvents: 'none'
      });
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
  };

  /* ── MODAL OVERLAY CLOSE ── */
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  /* ── USER STATE (from register) ── */
  function syncUserState() {
    try {
      const user   = JSON.parse(localStorage.getItem('omnet_user') || 'null');
      const regBtn = document.getElementById('regHdrBtn');
      if (user && regBtn) {
        regBtn.innerHTML = `<i class="ri-user-line"></i> ${user.name.split(' ')[0]}`;
        regBtn.href      = 'register.html#dashboard';
        regBtn.title     = 'View your account';
      }
    } catch (e) { /* ignore */ }
  }

  /* ── REVEAL ANIMATIONS ── */
  function initReveal() {
    if (!window.IntersectionObserver) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.06 });

    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      obs.observe(el);
    });
  }

  /* ── CALLBACK STUB ── */
  window.cbOpen = function () { window.location.href = 'contact.html'; };

  /* ── INIT ── */
  updateCartUI();
  initFilters();
  initReveal();
  syncUserState();

})();
