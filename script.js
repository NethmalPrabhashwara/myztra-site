// script.js

// Loader
window.addEventListener('load', () => {
  document.querySelector('.loader-wrapper').style.display = 'none';
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

const hoverables = document.querySelectorAll('a, button, .hover-effect');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.background = 'rgba(0, 255, 255, 0.2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    cursor.style.background = 'rgba(255, 255, 255, 0.6)';
  });
});

document.querySelectorAll('.magnet').forEach(link => {
  link.addEventListener('mousemove', e => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translate(0, 0)';
  });
});

// Stars and UFOs
const starsContainer = document.querySelector('.stars');
const ufosContainer = document.querySelector('.ufos');

for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  starsContainer.appendChild(star);
}

for (let i = 0; i < 3; i++) {
  const ufo = document.createElement('div');
  ufo.classList.add('ufo');
  ufo.style.top = `${Math.random() * 80 + 10}%`;
  ufo.style.left = `-${Math.random() * 100 + 20}px`;
  ufo.style.animationDuration = `${10 + Math.random() * 10}s`;
  ufosContainer.appendChild(ufo);
}

// Sound Toggle
const audio = new Audio('click.mp3');
let soundEnabled = true;

document.querySelector('.sound-toggle').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  audio.play();
  alert(`Sound ${soundEnabled ? 'enabled' : 'disabled'}`);
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('click', () => {
    if (soundEnabled) audio.play();
  });
});

// Theme Toggle (Optional dark/light mode)
document.querySelector('.theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});
