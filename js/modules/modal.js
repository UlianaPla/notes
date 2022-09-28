import { resetForm, updateForm } from './form';

let modalSelector;

function openModal() {

    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden';
}

function openModalForNote(note) {

    openModal();
    updateForm(note);
}

function closeModal() {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');

    document.body.style.overflow = '';
}

function showThanksModal(message) {
    const previousModalDialog = document.querySelector('.modal__dialog');

    previousModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>            
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    console.log('start timer');

    setTimeout(() => {
        thanksModal.remove();
        previousModalDialog.classList.add('show');
        previousModalDialog.classList.remove('hide');
        closeModal('.modal');

        resetForm();
    }, 4000);
}

function modal(triggerSelector, selector) {
    modalSelector = selector;

    const modal = document.querySelector(modalSelector);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__close')) {
            console.log('modal close event handler')
            closeModal();
        }
    });

    document.querySelectorAll(triggerSelector)
        .forEach((btn) => btn.addEventListener('click', () => openModal()));

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });
}

export default modal;
export { showThanksModal, openModalForNote };