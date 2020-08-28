'use strict';

const getElemByID = id => document.getElementById(id);

const button = getElemByID('dobSubmit');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

button.addEventListener('click', event => {
  const CONTAINER = getElemByID('bodyContainer');
  const INPUT = getElemByID('dobInput');
  CONTAINER.innerHTML = '';
  const dob = INPUT.value;
  const dobArr = dob.split('/');
  if (dobArr.length !== 3) {
    CONTAINER.innerHTML = CONTAINER.innerHTML + '<h3>Please enter correct Date of birht format dd/mm/yyy</h3>';
    return;
  }
  chrome.storage.local.set({ dob: dob}, function() {
    console.log('Value is set to ' + dob);
  });
});

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
  CONTAINER.innerHTML = CONTAINER.innerHTML + `<h3>You have ${numberWithCommas(diffDays)} days left to live!</h3>`;
}

window.onload = function() {

  chrome.storage.local.get(['dob'], function(result) {
    console.log('Value currently is ' + result.dob);
    if (result.dob) {
      alert('hi', result.dob);
      displayResult(result.dob);
    }
  });
}

