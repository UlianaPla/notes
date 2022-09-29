import { Component } from 'react';
import { getData, postData, deleteData } from '../../services/services';
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

    onNoteSubmited = (name, category, content) => {
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

    render() {
        const { dataisLoaded} = this.props;

        if (!dataisLoaded)
            return <div> <h1> Pleses wait some time.... </h1> </div>;

        return (
            <div className="app">
                <NoteListHeader />
                <NotesList />
                <CreateNoteBtn />
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