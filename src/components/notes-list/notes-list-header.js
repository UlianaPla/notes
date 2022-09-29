import { Component } from 'react';

import './notes-list.css';

class NoteListHeader extends Component {
    render() {
        const { archived } = this.props;

        let classesArchive = "btn-archive btn-sm ";
        let classesUnarchive = "btn-unarchive btn-sm ";
        let classesEdit = "btn-pencil btn-sm "

        if (archived) {
            classesArchive += "hide";
            classesUnarchive += "show";
            classesEdit += "hide";
        }
        else {
            classesArchive += "show";
            classesUnarchive += "hide";
            classesEdit += "show";
        }

        return (
            <div className="list-header d-flex justify-content-between">
                <span className="list-header-label name" >Name</span>
                <span className="list-header-label short" >Created</span>
                <span className="list-header-label short" >Category</span>
                <span className="list-header-label long" >Content</span>
                <span className="list-header-label short" >Dates</span>

                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button" disabled={true}
                        className={classesEdit}>
                        <i className="fa-solid fa-pencil"></i>
                    </button>

                    <button type="button" disabled={true}
                        className="btn-trash btn-sm " >
                        <i className="fas fa-trash"></i>
                    </button>

                    <button type="button" disabled={true}
                        className={classesArchive}>
                        <i className="fa-solid fa-box-archive"></i>
                    </button>

                    <button type="button" disabled={true}
                        className={classesUnarchive}>
                        <i className="fa-solid fa-box-archive"></i>
                    </button>
                </div>
            </div >
        )
    }
}

export default NoteListHeader;