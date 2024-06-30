import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { FaUserCircle } from 'react-icons/fa';
import './Profile.css';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    age: '',
    role: '',
    avatar: null,
    avatarPreview: '',
    scale: 1,
    isEditing: false,
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files[0]) {
      this.setState({ avatar: files[0], isEditing: true });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleScaleChange = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  handleSave = () => {
    if (this.editor) {
      const canvas = this.editor.getImage();
      const avatarPreview = canvas.toDataURL();
      this.setState({ avatarPreview, isEditing: false });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform form submission logic, e.g., make API calls
    console.log(this.state);
    // Reset form fields or show success message
  };

  setEditorRef = (editor) => (this.editor = editor);

  render() {
    const { name, email, mobile, address, age, role, avatar, scale, isEditing, avatarPreview } = this.state;

    return (
      <div className="profile-form">
        <h2>Profile Update Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group avatar-group">
            {isEditing ? (
              <div>
                <AvatarEditor
                  ref={this.setEditorRef}
                  image={avatar}
                  width={100}
                  height={100}
                  border={50}
                  borderRadius={50}
                  scale={scale}
                />
                <div className="editor-controls">
                  <label>
                    Zoom:
                    <input
                      name="scale"
                      type="range"
                      onChange={this.handleScaleChange}
                      min="1"
                      max="2"
                      step="0.01"
                      defaultValue="1"
                    />
                  </label>
                  <button type="button" onClick={this.handleSave}>
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <label htmlFor="avatar" className="avatar-label">
                <div className="avatar-placeholder">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="profile-avatar" />
                  ) : (
                    <FaUserCircle size={100} color="#ccc" />
                  )}
                </div>
              </label>
            )}
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={this.handleChange}
              style={{ display: 'none' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={this.handleChange}
            >
              <option value="">Select a role</option>
              <option value="I want to rent a car">I want to rent a car</option>
              <option value="Register Own car for rent">Register Own car for rent</option>
            </select>
          </div>
          <div className="button-group">
            <button type="submit">Update Profile</button>
          </div>
        </form>
      </div>
    );
  }
}
