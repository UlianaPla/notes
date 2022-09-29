import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './note-create-btn.css';


class CreateNoteBtn extends Component {
    render() {
        return (
            <div>
                <button data-modal className="btn btn-outline-dark" onClick={this.props.showModal}>Create Note</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal
    }
}
export default connect(mapStateToProps, actions)(CreateNoteBtn);