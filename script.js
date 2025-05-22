// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle logic
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;

  // Load saved theme or default to dark
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });

  // Magnet effect on nav links
  const magnets = document.querySelectorAll('.magnet');
  magnets.forEach(link => {
    link.addEventListener('mousemove', e => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translate(0,0)';
    });
  });

  // Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  window.addEventListener('mousemove', e => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  });

  // AOS Initialization
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic',
  });

  // Star background animation
  const starsContainer = document.querySelector('.stars');

  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.position = 'absolute';
    star.style.background = 'white';
    star.style.borderRadius = '50%';
    star.style.opacity = Math.random() * 0.8 + 0.2;
    star.style.width = star.style.height = `${Math.random() * 2 + 1}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
    starsContainer.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 5000);
  }

  // Create initial stars
  for(let i = 0; i < 100; i++) {
    createStar();
  }
  // Continuously add stars
  setInterval(createStar, 200);

  // UFO animation
  const ufosContainer = document.querySelector('.ufos');

  function createUFO() {
    const ufo = document.createElement('div');
    ufo.classList.add('ufo');
    ufo.style.position = 'absolute';
    ufo.style.width = '60px';
    ufo.style.height = '30px';
    ufo.style.background = 'linear-gradient(135deg, #a1f7ff, #00bcd4)';
    ufo.style.borderRadius = '50% 50% 30% 30% / 60% 60% 40% 40%';
    ufo.style.boxShadow = '0 0 15px #00e5ff';
    ufo.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
    ufo.style.left = '-80px';
    ufo.style.opacity = 0.8;
    ufosContainer.appendChild(ufo);

    // Animate from left to right
    let pos = -80;
    const speed = 1 + Math.random() * 2;
    function move() {
      pos += speed;
      ufo.style.left = pos + 'px';
      if (pos > window.innerWidth + 80) {
        ufo.remove();
        return;
      }
      requestAnimationFrame(move);
    }
    move();
  }

  // Create UFOs every 8 seconds randomly
  setInterval(() => {
    if (Math.random() < 0.5) {
      createUFO();
    }
  }, 8000);

  // Filter posts by search and category if filters exist
  const searchInput = document.getElementById('search-conspiracies') || document.getElementById('search-posts');
  const categoryFilter = document.getElementById('category-filter');

  if (searchInput && categoryFilter) {
    const postsContainer = document.getElementById('conspiracy-posts') || document.getElementById('featured-posts');

    function filterPosts() {
      const searchTerm = searchInput.value.toLowerCase();
      const category = categoryFilter.value;

      const posts = postsContainer.querySelectorAll('.post-card');
      posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const desc = post.querySelector('p').textContent.toLowerCase();
        const postCategory = post.getAttribute('data-category');

        const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);
        const matchesCategory = category === 'all' || postCategory === category;

        if (matchesSearch && matchesCategory) {
          post.style.display = 'flex';
        } else {
          post.style.display = 'none';
        }
      });
    }

    searchInput.addEventListener('input', filterPosts);
    categoryFilter.addEventListener('change', filterPosts);
  }
});
