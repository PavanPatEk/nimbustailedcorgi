function updateWeather() {
  const now = new Date();
  const hours = now.getHours();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const fxLayer = document.getElementById('fx-layer');
  const timeDisplay = document.getElementById('time-display');
  
  if (!fxLayer || !timeDisplay) return;

  // Clear previous weather effects
  fxLayer.innerHTML = '';
  fxLayer.className = '';
  document.body.className = '';

  let currentMode = "";

  // 8:00 AM (8) to 3:59 PM (15) -> Sunny Day
  if (hours >= 8 && hours < 16) {
    document.body.classList.add('day');
    currentMode = "Sunny Day ☀️";
    
    fxLayer.innerHTML = `
      <div class="cloud cloud1"></div>
      <div class="cloud cloud2"></div>
    `;
  } 
  // 4:00 PM (16) to 5:59 PM (17) -> Rainy Evening
  else if (hours >= 16 && hours < 18) {
    document.body.classList.add('rainy');
    currentMode = "Rainy Evening 🌧️";
    
    for (let i = 0; i < 45; i++) {
      const drop = document.createElement('div');
      drop.className = 'drop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      fxLayer.appendChild(drop);
    }
  } 
  // 6:00 PM (18) to 7:59 PM (19) -> Thunderstorm
  else if (hours >= 18 && hours < 20) {
    document.body.classList.add('storm');
    fxLayer.classList.add('flash');
    currentMode = "Thunderstorm ⛈️";
    
    for (let i = 0; i < 75; i++) {
      const drop = document.createElement('div');
      drop.className = 'drop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.animationDuration = (Math.random() * 0.3 + 0.4) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      fxLayer.appendChild(drop);
    }
  } 
  // 8:00 PM (20) to 7:59 AM (7) -> Night Time
  else {
    document.body.classList.add('night');
    currentMode = "Night Time 🌙";
    
    const moon = document.createElement('div');
    moon.className = 'moon';
    fxLayer.appendChild(moon);

    for (let i = 0; i < 55; i++) {
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

  timeDisplay.innerText = `Local Time: ${timeString} • ${currentMode}`;
}

// Execute on initial page load and refresh every 30 seconds
document.addEventListener('DOMContentLoaded', () => {
  updateWeather();
  setInterval(updateWeather, 30000);
});