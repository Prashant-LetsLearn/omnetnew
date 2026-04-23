/* ═══════════════════════════════════════════════════════
   OMNET IT SOLUTIONS — UPI PAYMENT SYSTEM
   UPI ID: 8920603270@ybl
   Merchant: Omnet IT Solutions
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const UPI_ID   = '8920603270@ybl';
  const UPI_NAME = 'Omnet IT Solutions';
  const UPI_NOTE = 'Omnet IT Payment';

  /* ── Build UPI deep link ── */
  function buildUpiLink(amount) {
    let url = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME)}&cu=INR`;
    if (amount && parseFloat(amount) > 0) {
      url += `&am=${encodeURIComponent(parseFloat(amount).toFixed(2))}`;
    }
    url += `&tn=${encodeURIComponent(UPI_NOTE)}`;
    return url;
  }

  /* ── Build QR image URL (Google Charts API) ── */
  function buildQrUrl(amount) {
    const upiLink = buildUpiLink(amount);
    return `https://chart.googleapis.com/chart?cht=qr&chs=260x260&chld=M|2&chl=${encodeURIComponent(upiLink)}`;
  }

  /* ── Copy to clipboard ── */
  function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="ri-check-line"></i> Copied!';
      btn.style.background = '#059669';
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 2000);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    });
  }

  /* ── Inject modal HTML ── */
  function injectModal() {
    if (document.getElementById('upiModal')) return;

    const modal = document.createElement('div');
    modal.id = 'upiModal';
    modal.className = 'upi-modal-overlay';
    modal.innerHTML = `
      <div class="upi-modal-box">
        <div class="upi-modal-header">
          <div class="upi-modal-title">
            <div class="upi-logo-ring"><i class="ri-secure-payment-line"></i></div>
            <div>
              <h3>Pay via UPI</h3>
              <p>Scan with any UPI app</p>
            </div>
          </div>
          <button class="upi-close-btn" id="upiCloseBtn"><i class="ri-close-line"></i></button>
        </div>

        <div class="upi-modal-body">

          <!-- App icons row -->
          <div class="upi-app-row">
            <div class="upi-app-pill"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/120px-Google_Pay_Logo_%282020%29.svg.png" alt="GPay" /><span>GPay</span></div>
            <div class="upi-app-pill"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.svg/120px-PhonePe_Logo.svg.png" alt="PhonePe" /><span>PhonePe</span></div>
            <div class="upi-app-pill"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/120px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" /><span>Paytm</span></div>
            <div class="upi-app-pill"><i class="ri-bank-line" style="font-size:1.4rem;color:#0369a1;"></i><span>BHIM</span></div>
          </div>

          <!-- Amount input -->
          <div class="upi-amount-wrap">
            <label class="upi-label">Enter Amount (₹) <span class="upi-optional">optional — you can also set in your UPI app</span></label>
            <div class="upi-amount-row">
              <span class="upi-rupee">₹</span>
              <input type="number" id="upiAmountInput" class="upi-amount-input" placeholder="0.00" min="1" step="1" />
              <button class="upi-refresh-btn" id="upiRefreshQr" title="Refresh QR"><i class="ri-refresh-line"></i></button>
            </div>
          </div>

          <!-- QR code -->
          <div class="upi-qr-wrap">
            <div class="upi-qr-frame">
              <img id="upiQrImg" src="${buildQrUrl('')}" alt="UPI QR Code" />
              <div class="upi-qr-corner upi-qr-tl"></div>
              <div class="upi-qr-corner upi-qr-tr"></div>
              <div class="upi-qr-corner upi-qr-bl"></div>
              <div class="upi-qr-corner upi-qr-br"></div>
            </div>
            <p class="upi-qr-hint"><i class="ri-qr-scan-2-line"></i> Point your camera at the QR code</p>
          </div>

          <!-- UPI ID copy row -->
          <div class="upi-id-row">
            <div class="upi-id-box">
              <span class="upi-id-label">UPI ID</span>
              <span class="upi-id-value" id="upiIdText">${UPI_ID}</span>
            </div>
            <button class="upi-copy-btn" id="upiCopyBtn" onclick="(function(btn){navigator.clipboard&&navigator.clipboard.writeText('${UPI_ID}').then(function(){var o=btn.innerHTML;btn.innerHTML='<i class=\\'ri-check-line\\'></i> Copied!';btn.style.background='#059669';setTimeout(function(){btn.innerHTML=o;btn.style.background='';},2000);})})(this)">
              <i class="ri-file-copy-line"></i> Copy
            </button>
          </div>

          <!-- Steps -->
          <div class="upi-steps">
            <div class="upi-step"><span class="upi-step-num">1</span><span>Open GPay, PhonePe, Paytm or any UPI app</span></div>
            <div class="upi-step"><span class="upi-step-num">2</span><span>Tap <strong>Scan QR</strong> or <strong>Pay by UPI ID</strong></span></div>
            <div class="upi-step"><span class="upi-step-num">3</span><span>Enter amount, complete payment &amp; share screenshot</span></div>
          </div>

          <!-- Mobile direct pay button -->
          <a id="upiDirectPayBtn" href="${buildUpiLink('')}" class="upi-direct-btn">
            <i class="ri-smartphone-line"></i> Open UPI App to Pay
          </a>

          <!-- Post-payment confirm -->
          <div class="upi-confirm-wrap">
            <p class="upi-confirm-label">After paying, share transaction ID for confirmation:</p>
            <div class="upi-txn-row">
              <input type="text" id="upiTxnId" class="upi-txn-input" placeholder="Transaction ID / UTR number" />
              <button class="upi-confirm-btn" onclick="window.upiConfirmPayment()">
                <i class="ri-send-plane-line"></i> Confirm
              </button>
            </div>
            <div id="upiConfirmSuccess" class="upi-confirm-success" style="display:none;">
              <i class="ri-checkbox-circle-fill"></i> Thank you! We'll verify and confirm within 1 business hour.
            </div>
          </div>

        </div><!-- /upi-modal-body -->
      </div><!-- /upi-modal-box -->
    `;

    document.body.appendChild(modal);

    /* Close handlers */
    document.getElementById('upiCloseBtn').addEventListener('click', window.closeUpiModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) window.closeUpiModal(); });

    /* QR refresh on amount change */
    const amtInput = document.getElementById('upiAmountInput');
    const qrImg    = document.getElementById('upiQrImg');
    const directBtn = document.getElementById('upiDirectPayBtn');

    function updateQr() {
      const amt = amtInput.value;
      qrImg.src = buildQrUrl(amt);
      directBtn.href = buildUpiLink(amt);
    }

    document.getElementById('upiRefreshQr').addEventListener('click', updateQr);
    amtInput.addEventListener('change', updateQr);
    amtInput.addEventListener('keyup', function(e){ if(e.key==='Enter') updateQr(); });
  }

  /* ── Open / Close ── */
  window.openUpiModal = function (amount) {
    injectModal();
    const modal = document.getElementById('upiModal');
    const amtInput = document.getElementById('upiAmountInput');
    const qrImg = document.getElementById('upiQrImg');
    const directBtn = document.getElementById('upiDirectPayBtn');
    const successDiv = document.getElementById('upiConfirmSuccess');
    const txnInput = document.getElementById('upiTxnId');

    if (amount && parseFloat(amount) > 0) {
      amtInput.value = amount;
      qrImg.src = buildQrUrl(amount);
      directBtn.href = buildUpiLink(amount);
    } else {
      amtInput.value = '';
      qrImg.src = buildQrUrl('');
      directBtn.href = buildUpiLink('');
    }
    if (successDiv) successDiv.style.display = 'none';
    if (txnInput) txnInput.value = '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeUpiModal = function () {
    const modal = document.getElementById('upiModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  /* ── Confirm payment (send via Web3Forms) ── */
  window.upiConfirmPayment = async function () {
    const txnId  = (document.getElementById('upiTxnId')?.value || '').trim();
    const amount = document.getElementById('upiAmountInput')?.value || 'Not specified';
    const btn    = document.querySelector('.upi-confirm-btn');

    if (!txnId) {
      alert('Please enter your Transaction ID / UTR number');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i> Sending...';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '2af0c0f5-01fa-4349-b83c-fff623cb969b',
          subject: 'UPI Payment Confirmation — Omnet IT',
          'Payment Method': 'UPI',
          'UPI ID': UPI_ID,
          'Amount': '₹' + amount,
          'Transaction ID / UTR': txnId,
          'Page': window.location.pathname,
          'Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
      });
      const json = await res.json();
      if (json.success) {
        document.getElementById('upiConfirmSuccess').style.display = 'flex';
        document.getElementById('upiTxnId').value = '';
      }
    } catch (e) {
      alert('Could not send confirmation. Please WhatsApp the transaction ID to +91-89206-03270');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="ri-send-plane-line"></i> Confirm';
    }
  };

  /* ── Pay via UPI FAB removed per user preference ── */
  /* UPI modal still available via window.openUpiModal() */

})();
