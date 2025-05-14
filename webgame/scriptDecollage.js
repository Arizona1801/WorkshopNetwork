document.addEventListener('DOMContentLoaded', function() {
    let timeLeft = 10;
    const timerDisplay = document.getElementById('timer');

    function updateTimerDisplay() {
        timerDisplay.textContent = timeLeft;
    }

    function countdown() {
        if (timeLeft >= 0) { // Modified condition here
            updateTimerDisplay();
            if (timeLeft === 0) {
                timerDisplay.textContent = "C'est parti!";
            }
            timeLeft--; // Decrement after updating display
            setTimeout(countdown, 1000); // Call countdown every 1000ms (1 second)
        }
    }

    updateTimerDisplay(); // Display initial time
    countdown(); // Start the countdown
});