import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./../context/AuthContext"
import { useHistory } from "react-router-dom"
//import home1 from "./../img/tsslogo.jpg"
//import "./Login.css"
import symb from "./Slice-2-3-e1602342563858.png"

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const history = useHistory()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/Home")
    } catch {
      setError("Failed to login")
    }
    setLoading(false)
  }

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <Card>
            <Card.Body>
              <img src={symb} width={90}></img>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Button disabled={loading} className="w-100" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Login

/*
<div className="image">
          <img src={home1} alt="login image" />
        </div>
*/

/*
import React from "react"
import { useForm } from "react-hook-form"
const Login = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" className="form-control" id="fullname" ref={register} name="fullname" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" ref={register} name="email id" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" className="form-control" id="phone" ref={register} name="phoneno" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" ref={register} name="password" />
        </div>
        <button type="submit" className="btn btn primary">
          SUbmit
        </button>
      </form>
    </div>
  )
}
export default Login
*/
