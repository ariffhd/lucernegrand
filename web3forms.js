document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form.web3form').forEach(function (formEl) {
    var statusEl = formEl.querySelector('.form-status');
    var submitBtn = formEl.querySelector('button[type="submit"]');
    var originalText = submitBtn ? submitBtn.textContent : '';

    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(formEl)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            if (statusEl) {
              statusEl.textContent = 'Thank you — we will be in touch shortly.';
              statusEl.classList.add('form-status-ok');
            }
            formEl.reset();
          } else {
            if (statusEl) {
              statusEl.textContent = 'Something went wrong. Please WhatsApp or call us instead.';
              statusEl.classList.add('form-status-err');
            }
          }
        })
        .catch(function () {
          if (statusEl) {
            statusEl.textContent = 'Something went wrong. Please WhatsApp or call us instead.';
            statusEl.classList.add('form-status-err');
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  });
});
