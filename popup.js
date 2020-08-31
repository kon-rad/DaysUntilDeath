'use strict';

const getElemByID = id => document.getElementById(id);

const CONTAINER = getElemByID('bodyContainer');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const onSubmitButton = event => {
  const INPUT = getElemByID('dobInput');
  const dob = INPUT.value;
  const dobArr = dob.split('/');
  console.log('dobarr', dobArr);
  if (dobArr.length !== 3) {
    CONTAINER.innerHTML = CONTAINER.innerHTML + '<h3>Please enter correct Date of birth format dd/mm/yyy</h3>';
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
  CONTAINER.innerHTML = '';
  CONTAINER.innerHTML = CONTAINER.innerHTML + `<div class="resultContainer"><h3>You have ${numberWithCommas(diffDays)} days left to live!</h3><p>You were born on: ${dob}. <a id="resetButton">reset</a></p></div>`;
  const RESET_BUTTON = getElemByID('resetButton');
  RESET_BUTTON.addEventListener('click', () => {
    displayInput();
  })
}

const displayInput = () => {
  CONTAINER.innerHTML = '<div class="labelContainer">'
    + '<label class="dobLabel" for="dob">date of birth:</label>'
    + '<input id="dobInput" type="text" name="dob" class="dobInput" placeholder="mm/dd/yyyy" />'
    + '</div>'
    + '<button id="dobSubmit" class="dobSubmit">Show</button>';
    const button = getElemByID('dobSubmit');
    button.addEventListener('click', onSubmitButton);
}

const initDisplayListeners =() => {
  if (!button) return;
}

window.onload = function() {

  displayInput();
  // initDisplayListeners();
  chrome.storage.local.get(['dob'], function(result) {
    if (result.dob) {
      displayResult(result.dob);
    }
  });
}

