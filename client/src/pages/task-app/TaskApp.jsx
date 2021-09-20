import React, {Component} from 'react'
import {v1 as uuid} from 'uuid'
import axios from 'axios'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {USER_API} from '../../common/common'
import {ERROR, TITLE} from '../../const/const'
import {AppContext} from '../../global/AppContext'
import {Loader} from '../../components/loader/Loader'
import AddItem from '../../components/add-item/AddItem'
import ItemList from '../../components/item-list/ItemList'
import Profile from '../../components/profile/Profile'
import background from '../../images/background.jpg'

export default class TaskApp extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: '',
      showError: false,
      items: [],
      itemsToShow: 'all',
      id: uuid(),
      item: '',
      editItem: false
    }
  }

  componentDidMount() {
    this.getTaskList()
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
    const updatedItems = [
      ...this.state.items,
      newItem
    ]
    if (this.state.item.length > 0)
      this.setState({
        items: updatedItems,
        id: uuid(),
        item: '',
        editItem: false
      })
    this.updateTaskList(updatedItems)
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
      items: filteredItems
    })
    this.updateTaskList(filteredItems)
  }

  handleDelete = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id)
    this.setState({
      items: filteredItems
    })
    this.updateTaskList(filteredItems)
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
    this.updateTaskList(filteredItems)
  }

  handleDeleteDoneTasks = () => {
    const filteredItems = this.state.items.filter(item => item.completed === false)
    this.setState({
      items: filteredItems
    })
    this.updateTaskList(filteredItems)
  }

  clearList = () => {
    this.setState({
      items: []
    })
    this.updateTaskList([])
  }

  getTaskList = () => {
    this.setState({
      error: '',
      showError: false,
      loading: true
    })
    axios.get(`${USER_API}${this.context.loginData.profileObj.googleId}`).then(res => {
      if (res.data.status === 200) {
        this.setState({
          items: res.data.taskArray,
          loading: false
        })
      }
    }).catch(error => {
      this.setState({
        error: ERROR,
        showError: true,
        loading: false
      })
      console.error(error)
    })
  }

  updateTaskList = items => {
    this.setState({
      error: '',
      showError: false,
      loading: true
    })
    const data = {
      'taskArray': items
    }
    axios.put(`${USER_API}${this.context.loginData.profileObj.googleId}`, data).then(res => {
      if (res.data.status === 201) {
        this.setState({
          loading: false
        })
      }
    }).catch(error => {
      this.setState({
        error: ERROR,
        showError: true,
        loading: false
      })
      console.error(error)
    })
  }

  toggle = () => {
    this.setState({
      showError: false
    })
  }

  render() {
    let items = []

    if (this.state.itemsToShow === 'all')
      items = this.state.items
    else if (this.state.itemsToShow === 'todo')
      items = this.state.items.filter(item => !item.completed)
    else if (this.state.itemsToShow === 'done')
      items = this.state.items.filter(item => item.completed)

    return (
      <div style={{
        backgroundImage: `url(${background})`,
        width: '100vw',
        minHeight: '100vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <Modal isOpen={this.state.showError}>
          <ModalHeader>
            ERROR
          </ModalHeader>
          <ModalBody>
            {this.state.error}
          </ModalBody>
          <ModalFooter>
            <Button color='primary'
                    onClick={this.toggle}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
        <div className='container py-2'
             style={{
               backgroundColor: 'rgba(0, 0, 0, 0.45)',
               minHeight: '100vh'
             }}>
          <Profile/>
          <div className='row'>
            <div className='col-10 col-md-8 mx-auto mt-4'>
              <h2 className='text-uppercase text-center mb-4 text-light font-weight-bold'
                  style={{
                    letterSpacing: '2px'
                  }}>
                {TITLE}
              </h2>
              <AddItem item={this.state.item}
                       editItem={this.state.editItem}
                       handleChange={this.handleChange}
                       handleSubmit={this.handleSubmit}/>
              <ItemList items={items}
                        itemsToShow={this.state.itemsToShow}
                        clearList={this.clearList}
                        handleDelete={this.handleDelete}
                        handleEdit={this.handleEdit}
                        handleDoneTask={this.handleDoneTask}
                        handleDeleteDoneTasks={this.handleDeleteDoneTasks}
                        updateTodosToShow={this.updateTodosToShow}/>
            </div>
          </div>
          {
            this.state.loading && (
              <Loader/>
            )
          }
        </div>
      </div>
    )
  }
}
