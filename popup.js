'use strict';

const getElemByID = id => document.getElementById(id);

const button = getElemByID('dobSubmit');

button.addEventListener('click', event => {
  const CONTAINER = getElemByID('bodyContainer');
  CONTAINER.innerHTML = '';
});


