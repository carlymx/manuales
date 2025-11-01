// JavaScript for Linux Documentation
document.addEventListener('DOMContentLoaded', function() {
  // Add active class to current page in sidebar
  const currentPage = window.location.pathname.split('/').pop();
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  
  sidebarLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage || 
        (currentPage === '' && link.getAttribute('href').includes('index'))) {
      link.classList.add('active');
    }
  });
  
  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Add theme toggle button to header
  const header = document.querySelector('header');
  const themeToggle = document.createElement('button');
  themeToggle.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  themeToggle.classList.add('theme-toggle');
  themeToggle.title = 'Toggle theme';
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    // Update button text
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
  
  // Add language toggle button to header
  const langToggle = document.createElement('button');
  const currentPath = window.location.pathname;
  let langToggleText, targetPage;
  
  if (currentPath.includes('_en.html') || (currentPath === '/' && navigator.language.startsWith('en'))) {
    langToggleText = 'ES';
    // Switch to Spanish version (remove _en if present, or add index if needed)
    targetPage = currentPath.replace('_en.html', '.html').replace('index_en.html', 'index.html');
    if (targetPage === currentPath && !targetPage.includes('index')) {
      targetPage = currentPath.replace('.html', '_es.html');
    }
    if (targetPage === currentPath) {
      targetPage = 'index.html';
    }
  } else {
    langToggleText = 'EN';
    // Switch to English version
    if (currentPath.endsWith('index.html')) {
      targetPage = currentPath.replace('index.html', 'index_en.html');
    } else if (currentPath.endsWith('.html')) {
      targetPage = currentPath.replace('.html', '_en.html');
    } else {
      targetPage = 'index_en.html';
    }
  }
  
  langToggle.textContent = langToggleText;
  langToggle.classList.add('lang-toggle');
  langToggle.title = 'Switch language';
  langToggle.addEventListener('click', function() {
    window.location.href = targetPage;
  });
  
  // Add buttons to header
  header.appendChild(langToggle);
  header.appendChild(themeToggle);
  
  // Mobile menu toggle
  const menuToggle = document.createElement('button');
  menuToggle.textContent = '☰ Menu';
  menuToggle.classList.add('menu-toggle');
  menuToggle.addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('mobile-open');
  });
  
  // Add menu toggle to header on mobile
  header.appendChild(menuToggle);
  
  // Make sure mobile styles are applied
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .sidebar {
        display: none;
      }
      .sidebar.mobile-open {
        display: block;
      }
      .menu-toggle {
        display: block;
        background: none;
        border: 1px solid white;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    @media (min-width: 769px) {
      .menu-toggle {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);
});

// Function to highlight code blocks
function highlightCode() {
  // Simple implementation - could be extended with a library like Prism.js
  document.querySelectorAll('pre code').forEach(block => {
    // Add line numbers if not already present
    if (!block.querySelector('.line-number')) {
      const lines = block.innerHTML.split('\n');
      if (lines[lines.length - 1] === '') {
        lines.pop(); // Remove empty last line
      }
      const numberedLines = lines.map((line, i) => 
        `<span class="line-number">${i + 1}</span> ${line || ' '}`).join('\n');
      block.innerHTML = numberedLines;
    }
  });
}

// Call on page load
window.addEventListener('load', highlightCode);