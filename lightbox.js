
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

// Select all images you want clickable
document.querySelectorAll("img").forEach(img => {
    img.style.cursor = "pointer"; // show pointer
    img.addEventListener("click", function () {
        modal.style.display = "flex"; // show modal
        modalImg.src = this.src;       // set clicked image
    });
});

// Close modal when clicking close button
document.querySelector(".close").onclick = function () {
    modal.style.display = "none";
}

// Close modal when clicking outside the image
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

