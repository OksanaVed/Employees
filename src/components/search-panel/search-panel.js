import { Component } from 'react/cjs/react.production.min';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            term: ''
        }
    }

    onUpdateSerch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSerch(term);
    }
    
    render() {
        return (
            <input type="text"
                    className="form-control search-input"
                    placeholder="Знайти співробітника"
                    value={this.state.term}
                    onChange={this.onUpdateSerch}/>
        )
    }
    
}

export default SearchPanel;