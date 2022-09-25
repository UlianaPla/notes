import { getData, editData, deleteData } from "../services/services";
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

    let noteById = [],
        notesByCategory = {};

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

    class ArchivedNoteItem {
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
                    <img id="unarchive" data-noteId="${this.id}" class="btn_icon" src="icons/unarchive.svg" alt="unarchive">
                    <img id="delete" data-noteId="${this.id}" class="btn_icon" src="icons/delete_dark.svg" alt="delete">
                </td>            
                `;

            subscribeElement(element);
            this.parent.append(element);
        }
    }

    class CategoryItem {
        constructor(value, activeCount, archivedCount, parentSelector) {
            this.value = value;
            this.activeCount = activeCount;
            this.archivedCount = archivedCount;
            this.parent = document.querySelector(parentSelector);
        }
        render() {
            const element = document.createElement('tr');
            element.classList.add('note__item');

            const categoryName = getCategoryName(this.value);

            element.innerHTML = `               
                <td>${categoryName}</td>
                <td>${this.activeCount}</td>
                <td>${this.archivedCount}</td>         
                `;
            this.parent.append(element);
        }
        updateWithNote(note) {
            if (note.isArchived)
                this.archivedCount++;
            else
                this.activeCount++;
        }
    }

    function getNoteIdFromElement(element) {
        return Number(element.getAttribute('data-noteId'));
    }

    function subscribeElement(element) {
        const btnEdit = element.querySelector("#edit"),
            btnArchive = element.querySelector("#archive"),
            btnUnarchive = element.querySelector("#unarchive"),
            btnDelete = element.querySelector("#delete");

        if (btnEdit)
            btnEdit.addEventListener('click', (e) => {
                e.preventDefault();
                const noteId = getNoteIdFromElement(e.target);
                openModalForNote(noteById[noteId]);
            });

        if (btnArchive)
            btnArchive.addEventListener('click', (e) => {
                e.preventDefault();
                const noteId = getNoteIdFromElement(e.target);
                changeNoteArchivation(noteById[noteId], true);
            })

        if (btnUnarchive)
            btnUnarchive.addEventListener('click', (e) => {
                e.preventDefault();
                const noteId = getNoteIdFromElement(e.target);
                changeNoteArchivation(noteById[noteId], false);
            })

        if (btnDelete)
            btnDelete.addEventListener('click', (e) => {
                e.preventDefault();
                const noteId = getNoteIdFromElement(e.target);
                deleteNoteFromServer(noteId);
            })
    }

    function changeNoteArchivation(note, isArchived) {
        note.isArchived = isArchived;
        const json = JSON.stringify(note);
        console.log(json);

        editData(urlNotes + `/${note.id}`, json)
            .then(data => {
                console.log(data);
                showThanksModal(message.successArchive);
            })
            .catch(() => {
                showThanksModal(message.failure);
            });
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

    function updateSummary() {
        noteById.forEach((item) => {
            const categoryItem = notesByCategory[item.category];
            if (categoryItem)
                categoryItem.updateWithNote(item);
            else
                notesByCategory[item.category] = new CategoryItem(
                    item.category,
                    item.isArchived ? 0 : 1,
                    item.isArchived ? 1 : 0,
                    "#table_summary");
        });

        for (const [key, value] of Object.entries(notesByCategory)) {
            value.render();
        }
    }

    getData('http://localhost:3000/notes')
        .then(data => {
            data.forEach((item) => {
                noteById[item.id] = item;

                if (item.isArchived)
                    new ArchivedNoteItem(item.id, item.name, item.created, item.category, item.content, item.dates, "#table_archieved").render();
                else
                    new NoteItem(item.id, item.name, item.created, item.category, item.content, item.dates, "#table_notes").render();
            })

        })
        .then(updateSummary);

}

export default notes;