const modal = document.getElementById("lightbox");
const modalImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close");

// ONLY images with class="main-img"
document.querySelectorAll(".main-img").forEach(img => {
    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

// Close button
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Click outside image to close
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
