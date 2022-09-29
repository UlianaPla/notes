import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import './note-create-btn.css';

class CreateNoteBtn extends Component {

    showCreateNoteForm = () => this.props.showModal();

    render() {
        return (
            <div>
                <button data-modal className="btn btn-outline-dark" onClick={this.showCreateNoteForm}>Create Note</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    const { showModal } = bindActionCreators(actions, dispatch);
    return {
        showModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNoteBtn);