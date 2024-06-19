import { Component } from 'react';
import './employees-list-item.css';

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isIncrease: false,
            rise: false
        }
    }

    onIncrease = () => {
        this.setState(({isIncrease}) => ({
            isIncrease : !isIncrease
        }));
    }

    onRise = () => {
        this.setState(({rise}) => ({
            rise: !rise
        }))
    }

    render() {
        const {name, salary} = this.props;
        const {isIncrease, rise} = this.state;
        
        let classNames = "list-group-item d-flex justify-content-between";
        if (isIncrease) {
            classNames += " increase"
        }

        if (rise) {
            classNames += " like";
        }

    
        return (
            <li className={classNames}>
                <span onClick={this.onRise} className="list-group-item-label">{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={salary + "$"}/>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button" 
                            className="btn-cookie btn-sm"
                            onClick={this.onIncrease}>
                            <i className="fas fa-cookie"></i>
                    </button>
    
                    <button type="button" 
                            className="btn-trash btn-sm">
                            <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }
}

export default EmployeesListItem;