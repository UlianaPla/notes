function openModal(modalSelector) {

    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden';
}

function closeModal(modalSelector) {

    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');

    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector) {

    const modal = document.querySelector(modalSelector);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__close')) {
            closeModal(modalSelector);
        }
    });

    document.querySelector(triggerSelector)
        .addEventListener('click', () => openModal(modalSelector));

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

}

export default modal;
export { closeModal };
export { openModal };