import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    avatar: null,
    address: '',
    age: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Age validation
    if (name === 'age' && value !== '' && parseInt(value) <= 18) {
      setErrors({ ...errors, age: 'Age must be greater than 18' });
    } else {
      setErrors({ ...errors, age: '' });
    }

    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success('Registration successful!');
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleNext = () => {
    if (step === 1) {
      const step1Fields = ['name', 'email', 'password', 'mobile'];
      const newErrors = {};
      step1Fields.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = 'This field is required';
        }
      });
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        setStep(2);
      }
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    },
    registerContainer: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '500px',
      margin: '120px 20px',
      
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '35px',
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
    error: {
      color: 'red',
      fontSize: '14px',
      marginTop: '5px',
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
      marginTop: '10px',
    },
    buttonSecondary: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      marginTop: '10px',
    },
    '@media (max-width: 768px)': {
      registerContainer: {
        padding: '20px',
      },
      title: {
        fontSize: '28px',
      },
      button: {
        fontSize: '16px',
      },
      buttonSecondary: {
        fontSize: '16px',
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.registerContainer}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              {['name', 'email', 'password', 'mobile'].map((field) => (
                <div className="form-group" style={styles.formGroup} key={field}>
                  <label htmlFor={field} style={styles.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  {errors[field] && <p style={styles.error}>{errors[field]}</p>}
                </div>
              ))}
              <button type="button" style={styles.button} onClick={handleNext}>
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              {['address', 'age'].map((field) => (
                <div className="form-group" style={styles.formGroup} key={field}>
                  <label htmlFor={field} style={styles.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'age' ? 'number' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  {field === 'age' && errors.age && <p style={styles.error}>{errors.age}</p>}
                </div>
              ))}
              <div className="form-group" style={styles.formGroup}>
                <label htmlFor="avatar" style={styles.label}>Avatar</label>
                <input
                  type="file"
                  className="form-control"
                  id="avatar"
                  name="avatar"
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.avatar && <p style={styles.error}>{errors.avatar}</p>}
              </div>
              <div className="form-group" style={styles.formGroup}>
                <label htmlFor="role" style={styles.label}>Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select a role</option>
                  <option value="I want to rent a car">I want to rent a car</option>
                  <option value="Register Own car for rent">Register Own car for rent</option>
                </select>
                {errors.role && <p style={styles.error}>{errors.role}</p>}
              </div>
              <button type="button" style={styles.buttonSecondary} onClick={handleBack}>
                Back
              </button>
              <button type="submit" style={styles.button}>
                Register
              </button>
            </>
          )}
        </form>
      </div>
      <ToastContainer />
     
    </div>
  );
};

export default Register;
