import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [gender, setGender] = useState('');
  const [skills, setSkills] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [registrationList, setRegistrationList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const handleImageLinkChange = (e) => {
    setImageLink(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSkillsChange = (e) => {
    const skill = e.target.value;
    if (e.target.checked) {
      setSkills([...skills, skill]);
    } else {
      setSkills(skills.filter((s) => s !== skill));
    }
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing && editIndex !== null) {
      // Edit the existing registration data
      const updatedRegistrationData = {
        firstName,
        lastName,
        email,
        website,
        imageLink,
        gender,
        skills,
        dateOfBirth,
      };

      const updatedList = [...registrationList];
      updatedList[editIndex] = updatedRegistrationData;
      setRegistrationList(updatedList);

      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new registration data
      const newRegistrationData = {
        firstName,
        lastName,
        email,
        website,
        imageLink,
        gender,
        skills,
        dateOfBirth,
      };

      setRegistrationList([...registrationList, newRegistrationData]);
    }

    // Clear form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setWebsite('');
    setImageLink('');
    setGender('');
    setSkills([]);
    setDateOfBirth('');
  };

  const handleEdit = (index) => {
    const registrationData = registrationList[index];

    // Set the form fields with the selected registration data
    setFirstName(registrationData.firstName);
    setLastName(registrationData.lastName);
    setEmail(registrationData.email);
    setWebsite(registrationData.website);
    setImageLink(registrationData.imageLink);
    setGender(registrationData.gender);
    setSkills(registrationData.skills);
    setDateOfBirth(registrationData.dateOfBirth);

    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = [...registrationList];
    updatedList.splice(index, 1);
    setRegistrationList(updatedList);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditIndex(null);

    // Clear form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setWebsite('');
    setImageLink('');
    setGender('');
    setSkills([]);
    setDateOfBirth('');
  };

  return (
    <div className="registration-form-container">
      <h1 className="form-title">{isEditing ? 'Edit Registration' : 'Student Registration Form'}</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="firstName">First Name:</label>
          <input className="input" type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} required />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="lastName">Last Name:</label>
          <input className="input" type="text" id="lastName" value={lastName} onChange={handleLastNameChange} required />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="email">Email:</label>
          <input className="input" type="email" id="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="website">Website:</label>
          <input className="input" type="text" id="website" value={website} onChange={handleWebsiteChange} required />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="imageLink">Image Link:</label>
          <input className="input" type="text" id="imageLink" value={imageLink} onChange={handleImageLinkChange} required />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="gender">Gender:</label>
          <select className="select" id="gender" value={gender} onChange={handleGenderChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="dateOfBirth">Date of Birth:</label>
          <input className="input" type="date" id="dateOfBirth" value={dateOfBirth} onChange={handleDateOfBirthChange} required />
        </div>
        <div className="form-group">
          <label className="label">Skills:</label>
          <div>
            <input className="checkbox" type="checkbox" id="skill1" value="HTML" checked={skills.includes('HTML')} onChange={handleSkillsChange} />
            <label className="checkbox-label" htmlFor="skill1">HTML</label>
          </div>
          <div>
            <input className="checkbox" type="checkbox" id="skill2" value="CSS" checked={skills.includes('CSS')} onChange={handleSkillsChange} />
            <label className="checkbox-label" htmlFor="skill2">CSS</label>
          </div>
          <div>
            <input className="checkbox" type="checkbox" id="skill3" value="JavaScript" checked={skills.includes('JavaScript')} onChange={handleSkillsChange} />
            <label className="checkbox-label" htmlFor="skill3">JavaScript</label>
          </div>
        </div>
        <div className="form-buttons">
          <button className="submit-button" type="submit">{isEditing ? 'Save Changes' : 'Submit'}</button>
          {isEditing && <button className="submit-button" type="button" onClick={handleCancelEdit}>Cancel Edit</button>}
        </div>
      </form>

      <div className="registration-list-container">
        <h2 className="list-title">Registration List:</h2>
        {registrationList.length === 0 ? (
          <p>No registrations yet.</p>
        ) : (
          <ul className="registration-list">
            {registrationList.map((registration, index) => (
              <li key={index} className="registration-item">
                <div>
                  <strong>Name:</strong> {registration.firstName} {registration.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {registration.email}
                </div>
                <div>
                  <strong>Website:</strong> <a className="website-link" href={registration.website} target="_blank" rel="noopener noreferrer">{registration.website}</a>
                </div>
                <div>
                  <strong>Gender:</strong> {registration.gender}
                </div>
                <div>
                  <strong>Date of Birth:</strong> {registration.dateOfBirth}
                </div>
                <div>
                  <strong>Skills:</strong> {registration.skills.join(', ')}
                </div>
                <div className="registration-image-container">
                  <img src={registration.imageLink} alt="Passport" className="pass" />
                </div>
                <div className="registration-actions">
                  <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
