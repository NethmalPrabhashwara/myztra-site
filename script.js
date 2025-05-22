// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
});

// Theme toggle logic
const themeToggleBtn = document.querySelector('.theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-theme');
});

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Filter adventures posts
const searchInput = document.getElementById('search-adventures');
const categoryFilter = document.getElementById('category-filter');
const posts = document.querySelectorAll('.post-card');

function filterPosts() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  posts.forEach(post => {
    const title = post.querySelector('h3').textContent.toLowerCase();
    const categoryMatch = category === 'all' || post.dataset.category === category;
    const searchMatch = title.includes(searchTerm);

    if (categoryMatch && searchMatch) {
      post.style.display = '';
    } else {
      post.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', filterPosts);
categoryFilter.addEventListener('change', filterPosts);

// Bonus: Simple stars background animation (optional, can be improved)
const stars = document.querySelector('.stars');
const starCount = 100;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = Math.random() * 100 + 'vh';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.width = star.style.height = Math.random() * 2 + 1 + 'px';
  star.style.backgroundColor = 'white';
  star.style.position = 'absolute';
  star.style.borderRadius = '50%';
  star.style.opacity = Math.random();
  star.style.animation = `twinkle ${Math.random() * 5 + 5}s infinite`;
  stars.appendChild(star);
}
