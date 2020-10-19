'use strict';

const getElemByID = id => document.getElementById(id);

const CONTAINER = getElemByID('bodyContainer');
const MESSAGE_CONTAINER = getElemByID("messageContainer");
const PROGRESS_BAR = getElemByID('progressBar');
const PROGRESS_BAR_FULL = getElemByID('progressBarFull');
const PROGRESS_BAR_FULL_LABEL = getElemByID('progressBarFullLabel');
const PROGRESS_BAR_LABELS = getElemByID('progressBarLabels');
const PROGRESS_BAR_LABEL_PASSED = getElemByID('daysPassedLabel');
const PROGRESS_BAR_LABEL_REMAINING = getElemByID('daysRemainingLabel');
const RESULT_CONTAINER = getElemByID('resultContainer');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const onSubmitButton = event => {
  const INPUT = getElemByID('dobInput');
  const dob = INPUT.value;
  const dobArr = dob.split('/');
  console.log('dobarr', dobArr);
  if (dobArr.length !== 3) {
    MESSAGE_CONTAINER.innerHTML = '<h3 class="errorMessage">Please enter correct Date of birth format dd/mm/yyy</h3>';
    return;
  }
  chrome.storage.local.set({ dob: dob}, function() {
  });
  displayResult(dob);
}

const displayResult = dob => {
  if (!dob) {
    return;
  }
  const dobArr = dob.split('/');
  const dobArrInt = dobArr.map(d => parseInt(d));
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const dobDate = new Date(dobArrInt[2], dobArrInt[0], dobArrInt[1]);
  const deathDate = new Date(dobArrInt[2] + 85, dobArrInt[0], dobArrInt[1]);
  const today = new Date();
  const diffDays = Math.round(Math.abs((today - deathDate) / oneDay));
  const totalDays = Math.round(Math.abs((deathDate - dobDate) / oneDay));
  const daysPassed = Math.round(Math.abs((today - dobDate) / oneDay));
  CONTAINER.innerHTML = '';
  MESSAGE_CONTAINER.innerHTML = '';
  CONTAINER.classList.add('show');
  CONTAINER.innerHTML = CONTAINER.innerHTML + `<div id="resultContainer" class="resultContainer"><h3>You have ${numberWithCommas(diffDays)} days left to live!</h3><p>You were born on: ${dob}. <a id="resetButton" class="resetButton">reset</a><br/>Life expectancy: 85 years.</p></div>`;
  const RESET_BUTTON = getElemByID('resetButton');
  RESET_BUTTON.addEventListener('click', () => {
    displayInput();
  })
  showProgressBar(daysPassed, totalDays);
}

const showProgressBar = (daysPassed, totalDays) => {
  PROGRESS_BAR.classList.add('show');
  PROGRESS_BAR_FULL.style.width = `${daysPassed / totalDays * 100}%`;
  PROGRESS_BAR_LABEL_PASSED.textContent = `${numberWithCommas(daysPassed)} passed`;
  PROGRESS_BAR_LABEL_REMAINING.textContent = `${numberWithCommas(totalDays - daysPassed)} remain`;
  RESULT_CONTAINER.appendChild()
}

const hideProgressBar = () => {
  CONTAINER.classList.remove('show');
  PROGRESS_BAR.classList.remove('show');
  PROGRESS_BAR_LABELS
}

const displayInput = () => {
  CONTAINER.innerHTML = '<div class="labelContainer">'
    + '<label class="dobLabel" for="dob">date of birth:</label>'
    + '<input id="dobInput" type="text" name="dob" class="dobInput" placeholder="mm/dd/yyyy" />'
    + '</div>'
    + '<button id="dobSubmit" class="dobSubmit">Show</button>';
    const button = getElemByID('dobSubmit');
    button.addEventListener('click', onSubmitButton);
    hideProgressBar();
}

const initDisplayListeners =() => {
  if (!button) return;
}

window.onload = function() {
  displayInput();
  chrome.storage.local.get(['dob'], function(result) {
    if (result.dob) {
      displayResult(result.dob);
    }
  });
}

