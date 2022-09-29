import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import './notes-alert.css';

class NotesAlert extends Component {
    
    render() {
        const { alertText, needShow } = this.props;

        let classes = "modal";

        if (needShow) {
            classes += ' show';
            setTimeout(this.props.hideAlert, 500);
        }
        else {
            classes += ' hide';
        }

        return (
            <div className={classes}>
                <div className="modal__dialog">
                    <div className="modal__content">
                        <div data-close className="modal__close">×</div>
                        <div className="modal__title">{alertText}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        alertText: state.alertText,
        needShow: state.needShowAlert
    }
}
const mapDispatchToProps = (dispatch) => {
    const { showAlert, hideAlert } = bindActionCreators(actions, dispatch);
    return {
        showAlert,
        hideAlert
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesAlert);