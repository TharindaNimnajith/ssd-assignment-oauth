import React, {Component} from 'react'

export default class ProfileView extends Component{
    render() {
        return <div className='card card-body my-3'>
            <div className='row'>
                <div className='col-10'>
                    <text>Janith Perera</text>
                </div>
                <div className='col-2'>
                    <button type='button' className='text-uppercase btn btn-block shadow-none btn-primary'>Logout</button>
                </div>
            </div>
        </div>;
    }
}