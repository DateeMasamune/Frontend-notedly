import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useApolloClient, gql } from "@apollo/client";

import Button from "../components/Button";

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`

const SignUp = props => {
  const [values,setValues] = useState()
  const client = useApolloClient()
  const [singUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      console.log(data.signUp)
      localStorage.setItem('token', data.signUp)
      client.writeData({ data: {isLoggedIn: true} }) //обновляем локальный кэш
      props.history.push('/')
    }
  })

  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    document.title = 'Sign up - Notedly';
  })

  return (
    <Wrapper>
      <h2>Sign Up</h2>
      <Form
        onSubmit={event => {
          event.preventDefault()
          console.log(values)
          singUp({
            variables: {
              ...values
            }
          })
        }}
      >
        <label htmlFor='username'>Username:</label>
        <input
          name="username"
          required
          type='text'
          id='username'
          placeholder='Username'
          onChange={onChange}
        />
        <label htmlFor='email'>Email:</label>
        <input
          name="email"
          required
          type='email'
          id='email'
          placeholder='Email'
          onChange={onChange}
        />
        <label htmlFor='password'>Password:</label>
        <input
          name="password"
          required
          type='text'
          id='password'
          placeholder='Password'
          onChange={onChange}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </Wrapper>
  )
}

export default SignUp