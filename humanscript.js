document.addEventListener('DOMContentLoaded', () => {
    const dots = [document.getElementById('dot1'), document.getElementById('dot2'), document.getElementById('dot3')];
    let currentDot = 0;
    const timePerDot = 1000; // milliseconds each dot is displayed
    const totalCycles = 6; // total cycles before redirecting
    let currentCycle = 0;

    const cycleDots = () => {
        dots.forEach((dot, index) => {
            dot.style.opacity = index === currentDot ? '1' : '0.3';
        });

        if (currentDot < dots.length - 1) {
            currentDot++;
        } else {
            currentDot = 0;
            currentCycle++;
        }
    };

    const intervalId = setInterval(() => {
        if (currentCycle < totalCycles) {
            cycleDots();
        } else {
            clearInterval(intervalId);
            window.location.href = "mainpage.html";
        }
    }, timePerDot);
});
