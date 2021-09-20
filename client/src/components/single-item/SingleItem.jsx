import React, {Component} from 'react'

export default class SingleItem extends Component {
  render() {
    const {
      id,
      title,
      handleDelete,
      handleEdit,
      handleDoneTask,
      completed
    } = this.props

    return (
      <li className='list-group-item d-flex justify-content-between my-2 rounded'>
        <h6 className={`col-9 ${completed ? 'completed-task' : ''}`}>
          {title}
        </h6>
        <div>
          <span className={`mx-2 ${completed ? 'text-success' : 'text-secondary'}`}
                onClick={() => handleDoneTask(id)}>
            <i className={`${completed ? 'far fa-check-square' : 'far fa-square'}`}/>
          </span>
          <span className='mx-2 text-warning'
                onClick={handleEdit}>
            <i className='fas fa-pen'/>
          </span>
          <span className='mx-2 text-danger'
                onClick={handleDelete}>
            <i className='fas fa-trash'/>
          </span>
        </div>
      </li>
    )
  }
}
