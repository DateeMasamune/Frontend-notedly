import React, { useState, useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = props => {
  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      console.log(data.signUp);
      localStorage.setItem('token', data.signUp);
      client.writeData({ data: { isLoggedIn: true } }); //обновляем локальный кэш
      props.history.push('/');
    }
  });

  useEffect(() => {
    document.title = 'Sign up - Notedly';
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} fromType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};

export default SignUp;
