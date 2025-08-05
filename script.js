let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function updateTime() {
  const time = Date.now() - startTime + elapsedTime;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)));

  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(updateTime, 1000);
  }
});

pauseBtn.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    elapsedTime += Date.now() - startTime;
    clearInterval(timer);
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  startTime = null;
  elapsedTime = 0;
  display.textContent = "00:00:00";
  laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (isRunning) {
    const li = document.createElement('li');
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
});
