const inputContaner = document.querySelector(".input-contaner");
const form = document.querySelector('.input-form');
const dateInput = document.querySelector('.date-input');
const spans = document.querySelectorAll('.time span');

const countdownTitle = document.querySelector('.countdown-title');
const countdownContaner = document.querySelector('.countdown');



// Created varables
const currentDate = new Date();
const ymd = currentDate.toISOString().split('T')[0];
dateInput.setAttribute('min', ymd);
let interval;

let countdownTitleInput = '';
let countdownDateInput = '';
let countdownValue = Date;
let now = 0;


// function for updating the UI
function updateUI () {
    interval = setInterval(() => {
        now = new Date(countdownDateInput) - new Date().getTime();

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
    }, 1000);
};


// Functions for Event Listeners
function addDate(e) {
    e.preventDefault();
    countdownTitleInput = e.srcElement[0].value;
    countdownDateInput = e.srcElement[1].value;
    updateUI();
}







// Event Listeners
form.addEventListener('submit', addDate);