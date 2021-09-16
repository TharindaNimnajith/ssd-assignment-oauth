import React, {Component} from 'react'

export default class ProfileView extends Component {
    render() {
        return (
            <div className='card card-body my-3'>
                <div className='row'>
                    <div className='col-1'>
                        <img src="todo_icon.ico" className="rounded" alt="Cinque Terre" width='50px' height='50px'/>
                    </div>
                    <div className='col-9 text-xl-left justify-content-center align-self-center'>
                        Hello, Janith Perera!
                    </div>
                    <div className='col-2'>
                        <button type='button'
                                className='text-uppercase btn btn-block shadow-none btn-primary'>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}