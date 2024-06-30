import React, { useState } from 'react';
import './ForgetPassword.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add logic to handle password reset
    console.log('Password reset link sent to:', email);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    },
    loginContainer: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '400px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '24px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontSize: '16px',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
    },
    forgotPasswordLink: {
      display: 'block',
      marginTop: '10px',
      textAlign: 'center',
      color: '#007bff',
      textDecoration: 'none',
      fontSize: '15px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginContainer}>
        <h2 style={styles.title}>Forget Password</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Send Password Reset Link</button>
        </form>
        <a href="/login" style={styles.forgotPasswordLink}>Back to Login</a>
      </div>
    </div>
  );
};

export default ForgetPassword;
