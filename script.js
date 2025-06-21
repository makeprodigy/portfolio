let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      let activeLink = document.querySelector('header nav a[href*="' + id + '"]');
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

// Contact Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
  const contactBtn = document.getElementById('contactBtn');
  const contactDropdown = document.getElementById('contactDropdown');
  const copyBtn = document.getElementById('copyBtn');
  
  // Toggle dropdown
  contactBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    contactDropdown.classList.toggle('show');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!contactBtn.contains(e.target) && !contactDropdown.contains(e.target)) {
      contactDropdown.classList.remove('show');
    }
  });
  
  // Prevent dropdown from closing when clicking inside it
  contactDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  // Copy email functionality
  copyBtn.addEventListener('click', function() {
    const email = 'payneparihar13@gmail.com';
    
    // Modern approach for copying to clipboard
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(function() {
        showCopySuccess();
      }).catch(function(err) {
        console.error('Failed to copy: ', err);
        fallbackCopyTextToClipboard(email);
      });
    } else {
      // Fallback for older browsers
      fallbackCopyTextToClipboard(email);
    }
  });
  
  // Fallback copy method for older browsers
  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showCopySuccess();
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
  }
  
  // Show copy success message
  function showCopySuccess() {
    // Remove existing success message if any
    const existingSuccess = document.querySelector('.copy-success');
    if (existingSuccess) {
      existingSuccess.remove();
    }
    
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.className = 'copy-success';
    successMsg.textContent = 'Email copied!';
    
    // Position relative to copy button
    copyBtn.style.position = 'relative';
    copyBtn.appendChild(successMsg);
    
    // Show with animation
    setTimeout(() => {
      successMsg.classList.add('show');
    }, 10);
    
    // Hide after 2 seconds
    setTimeout(() => {
      successMsg.classList.remove('show');
      setTimeout(() => {
        if (successMsg.parentNode) {
          successMsg.parentNode.removeChild(successMsg);
        }
      }, 300);
    }, 2000);
    
    // Add visual feedback to copy button
    copyBtn.style.transform = 'scale(1.2)';
    copyBtn.style.background = '#4caf50';
    copyBtn.style.borderColor = '#4caf50';
    
    setTimeout(() => {
      copyBtn.style.transform = '';
      copyBtn.style.background = '';
      copyBtn.style.borderColor = '';
    }, 200);
  }
  
  // Close dropdown on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      contactDropdown.classList.remove('show');
    }
  });
});
