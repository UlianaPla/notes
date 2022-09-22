import { getResource, deleteData } from "../services/services";
import { openModalForNote, showThanksModal } from './modal';

const urlNotes = 'http://localhost:3000/notes',
    message = {
        successArchive: 'Note has been archived',
        successDelete: 'Note has been deleted',
        failure: 'Oops, something went wrong...'
    };

function notes() {

    const maxLength = 30,
        categoryTitleByValue = {
            task: 'Task',
            random: 'Random Thought',
            idea: 'Idea'
        }

    let noteById = {};

    // Используем классы для карточек
    class NoteItem {
        constructor(id, name, created, category, content, dates, parentSelector) {
            this.id = id;
            this.name = name;
            this.created = created;
            this.category = category;
            this.content = content;
            this.dates = dates;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('tr');
            element.classList.add('note__item');

            const nameFormatted = formatString(this.name),
                createdAsString = parseDate(this.created),
                categoryName = getCategoryName(this.category),
                contentFormatted = formatString(this.content),
                datesAsString = parseDates(this.dates);

            element.innerHTML = `               
                <td>${nameFormatted}</td>
                <td>${createdAsString}</td>
                <td>${categoryName}</td>
                <td>${contentFormatted}</td>
                <td>${datesAsString}</td>
                <td>
                    <img id="edit" data-noteId="${this.id}" data-modal class="btn_icon" src="icons/edit.svg" alt="edit">
                    <img id="archive" data-noteId="${this.id}" class="btn_icon" src="icons/archive_dark.svg" alt="archive">
                    <img id="delete" data-noteId="${this.id}" class="btn_icon" src="icons/delete_dark.svg" alt="delete">
                </td>            
                `;
            subscribeElement(element);
            this.parent.append(element);
        }
    }

    function getNoteIdFromElement(element) {
        return Number(element.getAttribute('data-noteId'));
    }

    function subscribeElement(element) {
        const btnEdit = element.querySelector("#edit"),
            btnArchive = element.querySelector("#archive"),
            btnDelete = element.querySelector("#delete");

        btnEdit.addEventListener('click', (e) => {
            const noteId = getNoteIdFromElement(e.target);
            openModalForNote(noteById[noteId]);
        });

        btnDelete.addEventListener('click', (e) => {
            const noteId = getNoteIdFromElement(e.target);
            deleteNoteFromServer(noteId);
        })
    }

    function deleteNoteFromServer(noteId) {
        deleteData(urlNotes + `/${noteId}`)
            .then(data => {
                console.log(data);
                showThanksModal(message.successDelete);
            })
            .catch(() => {
                showThanksModal(message.failure);
            });
    }

    function formatString(string) {
        if (string.length < maxLength)
            return string;

        string = string.substring(0, maxLength);
        string += '...';
        return string;
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function parseDate(ms) {
        const date = new Date(ms);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${getZero(day)}.${getZero(month)}.${getZero(year)}`;
    }

    function parseDates(datesArray) {
        if (!datesArray || datesArray.length == 0)
            return [];

        if (datesArray.length == 1)
            return parseDate(datesArray[0]);

        return datesArray.reduce((result, current) =>
            `${typeof (result) === 'number' ? parseDate(result) : result}, ${parseDate(current)}`);
    }

    function getCategoryName(categoryType) {
        if (!categoryTitleByValue[categoryType])
            return "Not recognized";

        return categoryTitleByValue[categoryType];
    }

    getResource('http://localhost:3000/notes')
        .then(data => {
            data.forEach((item) => {
                noteById[item.id] = item;

                if (!item.isArchived)
                    new NoteItem(item.id, item.name, item.created, item.category, item.content, item.dates, "#table_notes").render();
            });
        });

}

export default notes;