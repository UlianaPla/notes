import { Component } from 'react';

import './category-list.css';

class CategoryHeader extends Component {
    render() {

        return (
            <div className="list-header d-flex justify-content-between">
                <span className="list-group-item-label name" >Category name</span>
                <span className="list-group-item-label long" >Active count</span>
                <span className="list-group-item-label long" >Archived count</span>
            </div >
        )
    }
}

export default CategoryHeader;