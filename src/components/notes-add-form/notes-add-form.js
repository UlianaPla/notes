import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './notes-add-form.css';

class NotesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: 'task',
            content: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmited = (e) => {
        e.preventDefault();

        this.props.onSubmited(this.state.name, this.state.category, this.state.content);
        this.setState({
            name: '',
            category: '',
            content: ''
        })
    }

    render() {
        const { name, category, content } = this.state;
        const { needShow } = this.props;
        let classes = "modal";

        if (needShow)
            classes += ' show';
        else
            classes += ' hide';

        return (
            <div className={classes}>
                <div className="modal__dialog">
                    <div className="modal__content">
                        <form onSubmit={this.onSubmited}>
                            <div data-close className="modal__close" onClick={this.onClose}>&times;</div>
                            <div className="modal__title">Fill the fields</div>

                            <input required placeholder="Note name" name="name" type="text" className="modal__input"
                                text={name}
                                onChange={this.onValueChange} />

                            <select id="noteTypes" name="category" className="modal__select"
                                onChange={this.onValueChange} value={category}>

                                <option value="task" >Task</option>
                                <option value="random">Random Thought</option>
                                <option value="idea">Idea</option>
                            </select>

                            <input required placeholder="Note content" name="content" type="text" className="modal__input"
                                text={content}
                                onChange={this.onValueChange} />

                            <button className="btn btn-dark" type="submit">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        needShow: state.needShowModal
    }
}
export default connect(mapStateToProps, actions)(NotesAddForm);