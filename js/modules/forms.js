import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function forms(formSelector) {

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Note has been added',
        failure: 'Oops, something went wrong...'
    };

    const dateReg = /(0?[1-9]|[12][0-9]|3[01])[\/\/.](0?[1-9]|1[012])[\/\/.]\d{4}/g,
        dividerSlash = '/', // Note: if changing dividers -> change the regular expression
        dividerDot = '.';

    forms.forEach(item => bindPostData(item));

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

            const formData = new FormData(form);
            const data = fillData(formData.entries());
            const json = JSON.stringify(data);

            postData('http://localhost:3000/notes', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    /**
     * Fill data from Form with needed data.
     * @returns Object of Note, that shoul be saved.
     */
    function fillData(data) {
        let dataObj = Object.fromEntries(data);

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

        let datesArray = dateStrings
            ? dateStrings.map((str) => {
                const [day, month, year] = str.indexOf(dividerSlash) > 0
                    ? str.split(dividerSlash)
                    : str.split(dividerDot);

                return new Date(+year, +month - 1, +day).getTime();
            })
            : [];

        return datesArray;
    }

    function showThanksModal(message) {
        const previousModalDialog = document.querySelector('.modal__dialog');

        previousModalDialog.classList.add('hide');
        openModal('.modal');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>            
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

}
export default forms;