const inputContaner = document.querySelector(".input-contaner");
const form = document.querySelector('.input-form');
const dateInput = document.querySelector('.date-input');
const spans = document.querySelectorAll('.time span');

const countdownTitle = document.querySelector('.countdown-title');
const countdownContaner = document.querySelector('.countdown');
const resetButton = document.querySelector(".reset");

const completed = document.querySelector(".complete");
const newCountdownBtn = document.querySelector('.new-countdown');
const completedDescription = document.querySelector(".countdown-info");


// Created varables
const currentDate = new Date();
const ymd = currentDate.toISOString().split('T')[0];
dateInput.setAttribute('min', ymd);
let interval;
let localSt;

let countdownTitleInput = '';
let countdownDateInput = '';
let countdownValue = Date;
let now = 0;


// function for updating the UI
function updateUI () {
    interval = setInterval(() => {
        now = new Date(countdownDateInput) - new Date().getTime();

        if (now < 0) {
            clearInterval(interval);
            completed.hidden = false;
            inputContaner.style.display = "none";
            completedDescription.textContent = `${countdownTitleInput} Finished on ${countdownDateInput}`;
        }else {

            localSt = {
                title : countdownTitleInput,
                date : countdownDateInput,
            };

            localStorage.setItem("countdown", JSON.stringify(localSt));
            
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;
        
            countdownTitle.textContent = countdownTitleInput;
        
            spans[0].textContent = Math.floor(now / day);
            spans[1].textContent = Math.floor((now % day) / hour);
            spans[2].textContent = Math.floor((now % hour) / minute);
            spans[3].textContent = Math.floor((now % minute) / second);
    
            inputContaner.style.display = "none";
            countdownContaner.hidden = false;
        }
    }, 1000);
};

// LocalStorage checking function
function localstorageChecker () {
    if (localStorage.getItem('countdown')){
        const obValue = JSON.parse(localStorage.getItem('countdown'));
        countdownTitleInput = obValue.title;
        countdownDateInput = obValue.date;
        updateUI();
    };
};

// Functions for Event Listeners
function addDate(e) {
    e.preventDefault();
    countdownTitleInput = e.srcElement[0].value;
    countdownDateInput = e.srcElement[1].value;
    if (dateInput.value) {
        updateUI();
    };
};

// Reset funtion
function reset () {
    countdownContaner.hidden = true;
    inputContaner.style.display = 'block';
    // Stoping the interval function
    clearInterval(interval);
    localStorage.removeItem('countdown');
};

// New countdown function
function newCountdown () {
    completed.hidden = true;
    inputContaner.style.display = 'block';
}


// Event Listeners
form.addEventListener('submit', addDate);
resetButton.addEventListener('click', reset);
newCountdownBtn.addEventListener('click', newCountdown);

// On load function
localstorageChecker();