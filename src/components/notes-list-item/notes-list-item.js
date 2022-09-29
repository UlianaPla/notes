import { Component } from 'react';
import { formatString, parseDate, parseDates, getCategoryName } from '../../services/formatter';

import './notes-list-item.css';

class NoteListItem extends Component {

    render() {
        const { name, created, category, content, dates, onDelete, onArchive } = this.props;

        const nameFormatted = formatString(name),
            createdAsString = parseDate(created),
            categoryName = getCategoryName(category),
            contentFormatted = formatString(content),
            datesAsString = parseDates(dates);

        return (
            <li className="list-group-item d-flex justify-content-between">
                <span className="list-group-item-label name" >{nameFormatted}</span>
                <span className="list-group-item-label short" >{createdAsString}</span>
                <span className="list-group-item-label short" >{categoryName}</span>
                <span className="list-group-item-label long" >{contentFormatted}</span>
                <span className="list-group-item-label short" >{datesAsString}</span>

                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-pencil btn-sm ">
                        <i className="fa-solid fa-pencil"></i>
                    </button>

                    <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>

                    <button type="button"
                        className="btn-archive btn-sm " 
                        onClick={onArchive}>
                        <i className="fa-solid fa-box-archive"></i>
                    </button>
                </div>
            </li>
        )
    }
}

export default NoteListItem;