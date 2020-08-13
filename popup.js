'use strict';

const getElemByID = id => document.getElementById(id);

const button = getElemByID('dobSubmit');

button.addEventListener('click', event => {
  alert('clicked');
});


