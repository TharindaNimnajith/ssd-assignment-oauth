import React, {Component} from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {AppContext} from '../../global/AppContext'
import {TITLE, UPLOADED} from '../../const/const'
import {GOOGLE_DRIVE_API} from '../../util/util'
import {Loader} from '../loader/Loader'
import SingleItem from '../single-item/SingleItem'

export default class ItemList extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      show: false
    }
  }

  // Function to upload the report to the Google Drive using the access token
  handleUpload = items => {
    this.setState({
      loading: true
    })
    const date = new Date()
    const currentDate = date.toISOString().split('T')[0]
    let fileContent = TITLE + ' - ' + currentDate + '\n\n'
    for (let item of items) {
      let status = 'Not Completed'
      if (item.completed)
        status = 'Completed'
      let temp = item.title + ' - ' + status + '\n'
      fileContent = fileContent.concat(temp)
    }
    const file = new Blob([fileContent], {
      type: 'text/plain'
    })
    const metadata = {
      'name': TITLE + ' - ' + currentDate,
      'mimeType': 'text/plain'
    }
    const accessToken = this.context.loginData.tokenObj.access_token
    const form = new FormData()
    form.append('metadata', new Blob([JSON.stringify(metadata)], {
      type: 'application/json'
    }))
    form.append('file', file)
    fetch(GOOGLE_DRIVE_API, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      }),
      body: form
    }).then(res => {
      return res.json()
    }).then(() => {
      this.setState({
        loading: false,
        show: true
      })
    })
  }

  toggle = () => {
    this.setState({
      show: false
    })
  }

  render() {
    const {
      items,
      itemsToShow,
      clearList,
      handleDelete,
      handleEdit,
      handleDoneTask,
      handleDeleteDoneTasks,
      updateTodosToShow
    } = this.props

    return (
      <div className='mt-4'>
        <Modal isOpen={this.state.show}>
          <ModalHeader>
            Success
          </ModalHeader>
          <ModalBody>
            {UPLOADED}
          </ModalBody>
          <ModalFooter>
            <Button color='primary'
                    onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <button type='button'
                className='text-uppercase font-weight-bold btn btn-info btn-block py-2 mt-1 mb-3 shadow-none w-100'
                onClick={() => this.handleUpload(items)}>
          <i className='fab fa-google-drive'/>
          &nbsp;
          Upload Task List to My Google Drive
        </button>
        <div className='row'>
          <div className='col-md-4'>
            {
              itemsToShow === 'all' ? (
                <button type='button'
                        className='text-uppercase btn btn-warning btn-block mt-1 shadow-none w-100'
                        onClick={() => updateTodosToShow('all')}>
                  All Tasks
                </button>
              ) : (
                <button type='button'
                        className='text-uppercase btn btn-secondary btn-block mt-1 shadow-none w-100'
                        onClick={() => updateTodosToShow('all')}>
                  All Tasks
                </button>
              )
            }
          </div>
          <div className='col-md-4'>
            {
              itemsToShow === 'todo' ? (
                <button type='button'
                        className='text-uppercase btn btn-warning btn-block mt-1 shadow-none w-100'
                        onClick={() => updateTodosToShow('todo')}>
                  Remaining Tasks
                </button>
              ) : (
                <button type='button'
                        className='text-uppercase btn btn-secondary btn-block mt-1 shadow-none w-100'
                        onClick={() => updateTodosToShow('todo')}>
                  Remaining Tasks
                </button>
              )
            }
          </div>
          <div className='col-md-4'>
            {
              itemsToShow === 'done' ? (
                <button type='button'
                        className='text-uppercase btn btn-warning btn-block mt-1 shadow-none w-100'
                        onClick={() => updateTodosToShow('done')}>
                  Completed Tasks
                </button>
              ) : (
                <button type='button'
                        className='text-uppercase btn btn-secondary btn-block mt-1 shadow-none w-100'
                        onClick={() => updateTodosToShow('done')}>
                  Completed Tasks
                </button>
              )
            }
          </div>
        </div>
        {
          items.length === 0 ? (
            <div className='text-center'>
              <label className='my-5 h1 text-white'>
                Your task list is empty. Add some daily tasks!
              </label>
            </div>
          ) : (
            <ul className='list-group my-4'>
              {
                items.map(item => {
                  return (
                    <SingleItem key={item.id}
                                id={item.id}
                                title={item.title}
                                completed={item.completed}
                                handleDelete={() => handleDelete(item.id)}
                                handleEdit={() => handleEdit(item.id)}
                                handleDoneTask={handleDoneTask}/>
                  )
                })
              }
              <div className='row mt-4'>
                <div className='col-md-6'>
                  <button type='button'
                          className='text-uppercase btn btn-danger btn-block shadow-none w-100'
                          onClick={handleDeleteDoneTasks}>
                    Delete Completed Tasks
                  </button>
                </div>
                <div className='col-md-6'>
                  <button type='button'
                          className='text-uppercase btn btn-danger btn-block shadow-none w-100'
                          onClick={clearList}>
                    Delete All Tasks
                  </button>
                </div>
              </div>
            </ul>
          )
        }
        {
          this.state.loading && (
            <Loader/>
          )
        }
      </div>
    )
  }
}
