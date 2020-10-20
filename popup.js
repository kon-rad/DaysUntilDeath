'use strict';

const getElemByID = id => document.getElementById(id);

const MESSAGE_CONTAINER = getElemByID("messageContainer");
const PROGRESS_BAR = getElemByID('progressBar');
const PROGRESS_BAR_FULL = getElemByID('progressBarFull');
const PROGRESS_BAR_FULL_LABEL = getElemByID('progressBarFullLabel');
const PROGRESS_BAR_LABELS = getElemByID('progressBarLabels');
const PROGRESS_BAR_LABEL_PASSED = getElemByID('daysPassedLabel');
const PROGRESS_BAR_LABEL_REMAINING = getElemByID('daysRemainingLabel');
const RESULT_CONTAINER = getElemByID('resultOuterContainer');
const INPUT_CONTAINER = getElemByID('inputContainer');

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
  INPUT_CONTAINER.classList.remove('show');
  const dobArr = dob.split('/');
  const dobArrInt = dobArr.map(d => parseInt(d));
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const dobDate = new Date(dobArrInt[2], dobArrInt[0], dobArrInt[1]);
  const deathDate = new Date(dobArrInt[2] + 85, dobArrInt[0], dobArrInt[1]);
  const today = new Date();
  const diffDays = Math.round(Math.abs((today - deathDate) / oneDay));
  const totalDays = Math.round(Math.abs((deathDate - dobDate) / oneDay));
  const daysPassed = Math.round(Math.abs((today - dobDate) / oneDay));
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
}

const hideProgressBar = () => {
  PROGRESS_BAR.classList.remove('show');
  PROGRESS_BAR_LABELS
}

const displayInput = () => {
  INPUT_CONTAINER.classList.add('show');
  console.log('show displayInput');
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

