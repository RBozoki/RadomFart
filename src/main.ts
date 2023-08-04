let audio: HTMLAudioElement = new Audio('assets/sound.mp3');
let switchControl: HTMLInputElement = document.getElementById('switch') as HTMLInputElement;
let countdownDisplay: HTMLElement = document.getElementById('countdown') as HTMLElement;
let showButton: HTMLInputElement = document.getElementById('showButton') as HTMLInputElement

let countdownInterval: number;
let soundTimeout: number | null = null;

window.onload = function() {
    switchControl.checked = false;
}

switchControl.addEventListener('change', function() {
    if (this.checked) {
        playSoundRandomly();
    } else {
        stopSound();
        clearInterval(countdownInterval);
        countdownDisplay.textContent = 'Le son sera joué dans : --:--';
        if (soundTimeout != null) {   // Ajouter cette section
            clearTimeout(soundTimeout);
            soundTimeout = null;
        }
    }
});



function playSoundRandomly(): void {
    let interval: number = Math.random() * 900000; // Génère un temps aléatoire en millisecondes (jusqu'à 15 minutes)
    soundTimeout = setTimeout(function() {   // Modifier cette ligne
        audio.play();
        if (switchControl.checked) { // Vérifie si le switch est toujours activé
            playSoundRandomly();
        }
    }, interval);
    updateCountdown(interval / 1000);  // Ajouter cette ligne pour réinitialiser le compte à rebours à chaque fois que playSoundRandomly est appelé
}
function updateCountdown(timeInSeconds: number): void {
    clearInterval(countdownInterval); // Arrête le compte à rebours précédent
    countdownInterval = setInterval(function() {
        let minutes: number = Math.floor(timeInSeconds / 60);
        let seconds: number = Math.floor(timeInSeconds % 60);
        countdownDisplay.textContent = `Le son sera joué dans : ${pad(minutes)}:${pad(seconds)}`;
        timeInSeconds--;
        if (timeInSeconds < 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = 'Le son va jouer maintenant!';
        }
    }, 1000);
}

function pad(num: number): string {
    return ('0' + num).slice(-2);
}

function stopSound(): void {
    audio.pause();
    audio.currentTime = 0; // Réinitialise le temps du son
}


showButton.addEventListener('click', function() {
    let countdownDisplay = document.getElementById("countdown");
    if (countdownDisplay === null)
        return;
    let displayStyle = window.getComputedStyle(countdownDisplay).display;
    if (displayStyle === "none") {
        countdownDisplay.style.display = "block";
        showButton.innerText = "Cacher le temps restant"
    } else {
        countdownDisplay.style.display = "none";
        showButton.innerText = "Montrer le temps restant"
    }
});
