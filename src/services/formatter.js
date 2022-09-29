
const maxLength = 30,
    categoryTitleByValue = {
        task: 'Task',
        random: 'Random Thought',
        idea: 'Idea'
    };

const dateReg = /(0?[1-9]|[12][0-9]|3[01])[\/\/.](0?[1-9]|1[012])[\/\/.]\d{4}/g,
    dividerSlash = '/', // Note: if changing dividers -> change the regular expression
    dividerDot = '.';


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
    if (!datesArray || datesArray.length === 0)
        return [];

    if (datesArray.length === 1)
        return parseDate(datesArray[0]);

    return datesArray.reduce((result, current) =>
        `${typeof (result) === 'number' ? parseDate(result) : result}, ${parseDate(current)}`);
}

function getCategoryName(categoryType) {
    if (!categoryTitleByValue[categoryType])
        return "Not recognized";

    return categoryTitleByValue[categoryType];
}

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

export { formatString, parseDate, parseDates, getCategoryName, parseDatesFromContent };