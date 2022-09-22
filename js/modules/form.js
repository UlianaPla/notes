import { showThanksModal } from './modal';
import { postData, editData } from '../services/services';

const urlNotes = 'http://localhost:3000/notes';
const message = {
    loading: 'icons/spinner.svg',
    success: 'Note has been added',
    successEdit: 'Note has been edited',
    failure: 'Oops, something went wrong...'
};

const dateReg = /(0?[1-9]|[12][0-9]|3[01])[\/\/.](0?[1-9]|1[012])[\/\/.]\d{4}/g,
    dividerSlash = '/', // Note: if changing dividers -> change the regular expression
    dividerDot = '.';

let formSelector;

/**
 * Fill data from Form with needed data.
 * @returns Object of Note, that shoul be saved.
 */
function fillData(data, isEditMode) {
    let dataObj = Object.fromEntries(data);

    if (!isEditMode)
        dataObj.created = Date.parse(new Date());

    dataObj.dates = parseDatesFromContent(dataObj.content);

    return dataObj;
}

/**
 * Found and parse dates with format like '02.09.2022' or '02/09/2022'
 * @param {String} content
 * @returns array of milliseconds founded dates
 */
function parseDatesFromContent(content) {
    const dateStrings = content.match(dateReg);

    if (!dateStrings)
        return [];

    let datesArray = dateStrings.map((str) => {
        const [day, month, year] = str.indexOf(dividerSlash) > 0
            ? str.split(dividerSlash)
            : str.split(dividerDot);

        return new Date(+year, +month - 1, +day).getTime();
    });

    return datesArray;
}

function updateForm(data) {

    const { name, category, content, id } = data;

    const form = document.querySelector(formSelector),
        titleElement = form.querySelector('.modal__title'),
        noteNameElement = form.querySelector('input[name="name"]'),
        typesElement = form.querySelector('#noteTypes'),
        contentElement = form.querySelector('input[name="content"]'),
        btnSubmit = form.querySelector('.btn');

    noteNameElement.value = name;
    typesElement.value = category;
    contentElement.value = content;

    titleElement.textContent = "Edit your note";
    btnSubmit.textContent = 'Save';
    form.setAttribute('data-id', id);
}

function resetForm() {
    const form = document.querySelector(formSelector);
    form.reset();
    form.setAttribute('data-noteId', -1);

    const titleElement = form.querySelector('.modal__title'),
        btnSubmit = form.querySelector('.btn');

    titleElement.textContent = "Fill the fields";
    btnSubmit.textContent = "Create";
}

function form(selector) {
    formSelector = selector;

    const form = document.querySelector(formSelector);

    bindPostData(form);

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            sendDataToServer(form, statusMessage);
        });
    }

    function sendDataToServer(form, statusMessage) {

        const formData = new FormData(form);
        const noteId = form.getAttribute('data-id'),
            isEditMode = noteId > -1;

        const data = fillData(formData.entries(), isEditMode);
        const json = JSON.stringify(data);
        let url = urlNotes;

        if (isEditMode)
            url += `/${noteId}`;

        const promise = isEditMode ? editData : postData;

        promise(url, json)
            .then(data => {
                console.log(data);
                showThanksModal(isEditMode ? message.successEdit : message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            });
    }
}

export default form;
export { resetForm, updateForm };