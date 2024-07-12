document.addEventListener('DOMContentLoaded', () => {
    const images = ["Dollar1.png", "Dollar2.png", "Dollar3.png", "Dollar4.png", "Dollar5.png"];
    let currentImage = 0;
    const logo = document.getElementById('loading-logo');
    const checkbox = document.getElementById('verify-checkbox');

    const changeImage = () => {
        currentImage = (currentImage + 1) % images.length;
        logo.src = images[currentImage];
    };

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            window.location.href = "human.html";
        }
    });

    setInterval(changeImage, 1000); // Change main image every second
});
