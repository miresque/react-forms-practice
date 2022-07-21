import { useState } from "react";
import "./App.css";

export default function App() {

  const initFormState = {
    name: '',
    address: '',
    phone: '',
    email: '',
    complaint: '',
    contact: '',
    consent: false
  }

  const [form, setForm] = useState(initFormState)

  const handleUserData = (event) => {
    const inputType = event.target.type
    const inputName = event.target.name
    const inputValue = event.target.value

    let newUserData = {...form, [inputName]: inputValue}
    if (inputType === 'checkbox' && inputName === 'consent') {
      newUserData = {...form, [inputName]: event.target.checked}
    }
    setForm(newUserData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const URL = "./some database somewhere"

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    setForm(initFormState)
    console.log('submitted!... hopefully')
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Complaining form!</h2>
        <div className="form__section-left">
          <label>
            Full name
            <input 
              onChange={handleUserData}
              type="text" 
              name="name" 
              value={form.name} 
              required 
            />
          </label>
          <label>
            Address
            <input 
              onChange={handleUserData}
              type="text" 
              name="address" 
              value={form.address} 
            />
          </label>
          <label>
            Phone Number
            <input 
              onChange={handleUserData}
              type="tel" 
              name="phone" 
              value={form.phone} 
            />
          </label>

          <label>
            Email
            <input 
              onChange={handleUserData}
              type="email" 
              name="email"
              value={form.email} 
            />
          </label>
        </div>

        <div className="form__section-right">
          <label>
            Write your complaint
            <textarea
              onChange={handleUserData}
              name="complaint"
              rows="10"
              placeholder="You can complain here"
              value={form.complaint}
            ></textarea>
          </label>

          <div className="form__radio-group">
            <p>How do you want to be contacted? </p>
            <label>
              <input 
                type="radio" 
                name="contact" 
                value="phone" 
                onChange={handleUserData}
                checked={form.contact === 'phone'}
              />
              Phone
            </label>

            <label>
              <input 
              type="radio" 
              name="contact" 
              value="email" 
              onChange={handleUserData}
              checked={form.contact === 'email'} 
              />
              Email
            </label>

            <label>
              <input 
                type="radio" 
                name="contact" 
                value="post"  
                onChange={handleUserData}
                checked={form.contact === 'post'}
                />
              Slow Mail
            </label>

            <label>
              <input 
                type="radio" 
                name="contact" 
                value="none" 
                onChange={handleUserData}
                checked={form.contact === 'none'}
                />
              No contact!
            </label>
          </div>

          <label>
            I agree you take my data, and do whatever
            <input 
              type="checkbox" 
              name="consent" 
              id="consent"
              onChange={handleUserData}
              checked={form.consent}
              />
          </label>
        </div>
        <input 
          type="submit" 
          value="Submit!" 
          />
      </form>
    </>
  );
}
