import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/Firebase';

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log('Firebase', firebase);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate('/');
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Used to prevent page from reloading after onSubmit will be clicked
    console.log('Signing up a user...');
    const result = await firebase.signinUserWithEmailAndPassword(
      email,
      password
    );
    console.log('Successful');
  };

  console.log(firebase);

  return (
    <div className='container mt-5'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            placeholder='Enter email'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            placeholder='Password'
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Login
        </Button>
        <Button
          style={{ marginLeft: '5px' }}
          variant='danger'
          onClick={firebase.signinWithGoogle}
        >
          Signin with google
        </Button>{' '}
      </Form>
    </div>
  );
};

export default LoginPage;
