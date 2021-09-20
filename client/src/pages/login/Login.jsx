import React, {Component} from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {CLIENT_ID, SCOPES} from '../../util/util'
import {USER_API} from '../../common/common'
import {LOCAL_STORAGE_KEY} from '../../config/config'
import {ERROR, TITLE} from '../../const/const'
import {AppContext} from '../../global/AppContext'
import {setLocalStorageItem} from '../../helpers/helpers'
import {Loader} from '../../components/loader/Loader'
import background from '../../images/background.jpg'

export default class Login extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: '',
      showError: false
    }
  }

  // Redirect the user to the home page upon successful authorization from Google Sign in.
  // The OAuth 2.0 authorization framework is a protocol that allows a user to grant
  // a third-party web site or application access to the user's protected resources,
  // without necessarily revealing their long-term credentials or even their identity.
  // Used grant type: Authorization Code grant type
  // Authorization Code grant type is used by web apps to get an access token after a user
  // authorizes an app to access the authorized resources from the resource server.
  // OAuth 2.0 scope https://www.googleapis.com/auth/drive is used for Google APIs which
  // allows to view, edit, create, and delete all of the user's Google Drive files.
  loginSuccess = response => {
    this.setState({
      error: '',
      showError: false,
      loading: true,
      modal: false
    })
    const data = {
      'tokenType': response.tokenObj.token_type,
      'accessToken': response.tokenObj.access_token,
      'scope': response.tokenObj.scope,
      'loginHint': response.tokenObj.login_hint,
      'idToken': response.tokenObj.id_token,
      'idpId': response.tokenObj.idpId,
      'expiresIn': response.tokenObj.expires_in,
      'firstIssuedAt': response.tokenObj.first_issued_at,
      'expiresAt': response.tokenObj.expires_at,
      'googleId': response.profileObj.googleId,
      'imageUrl': response.profileObj.imageUrl,
      'email': response.profileObj.email,
      'name': response.profileObj.name,
      'givenName': response.profileObj.givenName,
      'familyName': response.profileObj.familyName
    }
    axios.post(USER_API, data).then(res => {
      if (res.data.status === 201) {
        this.context.login(response)
        setLocalStorageItem(LOCAL_STORAGE_KEY, response).then(() => {
        })
        this.props.history.push('/home')
      }
      this.setState({
        loading: false
      })
    }).catch(error => {
      this.setState({
        error: ERROR,
        showError: true,
        loading: false
      })
      console.error(error)
    })
  }

  loginFailure = response => {
    console.error('Login Failed')
    console.error(response)
  }

  toggle = () => {
    this.setState({
      showError: false
    })
  }

  render() {
    return (
      <div className='text-center d-flex h-100'
           style={{
             backgroundImage: `url(${background})`,
             width: '100vw',
             minHeight: '100vh',
             backgroundPosition: 'center',
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat'
           }}>
        <Modal isOpen={this.state.showError}>
          <ModalHeader>
            ERROR
          </ModalHeader>
          <ModalBody>
            {this.state.error}
          </ModalBody>
          <ModalFooter>
            <Button color='primary px-5'
                    onClick={this.toggle}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
        <div className='container align-self-center rounded py-5'
             style={{
               backgroundColor: 'rgba(0, 0, 0, 0.6)',
               minHeight: '60vh',
               width: '50vw'
             }}>
          <h1 className='text-uppercase mb-4 text-light font-weight-bold pb-4'
              style={{
                letterSpacing: '2px'
              }}>
            {TITLE}
          </h1>
          <div>
            <img src='todo_icon.ico'
                 alt='Logo Icon'
                 className='rounded'
                 width='170px'
                 height='170px'/>
          </div>
          <h3 className='text-uppercase mb-4 text-light font-weight-bold mt-4 pt-5'
              style={{
                letterSpacing: '2px'
              }}>
            Sign in with Google
          </h3>
          <div className='d-flex justify-content-center py-2'>
            <GoogleLogin clientId={CLIENT_ID}
                         buttonText='Sign in with Google'
                         className='px-2'
                         scope={SCOPES}
                         onSuccess={this.loginSuccess}
                         onFailure={this.loginFailure}
                         cookiePolicy='single_host_origin'
                         responseType='permission'
                         accessType='online'
                         loginHint='Sign in with Google'
                         tag='button'
                         type='button'
                         autoLoad={false}
                         fetchBasicProfile={true}
                         disabled={false}
                         uxMode='popup'
                         theme='light'
                         icon={true}
                         isSignedIn={false}/>
          </div>
          {
            this.state.loading && (
              <Loader/>
            )
          }
        </div>
      </div>
    )
  }
}
