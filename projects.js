document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.projects-container');
  const cards = document.querySelectorAll('.project-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const pauseBtn = document.querySelector('.pause-btn');
  
  let currentIndex = 0;
  let isPaused = false;
  let autoRotateInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50; // minimum distance for a swipe
  
  function updateCarousel() {
    const cardWidth = container.offsetWidth;
    const offset = -currentIndex * cardWidth;
    container.style.transform = `translateX(${offset}px)`;
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  }
  
  function togglePause() {
    isPaused = !isPaused;
    pauseBtn.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
    
    if (isPaused) {
      clearInterval(autoRotateInterval);
    } else {
      startAutoRotate();
    }
  }
  
  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 5000); // Rotate every 5 seconds
  }

  // Touch event handlers
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped right, show previous
        prevSlide();
      } else {
        // Swiped left, show next
        nextSlide();
      }
      
      // Reset auto-rotation timer
      if (!isPaused) {
        clearInterval(autoRotateInterval);
        startAutoRotate();
      }
    }
  }
  
  // Event listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    if (!isPaused) {
      clearInterval(autoRotateInterval);
      startAutoRotate();
    }
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    if (!isPaused) {
      clearInterval(autoRotateInterval);
      startAutoRotate();
    }
  });
  
  pauseBtn.addEventListener('click', togglePause);

  // Touch event listeners
  container.addEventListener('touchstart', handleTouchStart, { passive: true });
  container.addEventListener('touchmove', handleTouchMove, { passive: true });
  container.addEventListener('touchend', handleTouchEnd);
  
  // Initialize carousel position
  updateCarousel();
  
  // Start auto-rotation
  startAutoRotate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    updateCarousel();
  });
}); 