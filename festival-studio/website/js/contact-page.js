/* Festival Studio — contact.html controller (mailto, no backend) */
(function (global) {
  'use strict';
  var FS = global.FS;
  FS.ready(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var err = document.getElementById('c-error');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('c-name').value.trim();
      var email = document.getElementById('c-email').value.trim();
      var subject = document.getElementById('c-subject').value;
      var message = document.getElementById('c-message').value.trim();
      if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        err.hidden = false;
        err.textContent = err.getAttribute('data-msg') || 'Please add your name, a valid email address and a message.';
        return;
      }
      err.hidden = true;
      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
      var to = (window.FS_CONFIG && window.FS_CONFIG.contactEmail) || 'hello@festivalstudio.example';
      var href = 'mailto:' + to + '?subject=' +
        encodeURIComponent('[Festival Studio] ' + subject) + '&body=' + encodeURIComponent(body);
      try {
        global.location.href = href;
        FS.toast('Opening your email app…', 'ok');
      } catch (e2) {
        FS.toast('Could not open an email app. Please email ' + to + ' directly.', 'err', 5000);
      }
    });
  });
})(window);
