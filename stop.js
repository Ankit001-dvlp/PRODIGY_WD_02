let startStopBtn = document.getElementById("startStopBtn");
let resetBtn = document.getElementById("resetBtn");
let lapBtn = document.getElementById("lapBtn");
let hoursDisplay = document.getElementById("hours");
let minutesDisplay = document.getElementById("minutes");
let secondsDisplay = document.getElementById("seconds");
let lapTimesList = document.getElementById("lapTimesList");

let timer;
let isRunning = false;
let elapsedTime = 0; // time in seconds
let lapTimes = [];

startStopBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
    startStopBtn.textContent = "Start";
  } else {
    timer = setInterval(updateTime, 1000);
    startStopBtn.textContent = "Pause";
  }
  isRunning = !isRunning;
}

function updateTime() {
  elapsedTime++;
  let hours = Math.floor(elapsedTime / 3600);
  let minutes = Math.floor((elapsedTime % 3600) / 60);
  let seconds = elapsedTime % 60;

  hoursDisplay.textContent = formatTime(hours);
  minutesDisplay.textContent = formatTime(minutes);
  secondsDisplay.textContent = formatTime(seconds);
}

function resetTimer() {
  clearInterval(timer);
  elapsedTime = 0;
  isRunning = false;
  startStopBtn.textContent = "Start";
  hoursDisplay.textContent = "00";
  minutesDisplay.textContent = "00";
  secondsDisplay.textContent = "00";
  lapTimes = [];
  lapTimesList.innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    let hours = Math.floor(elapsedTime / 3600);
    let minutes = Math.floor((elapsedTime % 3600) / 60);
    let seconds = elapsedTime % 60;

    let lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    lapTimes.push(lapTime);
    displayLapTimes();
  }
}

function displayLapTimes() {
  lapTimesList.innerHTML = "";
  lapTimes.forEach((lap, index) => {
    let li = document.createElement("li");
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapTimesList.appendChild(li);
  });
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
