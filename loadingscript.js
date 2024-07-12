document.addEventListener('DOMContentLoaded', () => {
    const images = ["Dollar1.png", "Dollar2.png", "Dollar3.png", "Dollar4.png", "Dollar5.png"];
    const dots = ["dot1", "dot2", "dot3"];
    let currentImage = 0;
    let currentDot = 0;
    let sequenceCount = 0;
    const logo = document.getElementById('loading-logo');
    const dotElements = dots.map(dotId => document.getElementById(dotId));

    const changeImage = () => {
        currentImage = (currentImage + 1) % images.length;
        logo.src = images[currentImage];
        if (currentImage === 4) { // Change to Dollar5.png
            sequenceCount++;
            if (sequenceCount === 2) { // Change to desired number of repetitions
                fadeOut();
            }
        }
    };

    const showDots = () => {
        dotElements.forEach((dot, index) => {
            dot.style.opacity = index === currentDot ? '1' : '0.3';
        });
        currentDot = (currentDot + 1) % dots.length;
    };

    const fadeOut = () => {
        logo.style.opacity = 0;
        setTimeout(() => {
            window.location.href = "verify.html";
        }, 500); // Adjust timing as needed
    };

    setInterval(changeImage, 1000); // Change main image every second
    setInterval(showDots, 500); // Change dots every half second
});
