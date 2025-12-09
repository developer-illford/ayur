function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  // toggle classes
  mobileMenu.classList.toggle("active");
  menuOverlay.classList.toggle("active");
}

// close when clicking outside
document.getElementById("menuOverlay").addEventListener("click", (e) => {
  const mobileMenu = document.getElementById("mobileMenu");
  if (!mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove("active");
    document.getElementById("menuOverlay").classList.remove("active");
  }
});

// close on scroll
window.addEventListener("scroll", () => {
  document.getElementById("mobileMenu").classList.remove("active");
  document.getElementById("menuOverlay").classList.remove("active");
});

// close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("mobileMenu").classList.remove("active");
    document.getElementById("menuOverlay").classList.remove("active");
  }
});



const container = document.getElementById('sliderContainer');
const slider = document.getElementById('imageSlider');
const dotsContainer = document.getElementById('sliderDots');

// Clone images for infinite loop
slider.innerHTML += slider.innerHTML;
const images = slider.querySelectorAll("img");
const originalCount = images.length / 2;

// Create dots
for (let i = 0; i < originalCount; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll(".dot");

let scrollSpeed = 2;
let autoScrollInterval;
let isUserScrolling = false;
let scrollPauseTimeout;

function startAutoScroll() {
  stopAutoScroll(); // prevent multiple intervals

  autoScrollInterval = setInterval(() => {
    if (!isUserScrolling) {
      container.scrollLeft += scrollSpeed;

      // Reset scroll for infinite loop
      if (container.scrollLeft >= slider.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      updateDots();
    }
  }, 20);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function updateDots() {
  const scrollLeft = container.scrollLeft;
  let totalWidth = 0;

  for (let i = 0; i < originalCount; i++) {
    totalWidth += images[i].offsetWidth + 20; // image + gap
    if (scrollLeft < totalWidth) {
      dots.forEach(dot => dot.classList.remove("active"));
      dots[i % originalCount].classList.add("active");
      break;
    }
  }
}

// Manual drag (mouse)
let isDown = false;
let startX, scrollStart;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  isUserScrolling = true;
  startX = e.pageX;
  scrollStart = container.scrollLeft;
  container.style.cursor = 'grabbing';
  stopAutoScroll();
});

container.addEventListener('mouseleave', () => {
  isDown = false;
  container.style.cursor = 'grab';
});

container.addEventListener('mouseup', () => {
  isDown = false;
  container.style.cursor = 'grab';
  triggerAutoResume();
});

container.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  const x = e.pageX;
  const walk = x - startX;
  container.scrollLeft = scrollStart - walk;
  updateDots();
});

// Touch support
container.addEventListener('touchstart', () => {
  isUserScrolling = true;
  stopAutoScroll();
  if (scrollPauseTimeout) clearTimeout(scrollPauseTimeout);
});

container.addEventListener('touchmove', () => {
  updateDots();
});

container.addEventListener('touchend', () => {
  triggerAutoResume();
});

// Resume auto-scroll after short delay
function triggerAutoResume() {
  if (scrollPauseTimeout) clearTimeout(scrollPauseTimeout);
  scrollPauseTimeout = setTimeout(() => {
    isUserScrolling = false;
    startAutoScroll();
  }, 1000); // Resume 1s after manual interaction ends
}

// Initial start
startAutoScroll();

// JS for click-to-enlarge
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = modal.querySelector(".close");

// Apply to all images (or restrict to certain class)
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("click", function () {
    modal.style.display = "flex"; // use flex to center
    modalImg.src = this.src;       // show clicked image
  });
});

// Close modal
closeBtn.onclick = () => modal.style.display = "none";

// Close when clicking outside image
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};


document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.slider-track');
  const slides = Array.from(track.children);

  // Duplicate the entire row twice
  slides.forEach(slide => track.appendChild(slide.cloneNode(true)));

  // Buttons – pause animation when clicked
  document.querySelector(".slider-next").onclick = () => {
    track.style.animationPlayState = "paused";
    track.style.transform = "translateX(-300px)";
    setTimeout(() => track.style.animationPlayState = "running", 300);
  };

  document.querySelector(".slider-prev").onclick = () => {
    track.style.animationPlayState = "paused";
    track.style.transform = "translateX(300px)";
    setTimeout(() => track.style.animationPlayState = "running", 300);
  };

  // Swipe support
  let startX = 0;
  let dragging = false;

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    dragging = true;
    track.style.animationPlayState = "paused";
  });

  track.addEventListener("touchmove", e => {
    if (!dragging) return;
    const diff = e.touches[0].clientX - startX;
    track.style.transform = `translateX(${diff}px)`;
  });

  track.addEventListener("touchend", () => {
    dragging = false;
    track.style.transform = "translateX(0)";
    track.style.animationPlayState = "running";
  });
});


