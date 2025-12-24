const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

// ONLY zoom main images
document.querySelectorAll(".main-img").forEach(img => {

    img.style.cursor = "zoom-in";

    img.addEventListener("click", function () {
        modal.style.display = "flex";
        modalImg.src = this.src;
    });
});

// Close modal
closeBtn.onclick = () => modal.style.display = "none";

window.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};
