'use strict';

const hoursDisplay   = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const setAlarmButton = document.querySelector('input[type="button"]');
const alarmHourInput = document.querySelector('input[name="hour"]');
const alarmMinuteInput = document.querySelector('input[name="minute"]');
const alarmDisplay = document.querySelector('h2.alarm');

let alarmTime = null
let alarmSound = new Audio('./assets/audio/clockalarmsound.wav');

function fixTime(time){
    return time < 10 ? '0'+time : time
}

function newTime(){
    const date    = new Date();
    const hours   = date.getHours();
    const minutes = date.getMinutes();
    
    hoursDisplay.textContent   = fixTime(hours);
    minutesDisplay.textContent = fixTime(minutes);

    if (alarmTime) {
        const currentTime = `${fixTime(hours)}:${fixTime(minutes)}`;
        if (currentTime === alarmTime) {
            alarmSound.play();
            setAlarmButton.value = "STOP"; 
        }
    }
}

function setAlarm() {
    
    alarmSound.pause();
    alarmSound.currentTime = 0;

    if (setAlarmButton.value === "STOP") {
        setAlarmButton.value = "Set alarm"; // Restaurar texto do botão
        alarmDisplay.innerHTML = `<i class="fa-solid fa-bell"></i> Alarm`;
        alarmTime = null;
    } else {
    const alarmHour = parseInt(alarmHourInput.value, 10);
    const alarmMinute = parseInt(alarmMinuteInput.value, 10);

    const isValidHour = !isNaN(alarmHour) && alarmHour >= 0 && alarmHour < 24;
    const isValidMinute = !isNaN(alarmMinute) && alarmMinute >= 0 && alarmMinute < 60;

    if (isValidHour && isValidMinute) {
        alarmTime = `${fixTime(alarmHour)}:${fixTime(alarmMinute)}`;
        alarmDisplay.innerHTML = `<i class="fa-solid fa-bell"></i>  ${alarmTime}`;
        } else {
            alarmDisplay.innerHTML = `<i class="fa-solid fa-bell"></i> Alarm`;
        }
    alarmHourInput.value = '';
    alarmMinuteInput.value = '';
    }
}
setAlarmButton.addEventListener('click', setAlarm);
newTime();
setInterval(newTime, 1000);