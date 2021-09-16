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
          <div class='row'>
            <div className='col-10'>
              <input type='text'
                className='form-control shadow-none'
                placeholder='New Task'
                value={item}
                onChange={handleChange} />
            </div>
            <div className='col-2'>
              <button type='submit'
                className={`btn btn-block shadow-none ${editItem ? 'btn-success' : 'btn-info'}`}>
                {
                  editItem ? 'Edit' : 'Add'
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
