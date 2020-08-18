'use strict';

const getElemByID = id => document.getElementById(id);

const button = getElemByID('dobSubmit');

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
  const dobArrInt = dobArr.map(d => parseInt(d));
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const dobDate = new Date(dobArrInt[2], dobArrInt[0], dobArrInt[1]);
  const deathDate = new Date(dobArrInt[2] + 85, dobArrInt[0], dobArrInt[1]);

  const diffDays = Math.round(Math.abs((dobDate - deathDate) / oneDay));
  CONTAINER.innerHTML = CONTAINER.innerHTML + `<h3>You have ${diffDays} days left to live!</h3>`;
});


