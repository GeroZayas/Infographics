// Toggle sidebar visibility
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const toggleBtn = document.querySelector('.sidebar-toggle');
  
  sidebar.classList.toggle('hidden');
  mainContent.classList.toggle('full-width');
  toggleBtn.classList.toggle('sidebar-open');
}

// Set active navigation item
function setActive(element) {
  // Remove active class from all nav items and subitems
  document.querySelectorAll('.nav-item, .nav-subitem').forEach(item => {
    item.classList.remove('active');
  });
  // Add active class to clicked element
  if (element) {
    element.classList.add('active');
  }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Set first nav-item as active on page load
  const firstNavItem = document.querySelector('.nav-item');
  if (firstNavItem) {
    firstNavItem.classList.add('active');
  }

  // Initialize smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize toggle button state based on sidebar visibility
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.querySelector('.sidebar-toggle');
  if (sidebar && toggleBtn && !sidebar.classList.contains('hidden')) {
    toggleBtn.classList.add('sidebar-open');
  }
});
