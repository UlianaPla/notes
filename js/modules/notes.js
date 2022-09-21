import { getResource } from "../services/services";

function notes() {

    const maxLength = 30,
        categoryTitleByValue = {
            task: 'Task',
            random: 'Random Thought',
            idea: 'Idea'
        }
    // Используем классы для карточек
    class NoteItem {
        constructor(name, created, category, content, dates, parentSelector) {
            this.name = name;
            this.created = created;
            this.category = category;
            this.content = content;
            this.dates = dates;
            this.parent = document.querySelector(parentSelector);
        }

        // Формирует верстку
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
                    <img class="btn_icon" src="icons/edit.svg" alt="edit">
                    <img class="btn_icon" src="icons/archive_dark.svg" alt="archive">
                    <img class="btn_icon" src="icons/delete_dark.svg" alt="delete">
                </td>            
                `;
            this.parent.append(element);
        }
    }

    function formatString(string) {
        if (string.length < maxLength)
            return string;

        string = string.substring(0, maxLength);
        string += '...';
        return string;
    }

    function parseDate(ms) {
        const date = new Date(ms);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${getZero(day)}.${getZero(month)}.${getZero(year)}`;
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function parseDates(datesArray) {
        if (!datesArray || datesArray.length == 0)
            return [];

        if (datesArray.length == 1)
            return parseDate(datesArray[0]);

        return datesArray.reduce((result, current) => `${parseDate(result)}, ${parseDate(current)}`);
    }

    function getCategoryName(categoryType) {
        if (!categoryTitleByValue[categoryType])
            return "Not recognized";

        return categoryTitleByValue[categoryType];
    }

    getResource('http://localhost:3000/notes')
        .then(data => {
            // Используем деструктуризацию:
            data.forEach(({
                name,
                created,
                category,
                content,
                dates,
                isArchived
            }) => {
                if (!isArchived)
                    new NoteItem(name, created, category, content, dates, "#table_notes").render();
            });
        });
}

export default notes;