import { Component } from 'react';
import { getCategoryName } from '../../services/formatter';

import './category-list-item.css';

class CategoryItem extends Component {

    render() {
        const { category, activeCount, archivedCount } = this.props;

        const categoryName = getCategoryName(category);

        return (
            <li className="list-group-item d-flex justify-content-between">
                <span className="list-group-item-label name" >{categoryName}</span>
                <span className="list-group-item-label long" >{activeCount}</span>
                <span className="list-group-item-label long" >{archivedCount}</span>
            </li>
        )
    }
}

export default CategoryItem;