import React, {Component} from 'react'
import SingleItem from './SingleItem'

export default class ItemList extends Component {
  render() {
    const {
      items,
      clearList,
      handleDelete,
      handleEdit,
      handleDoneTask,
      handleDeleteDoneTasks,
      updateTodosToShow
    } = this.props
    return (
      <div className='mt-4'>
        <div className='row'>
          <div className='col-md-4'>
            <button type='button'
                    className='btn btn-primary btn-block mt-1 shadow-none'
                    onClick={() => updateTodosToShow('all')}>
              All Tasks
            </button>
          </div>
          <div className='col-md-4'>
            <button type='button'
                    className='btn btn-primary btn-block mt-1 shadow-none'
                    onClick={() => updateTodosToShow('done')}>
              Completed Tasks
            </button>
          </div>
          <div className='col-md-4'>
            <button type='button'
                    className='btn btn-primary btn-block mt-1 shadow-none'
                    onClick={() => updateTodosToShow('todo')}>
              Remaining Tasks
            </button>
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
                          className='btn btn-danger btn-block shadow-none'
                          onClick={handleDeleteDoneTasks}>
                    Delete Completed Tasks
                  </button>
                </div>
                <div className='col-md-6'>
                  <button type='button'
                          className='btn btn-danger btn-block shadow-none'
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
