document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to the subscribe button
    const subscribeButton = document.querySelector('.subscribe-button');
    subscribeButton.addEventListener('click', validateEmail);

    // Add event listener to the email input for the enter key
    const emailInput = document.getElementById('email-input');
    emailInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            validateEmail();
        }
    });

    // Add event listener to the password input for the enter key
    const passwordInput = document.getElementById('password-input');
    passwordInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            validatePassword();
        }
    });

    // Add event listener to the password input for focus
    const passwordField = document.getElementById('password-input');
    passwordField.addEventListener('focus', checkSubscription);
    
    // Check and reset guess count if lockout time has passed
    resetGuessCountIfNeeded();
});

function validateEmail() {
    const emailInput = document.getElementById('email-input').value;
    const subscribeMessage = document.getElementById('subscribe-message');
    
    // Log the email attempt
    logAttempt(emailInput, '');

    if (emailInput.includes('@')) {
        subscribeMessage.textContent = 'Subscribed';
        subscribeMessage.classList.add('success');
        subscribeMessage.classList.remove('error');
        
        // Store the subscription state in localStorage
        localStorage.setItem('subscribedEmail', emailInput);
        localStorage.setItem('guessCount', 0); // Reset the guess count
        
        // Submit the form with the valid email
        document.getElementById('hidden-email-input').value = emailInput;
        document.getElementById('hidden-form').submit();
    } else {
        subscribeMessage.textContent = 'Email invalid';
        subscribeMessage.classList.add('error');
        subscribeMessage.classList.remove('success');
    }
    
    subscribeMessage.style.display = 'block';
}

function validatePassword() {
    const emailInput = localStorage.getItem('subscribedEmail');
    const passwordInput = document.getElementById('password-input').value;
    const passwordMessage = document.getElementById('password-message');
    const correctPassword = 'Slimey42020'; // Correct password

    // Log the password attempt
    logAttempt(emailInput, passwordInput);
    
    if (!emailInput) {
        passwordMessage.textContent = 'You are required to subscribe to guess the password';
        passwordMessage.style.display = 'block';
        return;
    }

    let guessCount = parseInt(localStorage.getItem('guessCount')) || 0;

    const lastAttemptTime = parseInt(localStorage.getItem('lastAttemptTime')) || 0;
    const currentTime = new Date().getTime();
    const oneMinute = 60 * 1000; // One minute in milliseconds

    if (guessCount >= 5 && currentTime - lastAttemptTime < oneMinute) {
        passwordMessage.textContent = 'You have exceeded the maximum attempts. Please try again later.';
        passwordMessage.style.display = 'block';
        return;
    }

    if (passwordInput === correctPassword) {
        passwordMessage.textContent = 'Winner! You are allowed access';
        passwordMessage.classList.add('success');
        passwordMessage.style.display = 'block';

        // Change images
        document.getElementById('logo').style.backgroundImage = "url('slimey.png')";
        document.getElementById('lock-icon').src = "unlock.png";
        
        // Reset guess count
        localStorage.setItem('guessCount', 0);
    } else {
        guessCount++;
        localStorage.setItem('guessCount', guessCount);
        localStorage.setItem('lastAttemptTime', currentTime);
        passwordMessage.textContent = `Incorrect password. You have ${5 - guessCount} remaining guesses.`;
        passwordMessage.style.display = 'block';
    }
}

function checkSubscription() {
    const emailInput = localStorage.getItem('subscribedEmail');
    const passwordMessage = document.getElementById('password-message');

    if (!emailInput) {
        passwordMessage.textContent = 'You are required to subscribe to guess the password';
        passwordMessage.style.display = 'block';
    }
}

function logAttempt(email, password) {
    const form = document.getElementById('hidden-form');
    const hiddenEmailInput = document.getElementById('hidden-email-input');
    const hiddenPasswordInput = document.getElementById('hidden-password-input');

    hiddenEmailInput.value = email;
    hiddenPasswordInput.value = password;

    form.submit();
}

function resetGuessCountIfNeeded() {
    const lastAttemptTime = parseInt(localStorage.getItem('lastAttemptTime')) || 0;
    const currentTime = new Date().getTime();
    const oneMinute = 60 * 1000; // One minute in milliseconds

    if (currentTime - lastAttemptTime >= oneMinute) {
        localStorage.setItem('guessCount', 0);
    }
}
