import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Navigation } from './navigation'
// import axios from 'axios';

export const Signin = (props) => {
  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
  // const [loginMessage, setLoginMessage] = useState()
  // const [err, setError]

  // function validateForm() {
  //   return username.length > 0 && password.length > 0;
  // }
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   alert(username)
  //   const user = {
  //     usrname : username,
  //     pwd : password
  //   };

  //   useEffect(

  //   )

  //   axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
  //     .then(res => {
  //       setLoginMessage(res)
        
  //     })
  // }

  return (
    <div>
    <Navigation />
    <header id='signup'>
      <div className='signup-background'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'V SCANNER'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Hệ thống cảnh báo điểm yếu và rà soát lỗ hổng bảo mật tự động'}</p>
                <a
                  href='#'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Đăng ký ngay
                </a>{' '}
              </div>
              <div className='col-xs-12 col-md-6 intro-signin'>
                <h2>
                  Đăng nhập
                </h2>
                {/* <form onSubmit={handleSubmit}>
                  <h4>email</h4>
                  <input type="text" name="email" value={username} onChange={e => {setUsername(e)}}></input><br/>
                  <h3>password</h3>
                  <input type="text" name="password" value={password} onChange={e => {setPassword(e)}}/> <br/><br/>
                  <input type= "submit"/>
                </form> */}
                {/* <div className="Login">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                      Đăng nhập
                    </Button>
                  </Form>
                  {err==nil ? render nothing : render <thông báo lỗi></thông>}
                </div> */}
              </div> 
            </div>
          </div>
        </div>
      </div>
    </header>
    </div>
  )
}
