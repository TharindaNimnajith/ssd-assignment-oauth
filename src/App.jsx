import React, {Component} from 'react'
import uuid from 'uuid'
import AddItem from './components/AddItem'
import ItemList from './components/ItemList'
import background from './images/background.jpg'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      itemsToShow: 'all',
      id: uuid(),
      item: '',
      editItem: false
    }
  }

  handleChange = event => {
    this.setState({
      item: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const newItem = {
      id: this.state.id,
      title: this.state.item,
      completed: false
    }
    const updatedItems = [...this.state.items, newItem]
    if (this.state.item.length > 0)
      this.setState({
        items: updatedItems,
        id: uuid(),
        item: '',
        editItem: false
      })
  }

  updateTodosToShow = string => {
    this.setState({
      itemsToShow: string
    })
  }

  handleDoneTask = id => {
    const filteredItems = this.state.items.map(item => {
      item.id === id && (item.completed = !item.completed)
      return item
    })
    this.setState({
      items: filteredItems,
    })
  }

  handleDelete = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id)
    this.setState({
      items: filteredItems
    })
  }

  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id)
    const selectedItem = this.state.items.find(item => item.id === id)
    this.setState({
      items: filteredItems,
      id: id,
      item: selectedItem.title,
      editItem: true
    })
  }

  handleDeleteDoneTasks = () => {
    const filteredItems = this.state.items.filter(item => item.completed === false)
    this.setState({
      items: filteredItems
    })
  }

  clearList = () => {
    this.setState({
      items: []
    })
  }

  render() {
    let items = []
    if (this.state.itemsToShow === 'all') {
      items = this.state.items
    } else if (this.state.itemsToShow === 'todo') {
      items = this.state.items.filter(item => !item.completed)
    } else if (this.state.itemsToShow === 'done') {
      items = this.state.items.filter(item => item.completed)
    }
    return (
      <div style={{ backgroundImage: `url(${background})` }}>
        <div className='container'>
          <div className='row'>
            <div className='col-10 col-md-8 mx-auto mt-4'>
              <h3 className='text-capitalize text-center mb-4 text-dark font-weight-bold'>
                Personal Task Manager
              </h3>
              <AddItem item={this.state.item}
                editItem={this.state.editItem}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} />
              <ItemList items={items}
                clearList={this.clearList}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                handleDoneTask={this.handleDoneTask}
                handleDeleteDoneTasks={this.handleDeleteDoneTasks}
                updateTodosToShow={this.updateTodosToShow} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
