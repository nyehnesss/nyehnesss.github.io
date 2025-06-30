const video = document.getElementById('mainVideo');
const buttonsContainer = document.getElementById('buttons-container');
const imageButtons = document.querySelectorAll('.img-button');
const overlay = document.getElementById('start-overlay');

const interactionPoints = [21, 42, 62, 80, 105, 148]; // Timestamps
let currentInteractionIndex = 0;
let interactionShown = false;

//Overlay Logic
overlay.addEventListener('click', () => {
  overlay.classList.add('fade-out');
  video.muted = false;
  video.play().catch(err => {
    console.warn("Video failed to play:", err);
  });

  setTimeout(() => {
    overlay.remove();
  }, 1000); // match fade duration
});

// Show buttons at interaction points
video.addEventListener('timeupdate', () => {
  if (currentInteractionIndex >= interactionPoints.length) return;

  const interactionTime = interactionPoints[currentInteractionIndex];

  if (video.currentTime >= interactionTime && !interactionShown) {
    interactionShown = true;
    video.pause();
    buttonsContainer.classList.add('visible');
  }
});

// 🧠 Resume video on button click
imageButtons.forEach(button => {
  button.addEventListener('click', () => {
    buttonsContainer.classList.remove('visible');
    video.play();
    interactionShown = false;
    currentInteractionIndex++;
  });
});
