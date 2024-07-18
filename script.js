let timer;
let startTime;
let elapsedTime = 0;
let paused = true;
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function startStop() {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10); // Update every 10 milliseconds
        startStopButton.textContent = 'Pause';
    } else {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    }
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    paused = true;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function lap() {
    if (!paused) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}