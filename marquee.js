const track = document.getElementById("marqueeTrack");

// Duplicate content for seamless infinite loop
track.innerHTML += track.innerHTML;

// Drag-to-scroll
const container = document.querySelector(".marquee-container");
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener("mouseleave", () => (isDown = false));
container.addEventListener("mouseup", () => (isDown = false));

container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 1.5;
  container.scrollLeft = scrollLeft - walk;
});

