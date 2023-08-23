import React, { useState } from 'react'
import Input from './Input';
import { Link } from 'react-router-dom';
import { handleLogin, handleRegister } from '../../services/AuthService';

const Form = ({ header, buttonText }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Donor");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [hospital, setHospital] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <form className='me-5' onSubmit={(e) => {
      e.preventDefault();
      if (header === "Login Page") {
        return handleLogin(e, email, password, role);
      }
      else return handleRegister(e, name, role, email, password, organisation, hospital, website, address, phone);
    }}>
      <h1>{header}</h1><hr></hr>
      <div className='d-flex mb-3'>
        <div className='form-check ms-2'>
          <input type='radio' name='role' value='Donor' className='form-check-input' onChange={(e) => setRole(e.target.value)} defaultChecked id='donarRadio' />
          <label htmlFor='donarRadio' className='form-check-label'>Donar</label>
        </div>
        <div className='form-check ms-2'>
          <input type='radio' name='role' value="Admin" className='form-check-input' onChange={(e) => setRole(e.target.value)} id='adminRadio' />
          <label htmlFor='adminRadio' className='form-check-label'>Admin</label>
        </div>
        <div className='form-check ms-2'>
          <input type='radio' name='role' value='Organisation' className='form-check-input' onChange={(e) => setRole(e.target.value)} id='organisationRadio' />
          <label htmlFor='organisationRadio' className='form-check-label'>Organisation</label>
        </div>
        <div className='form-check ms-2'>
          <input type='radio' name='role' value='Hospital' className='form-check-input' onChange={(e) => setRole(e.target.value)} id='hospitalRadio' />
          <label htmlFor='hospitalRadio' className='form-check-label'>Hospital</label>
        </div>
      </div>
      {(() => {
        switch (true) {
          case header === "Login Page": {
            return (
              <>
                <Input
                  type="email"
                  labelName="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  labelName="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )
          }
          case header === "Register Page": {
            return (
              <>
                {
                  (role === "Admin" || role === "Donor") &&
                  <Input
                    type="text"
                    labelName="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                }
                {
                  role === "Organisation" &&
                  <Input
                    type="text"
                    labelName="Organisation Name"
                    name="organisation"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                  />
                }
                {
                  role === "Hospital" &&
                  <Input
                    type="text"
                    labelName="Hospital Name"
                    name="hospital"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                  />
                }
                <Input
                  type="text"
                  labelName="Website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <Input
                  type="text"
                  labelName="Address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Input
                  type="text"
                  labelName="Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  type="email"
                  labelName="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  labelName="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )
          }
        }
      })()}
      <button type="submit" className="btn btn-primary mb-2">{buttonText}</button>
      {
        header === "Login Page" ?
          <p>
            Not a User ? <Link to='/register'>Register</Link>
          </p> :
          <p>
            Already a User ? <Link to='/login'>Login</Link>
          </p>
      }
    </form>
  )
}

export default Form;