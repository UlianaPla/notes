import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import './notes-add-form.css';

class NotesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: 'task',
            content: '', 
            isDefault:true
        }
    }

    onValueChange = (e) => {
        console.log('onChanged');
        this.setState({
            [e.target.name]: e.target.value,
            isDefault:false
        })
    }

    /*
    onItemCommit = (item) => {
        this.setState({
            name: item.name,
            category: item.category,
            content: item.content,
            item: item
        })
    }
*/

    onSubmited = (e) => {
        e.preventDefault();

        this.props.onSubmited(this.state.name, this.state.category, this.state.content, this.props.item);
        this.setState({
            name: '',
            category: '',
            content: '',
            item: this.props.item
        })
    }

    render() {
        let { name, category, content , isDefault} = this.state;
        const { needShow, item, hideModal } = this.props;
        let classes = "modal";

        if (needShow)
            classes += ' show';
        else
            classes += ' hide';

        if (item && isDefault) {
            name = item.name;
            category = item.category;
            content = item.content;
        }

        return (
            <div className={classes}>
                <div className="modal__dialog">
                    <div className="modal__content">
                        <form onSubmit={this.onSubmited}>
                            <div data-close className="modal__close" onClick={hideModal}>&times;</div>
                            <div className="modal__title">{item ? "Edit note" : "Fill the fields"}</div>

                            <input required placeholder="Note name" name="name" type="text" className="modal__input"
                                value={name}
                                onChange={this.onValueChange} />

                            <select id="noteTypes" name="category" className="modal__select"
                                value={category}
                                onChange={this.onValueChange}>

                                <option value="task" >Task</option>
                                <option value="random">Random Thought</option>
                                <option value="idea">Idea</option>
                            </select>

                            <input required placeholder="Note content" name="content" type="text" className="modal__input"
                                value={content}
                                onChange={this.onValueChange} />

                            <button className="btn btn-dark" type="submit">{item ? "Save" : "Create"}</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        needShow: state.modalInfo.needShowModal,
        item: state.modalInfo.item
    }
}

const mapDispatchToProps = (dispatch) => {
    const { hideModal } = bindActionCreators(actions, dispatch);
    return {
        hideModal
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NotesAddForm);