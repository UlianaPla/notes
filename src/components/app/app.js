import { Component } from 'react';
import { getData, postData, editData } from '../../services/services';
import { parseDatesFromContent } from '../../services/formatter';

import { connect } from "react-redux";
import * as actions from "../../actions";

import NoteListHeader from '../notes-list/notes-list-header';
import NotesList from '../notes-list/notes-list';
import NotesAddForm from '../notes-add-form/notes-add-form';
import CreateNoteBtn from '../note-create-btn/note-create-btn';
import NotesAlert from '../notes-alert/notes-alert';

import './app.css';

const urlNotes = 'http://localhost:3000/notes';

class App extends Component {

    componentDidMount() {
        getData(urlNotes)
            .then(this.props.loaded)
    }

    onNoteSubmited = (name, category, content, item) => {
        const isEditMode = item !== undefined;

        if (isEditMode) {
            const newItem = {
                ...item,
                name, category, content,
                dates: parseDatesFromContent(content)
            }
            editData(urlNotes + `/${newItem.id}`, JSON.stringify(newItem))
                .then(() => this.props.update(newItem))
                .catch(() => this.props.showAlert('oops, something went wrong'))
                .finally(this.props.hideModal);

        }
        else {
            const newItem = {
                name, category, content,
                created: Date.parse(new Date()),
                dates: parseDatesFromContent(content)
            }
            postData(urlNotes, JSON.stringify(newItem))
                .then(this.props.add)
                .catch(() => this.props.showAlert('oops, something went wrong'))
                .finally(this.props.hideModal);
        }
    }

    /**
     * Fill data from Form with needed data.
     * @returns Object of Note, that shoul be saved.
     */
    fillData = (data, isEditMode) => {
        let dataObj = Object.fromEntries(data);

        if (!isEditMode)
            dataObj.created = Date.parse(new Date());

        dataObj.dates = parseDatesFromContent(dataObj.content);

        return dataObj;
    }

    render() {
        const { dataisLoaded } = this.props;

        if (!dataisLoaded)
            return <div> <h1> Pleses wait some time.... </h1> </div>;

        return (
            <div className="app">
                <NoteListHeader archived={false} />
                <NotesList archived={false} />
                <CreateNoteBtn />
                <NoteListHeader archived={true} />
                <NotesList archived={true} />
                <NotesAddForm
                    onSubmited={this.onNoteSubmited} />

                <NotesAlert />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataisLoaded: state.dataisLoaded
    }
}

export default connect(mapStateToProps, actions)(App);