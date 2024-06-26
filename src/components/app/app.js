import React from 'react';
import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {name: "Rakhymzhan", salary: 800, isIncrease: true, rise: false, id: 1},
                {name: "Omirzhan", salary: 3000, isIncrease: false, rise: false, id: 2},
                {name: "Zhanar", salary: 25000, isIncrease: false, rise: false, id: 3}
            ],
            term: '',
            filter: ''
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {

        this.setState(({data}) => {

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {

        if (!name || name.trim() === "") {
            alert("Name cannot be empty");
            return;
        }
    
        if (!salary || isNaN(salary) || salary <= 0) {
            alert("Salary must be a positive number");
            return;
        }
        
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term.toUpperCase()) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterEmp = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'over-1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onChangeSalary = (id, salary) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary }
                }
                return item;
            })
        }))
    }


    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length
        let increased = this.state.data.filter(item => item.rise).length;
        const visibleData = this.filterEmp(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo employees={employees}
                         increased={increased}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
                onChangeSalary={this.onChangeSalary}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;