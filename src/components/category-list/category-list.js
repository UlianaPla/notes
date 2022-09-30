import { connect } from "react-redux";
import { Component } from "react";
import CategoryItem from "../category-list-item/category-list-item";

import './category-list.css';

class CategoryList extends Component {

    render() {

        const { notesByCategory } = this.props;

        let elements = [];
        for (const [key, value] of Object.entries(notesByCategory)) {
            elements.push(
                <CategoryItem
                    key={key}
                    {...value} />
            );
        }

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
        notesByCategory: state.notesByCategory
    }
}

export default connect(mapStateToProps)(CategoryList);