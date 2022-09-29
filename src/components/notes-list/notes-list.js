import { connect } from "react-redux";
import { Component } from "react";
import NoteListItem from "../notes-list-item/notes-list-item";

import './notes-list.css';

class NotesList extends Component {

    render() {
        const { data } = this.props;

        const elements = data.map(item => {
            const { id } = item;
            return (
                <NoteListItem
                    key={id}
                    {...item} />
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

export default connect(mapStateToProps)(NotesList);