import { connect } from "react-redux";
import { Component } from "react";
import { bindActionCreators } from "redux";
import { deleteData, editData } from "../../services/services";
import * as actions from "../../actions";
import NoteListItem from "../notes-list-item/notes-list-item";

import './notes-list.css';

const urlNotes = 'http://localhost:3000/notes';

class NotesList extends Component {

    deleteItem = (id) => {
        deleteData(urlNotes + `/${id}`)
            .then(() => this.props.del(id))
            .catch(() => this.props.showAlert('cannot delete'));
    }

    archiveItem = (item) => {
        const updatedItem = {
            ...item,
            isArchived: true
        }

        editData(urlNotes + `/${updatedItem.id}`, JSON.stringify(updatedItem))
            .then(() => this.props.update(updatedItem))
            .catch(() => this.props.showAlert('cannot archive'));
    }

    viewItem = (item) => {
        this.props.showModal(item);
    }

    render() {

        const { data } = this.props;

        const elements = data.filter(elem => !elem.isArchived).map(item => {

            const { id, ...itemProps } = item;
            return (
                <NoteListItem
                    key={id}
                    {...itemProps}
                    onDelete={() => this.deleteItem(id)}
                    onArchive={() => this.archiveItem(item)}
                    onEdit={() => this.viewItem(item)} />
            )
        })

        return (
            <nav>
                <ul className="app-list list-group">
                    {elements}
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.items
    }
}

const mapDispatchToProps = (dispatch) => {
    const { del, update, showAlert, showModal } = bindActionCreators(actions, dispatch);
    return {
        del,
        update,
        showAlert, 
        showModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);