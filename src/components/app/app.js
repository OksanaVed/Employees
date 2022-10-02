import { Component, useState } from 'react/cjs/react.production.min';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
// import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      data : [
        { name: 'Василь', salary: 800, increase: false, rise: false, id: 1},
        { name: 'Петро', salary: 1500, increase: false, rise: false, id: 2},
        { name: 'Коля', salary: 900, increase: false, rise: false, id: 3}
      ],
      term:'',
      filter:'all'
    }
    this.maxId = 4;
  }

  deleteItem =(id)=> {
    this.setState(({data})=>{
    
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }
 
  addItem = (name, salary) => {
    if (name.length >3) {
    if (name !== '' && salary !== '') {
      const newItem = {
        name: name,
        salary: salary,
        increase: false,
        rise: false,
        id: this.maxId++
      }
      this.setState(({data})=>{
          
          const newArr = [...data, newItem];
          return {
            data: newArr
          }
      });
    } else{
      alert('Заповніть, будь ласка, всі дані');
    }
  } else {
    alert('Імʼя має містити більше трьох літер');
  }

  }

  onToggleProp = (id, prop) => {
   
    this.setState(({data}) => ({
       data: data.map(item => {
        if(item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
       })
    }))
  }

  serchEmp = (items, term) => {
    if(term.length===0){
      return items
    }
    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }
 
  onUpdateSerch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item=> item.salary>1000);
      default:
          return items
      
    }
  }

  onFilterSelect = (filter) =>{
    this.setState({filter})

  }


  
  render(){
    const {data, term, filter} = this.state;
    const employees = data.length;
    const increased = data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.serchEmp(data, term), filter);

    return (
      <div className="app">
          <AppInfo  employees = {employees}
                    increased = {increased}/>
  
          <div className="search-panel">
              <SearchPanel onUpdateSerch={this.onUpdateSerch}/>
              <AppFilter filter={filter}
                         onFilterSelect={this.onFilterSelect}/>
          </div>
          {/* <Calendar/> */}
          <EmployeesList 
                      data={visibleData}
                      onDelete={this.deleteItem}
                      onToggleProp = {this.onToggleProp}/>
          <EmployeesAddForm
                      onAdd={this.addItem}/>
      </div>
    );
  }
  
}

export default App;
