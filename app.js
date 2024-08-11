let workTime = 3;
let breakTime = 5;

function formattedTime(time) {
	return `${Math.trunc(time/60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`;
}

const diplayWorkTime = document.querySelector('.work-time');
const diplayBreakTime = document.querySelector('.break-time');

diplayWorkTime.textContent = formattedTime(workTime);
diplayBreakTime.textContent = formattedTime(breakTime);

const toggleBtn = document.querySelector('.toggle-time-btn');
toggleBtn.addEventListener('click', togglePomodoro)

let currentInterval = false;
let timerId;

function togglePomodoro() {
	handlePlayPause();
	if (currentInterval) {
		if (isPaused) {
			timerId = setInterval(handleTicks, 1000);
		} else {
			clearInterval(timerId);
		}
		return;
	}

	currentInterval = true;
	workTime--;
	diplayWorkTime.textContent = formattedTime(workTime);
	timerId = setInterval(handleTicks, 1000);
}

let isPaused = true;

function handlePlayPause() {
	if (toggleBtn.getAttribute('data-toggle') === 'play') {
		isPaused = false;
		toggleBtn.firstElementChild.src = 'assets/pause.svg';
		toggleBtn.setAttribute('data-toggle', 'pause');
		if (workTime) {
			handleAnimation({work : true, break : false});
		} else {
			handleAnimation({work : false, break : true});
		}
	} else {
		isPaused = true;
		toggleBtn.firstElementChild.src = 'assets/play.svg';
		toggleBtn.setAttribute('data-toggle', 'play');
	}
}

function handleAnimation(timerState) {
	for (const timer in timerState) {
		if (timerState[timer]) {
			document.querySelector(`.${timer}-title`).classList.add('active');
		} else {
			document.querySelector(`.${timer}-title`).classList.remove('active');
		}
	}
}

const cycles = document.querySelector('.cycles');
let cyclesCount = 0;

function handleTicks() {
	if (isPaused) return;

	if (workTime > 0) {
		workTime--;
		diplayWorkTime.textContent = formattedTime(workTime);
		handleAnimation({work : true, break : false});
	} else if (workTime === 0 && breakTime > 0) {
		breakTime--;
		diplayBreakTime.textContent = formattedTime(breakTime);
		handleAnimation({work : false, break : true});
	} else {
		resetTimer();
		cyclesCount++;
		cycles.textContent = `Cycle(s) : ${cyclesCount}`;
		handleAnimation({work : false, break : false});
	}
}

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', resetTimer);

function resetTimer() {
	clearInterval(timerId);
	currentInterval = false;

	workTime = 1800;
	breakTime = 300;
	diplayBreakTime.textContent = formattedTime(breakTime);
	diplayWorkTime.textContent = formattedTime(workTime);

	cyclesCount = 0;
	cycles.textContent = `Cycle(s) : ${cyclesCount}`;

	isPaused = true;
	toggleBtn.firstElementChild.src = 'assets/play.svg';
	toggleBtn.setAttribute('data-toggle', 'play');
}