const video = document.getElementById('mainVideo');
const buttonsContainer = document.getElementById('buttons-container');
const imageButtons = document.querySelectorAll('.img-button');
const overlay = document.getElementById('start-overlay');

const interactionPoints = [21, 42, 58, 79, 102, 146]; // ⏱ Customize timestamps
let currentInteractionIndex = 0;
let interactionShown = false;

overlay.addEventListener('click', () => {
  overlay.classList.add('fade-out');
  video.muted = false;
  video.play().catch(err => {
    console.warn("Video failed to play:", err);
});

// Remove overlay from DOM after fade
setTimeout(() => {
  overlay.remove();
}, 1000); // Match CSS transition duration
});


  // 🕓 Check interaction points
  video.addEventListener('timeupdate', () => {
    if (currentInteractionIndex >= interactionPoints.length) return;

    const interactionTime = interactionPoints[currentInteractionIndex];

    if (video.currentTime >= interactionTime && !interactionShown) {
      interactionShown = true;
      video.pause();
buttonsContainer.classList.add('visible');
    }
  });

  // 🎮 Button click resumes video
  imageButtons.forEach(button => {
    button.addEventListener('click', () => {
buttonsContainer.classList.remove('visible');
      video.play();
      interactionShown = false;
      currentInteractionIndex++;
    });
  });
