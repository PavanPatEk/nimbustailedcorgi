// Weather System Logic
function updateWeather() {
  const now = new Date();
  const hours = now.getHours();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const fxLayer = document.getElementById('fx-layer');
  const timeDisplay = document.getElementById('time-display');
  
  if (!fxLayer || !timeDisplay) return;

  fxLayer.innerHTML = '';
  fxLayer.className = '';
  document.body.className = '';

  let currentMode = "";

  if (hours >= 8 && hours < 16) {
    document.body.classList.add('day');
    currentMode = "Sunny Day ☀️";
    fxLayer.innerHTML = `
      <div class="cloud cloud1"></div>
      <div class="cloud cloud2"></div>
    `;
  } else if (hours >= 16 && hours < 18) {
    document.body.classList.add('rainy');
    currentMode = "Rainy Evening 🌧️";
    for (let i = 0; i < 40; i++) {
      const drop = document.createElement('div');
      drop.className = 'drop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      fxLayer.appendChild(drop);
    }
  } else if (hours >= 18 && hours < 20) {
    document.body.classList.add('storm');
    fxLayer.classList.add('flash');
    currentMode = "Thunderstorm ⛈️";
    for (let i = 0; i < 70; i++) {
      const drop = document.createElement('div');
      drop.className = 'drop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.animationDuration = (Math.random() * 0.3 + 0.4) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      fxLayer.appendChild(drop);
    }
  } else {
    document.body.classList.add('night');
    currentMode = "Night Time 🌙";
    const moon = document.createElement('div');
    moon.className = 'moon';
    fxLayer.appendChild(moon);

    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = Math.random() * 3 + 1 + 'px';
      star.style.height = star.style.width;
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.animationDelay = Math.random() * 2 + 's';
      fxLayer.appendChild(star);
    }
  }

  timeDisplay.innerText = `Current Time: ${timeString} (${currentMode})`;
}

// Lightbox / Zoom & Keyboard Navigation Logic
let currentIndex = 0;
let images = [];

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-nav.prev');
  const nextBtn = document.querySelector('.lightbox-nav.next');
  
  const cards = document.querySelectorAll('.gallery-card img');
  images = Array.from(cards).map(img => img.src);

  cards.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Close when clicking overlay background
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation listener
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeLightbox();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateWeather();
  setInterval(updateWeather, 60000);
  initLightbox();
});