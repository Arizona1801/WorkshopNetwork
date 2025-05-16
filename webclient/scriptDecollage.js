document.addEventListener('DOMContentLoaded', function() {
    let timeLeft = 10;
    const timerDisplay = document.getElementById('timer');

    function updateTimerDisplay() {
        timerDisplay.textContent = timeLeft;
    }

    function countdown() {
        if (timeLeft >= 0) {
            updateTimerDisplay();
            if (timeLeft === 0) {
                timerDisplay.textContent = "C'est parti!";
                // Redirection vers un lien
                window.location.href = "game.html"; // Remplacez par votre URL
            } else {
                timeLeft--; // Décrémente après la mise à jour de l'affichage
                setTimeout(countdown, 1000); // Appelle countdown toutes les 1000ms (1 seconde)
            }
        }
    }

    updateTimerDisplay(); // Affiche le temps initial
    countdown(); // Démarre le décompte
});