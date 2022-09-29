import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../../actions";
import { formatString, parseDate, parseDates, getCategoryName } from '../../services/formatter';
import { deleteData } from "../../services/services";

import './notes-list-item.css';

const urlNotes = 'http://localhost:3000/notes';

class NoteListItem extends Component {

    deleteItem = () => {
        const {id} = this.props;

        deleteData(urlNotes + `/${id}`)
            .then(() => this.props.del(id))
            .catch(() => this.props.showAlert('cannot delete'));
    }

    render() {
        const { name, created, category, content, dates } = this.props;

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
                        onClick={this.deleteItem}>
                        <i className="fas fa-trash"></i>
                    </button>

                    <button type="button"
                        className="btn-archive btn-sm ">
                        <i className="fa-solid fa-box-archive"></i>
                    </button>
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    const { del } = bindActionCreators(actions, dispatch);
    return {
        del
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListItem);