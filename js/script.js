var Promise = require('es6-promise-polyfill').Promise;
import 'nodelist-foreach-polyfill';

import modal from './modules/modal';
import notes from './modules/notes';
import forms from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {

    modal('#createNoteBtn', '.modal');
    notes();
    forms('form');
});