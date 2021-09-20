import React, {Component} from 'react'

export default class AddItem extends Component {
  render() {
    const {
      item,
      handleChange,
      handleSubmit,
      editItem
    } = this.props

    return (
      <div className='card card-body my-3'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-10'>
              <input type='text'
                     className='form-control shadow-none'
                     placeholder='Add New Task'
                     value={item}
                     onChange={handleChange}/>
            </div>
            <div className='col-2'>
              {
                editItem ? (
                  <button type='submit'
                          className='text-uppercase btn btn-block shadow-none btn-success w-100'>
                    Edit
                  </button>
                ) : (
                  <button type='submit'
                          className='text-uppercase btn btn-block shadow-none btn-primary w-100'>
                    Add
                  </button>
                )
              }
            </div>
          </div>
        </form>
      </div>
    )
  }
}
