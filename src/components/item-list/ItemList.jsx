import React, {Component} from 'react'
import {AppContext} from '../../global/AppContext'
import SingleItem from '../single-item/SingleItem'

export default class ItemList extends Component {
  static contextType = AppContext

  handleUpload = items => {
    const date = new Date()
    const currentDate = date.toISOString().split('T')[0]
    let fileContent = 'Personal Task Manager - Your Daily Tasks' + currentDate + '\n\n'
    for (let i = 0; i < items.length; i++) {
      let status = 'Not Completed'
      if (items[i].completed)
        status = 'Completed'
      let temp = items[i].title + ' - ' + status + '\n'
      fileContent = fileContent.concat(temp);

    }
    console.log(fileContent)
    // const file = new Blob([fileContent], {
    //   type: 'text/plain'
    // })
    // const metadata = {
    //   'name': 'Your Todo List - ' + currentDate,
    //   'mimeType': 'text/plain'
    // }
    // const accessToken = this.context.loginData.tokenObj.access_token
    // const form = new FormData()
    // form.append('metadata', new Blob([JSON.stringify(metadata)], {
    //   type: 'application/json'
    // }))
    // form.append('file', file)
    // fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
    //   method: 'POST',
    //   headers: new Headers({
    //     'Authorization': 'Bearer ' + accessToken
    //   }),
    //   body: form
    // }).then(res => {
    //   return res.json()
    // }).then(function (val) {
    //   alert('Your file has been uploaded to your Google Drive!')
    //   console.log(val)
    // })
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
        <button type='button'
                className='text-uppercase font-weight-bold btn btn-info btn-block py-2 mt-1 mb-3 shadow-none'
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
                        className='text-uppercase btn btn-warning btn-block mt-1 shadow-none'
                        onClick={() => updateTodosToShow('all')}>
                  All Tasks
                </button>
              ) : (
                <button type='button'
                        className='text-uppercase btn btn-secondary btn-block mt-1 shadow-none'
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
                        className='text-uppercase btn btn-warning btn-block mt-1 shadow-none'
                        onClick={() => updateTodosToShow('todo')}>
                  Remaining Tasks
                </button>
              ) : (
                <button type='button'
                        className='text-uppercase btn btn-secondary btn-block mt-1 shadow-none'
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
                        className='text-uppercase btn btn-warning btn-block mt-1 shadow-none'
                        onClick={() => updateTodosToShow('done')}>
                  Completed Tasks
                </button>
              ) : (
                <button type='button'
                        className='text-uppercase btn btn-secondary btn-block mt-1 shadow-none'
                        onClick={() => updateTodosToShow('done')}>
                  Completed Tasks
                </button>
              )
            }
          </div>
        </div>
        {
          items.length === 0 ? '' :
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
                          className='text-uppercase btn btn-danger btn-block shadow-none'
                          onClick={handleDeleteDoneTasks}>
                    Delete Completed Tasks
                  </button>
                </div>
                <div className='col-md-6'>
                  <button type='button'
                          className='text-uppercase btn btn-danger btn-block shadow-none'
                          onClick={clearList}>
                    Delete All Tasks
                  </button>
                </div>
              </div>
            </ul>
        }
      </div>
    )
  }
}
