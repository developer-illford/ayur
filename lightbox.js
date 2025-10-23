
  // Click to open image in lightbox
  const images = document.querySelectorAll(".destination-card img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
    });
  });

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  // Optional: close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

