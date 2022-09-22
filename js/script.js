var Promise = require('es6-promise-polyfill').Promise;
import 'nodelist-foreach-polyfill';

import modal from './modules/modal';
import notes from './modules/notes';
import form from './modules/form';
let counter = 0;
window.addEventListener('DOMContentLoaded', () => {

    console.log(++counter);
    modal('[data-modal]', '.modal');
    notes();
    form('form');
});