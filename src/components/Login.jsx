import React, {Component} from 'react'
import background from '../images/background.jpg'

export default class Login extends Component {
  render() {
    return (
      <div style={{
        backgroundImage: `url(${background})`,
        width: '100vw',
        minHeight: '100vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <br/><br/>
        <div className='container py-2'
             style={{
               backgroundColor: 'rgba(0, 0, 0, 0.45)',
               minHeight: '90vh'
             }}>
          <div className='column'>
            <img src="todo_icon.ico" className="rounded" width='100px' height='100px' style={{
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center"
            }}/>
            <h3>Personal Task Manager</h3>
            <h3>Sign In</h3>
            <button type='button'
                    className='text-uppercase btn btn-primary btn-block mt-4 shadow-none'>
              <i className="fab fa-google"></i>{" "}
              Sign In With Google
            </button>
          </div>

        </div>
        <br/>
      </div>
    )
  }
}
