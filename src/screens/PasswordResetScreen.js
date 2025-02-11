import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../actions/userActions';

const PasswordResetScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { uidb64, token } = useParams();

  useEffect(() => {
    console.log('PasswordResetScreen mounted');
    console.log('uidb64:', uidb64);
    console.log('token:', token);
  }, [uidb64, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await resetPassword(uidb64, token, newPassword);
      setMessage(response.message);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  if (!uidb64 || !token) {
    return <div>Error: Missing reset parameters</div>;
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '20px' }}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="newPassword" style={{ display: 'block', marginBottom: '5px' }}>New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Reset Password
        </button>
      </form>
      {message && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px' }}>
          {message}
        </div>
      )}
      {error && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default PasswordResetScreen;