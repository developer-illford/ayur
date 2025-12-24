document.addEventListener("DOMContentLoaded", function () {

  // 🔒 ONLY main images
  const images = document.querySelectorAll(".main-img");

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "zoom-overlay";
  document.body.appendChild(overlay);

  const zoomContainer = document.createElement("div");
  zoomContainer.id = "zoom-container";
  document.body.appendChild(zoomContainer);

  const zoomedImg = document.createElement("img");
  zoomContainer.appendChild(zoomedImg);

  const closeBtn = document.createElement("div");
  closeBtn.id = "zoom-close";
  closeBtn.innerHTML = "&times;";
  zoomContainer.appendChild(closeBtn);

  // Zoom logic
  images.forEach(img => {
    img.addEventListener("click", function (e) {
      e.stopPropagation(); // safety
      zoomedImg.src = img.src;
      overlay.style.display = "block";
      zoomContainer.style.display = "block";
    });
  });

  function closeZoom() {
    overlay.style.display = "none";
    zoomContainer.style.display = "none";
  }

  overlay.addEventListener("click", closeZoom);
  closeBtn.addEventListener("click", closeZoom);
});
