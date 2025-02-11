import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { passwordReset } from '../actions/userActions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const { loading, error, message } = userPasswordReset;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordReset(email));
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send password reset email'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {message && <div style={{ color: 'green' }}>{message}</div>}
      </form>
      <p>
        <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;