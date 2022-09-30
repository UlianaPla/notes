import { Component } from 'react';
import './title.css';

class Title extends Component {
    render() {
        const { text } = this.props;
        return (
            <div className='title'>
                <h3>{text}</h3>
            </div>
        );
    }
}
export default Title;