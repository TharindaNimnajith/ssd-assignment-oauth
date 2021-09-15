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
                    className='btn btn-info btn-block mt-1'
                    onClick={() => updateTodosToShow('all')}>
              All
            </button>
          </div>
          <div className='col-md-4'>
            <button type='button'
                    className='btn btn-info btn-block mt-1'
                    onClick={() => updateTodosToShow('done')}>
              Completed
            </button>
          </div>
          <div className='col-md-4'>
            <button type='button'
                    className='btn btn-info btn-block mt-1'
                    onClick={() => updateTodosToShow('todo')}>
              Remaining
            </button>
          </div>
        </div>
        {
          items.length === 0 ? '' :
            <ul className='list-group my-5'>
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
                          className='btn btn-danger btn-block mt-1'
                          onClick={handleDeleteDoneTasks}>
                    Delete Completed Tasks
                  </button>
                </div>
                <div className='col-md-6'>
                  <button type='button'
                          className='btn btn-danger btn-block mt-1'
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
