import React, { useState } from "react";
import axios from "axios";

function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleErrorMessages = (field) => {
    if (field in errorMessages) return errorMessages[field];
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/contact-us/send`,
        body
      );
      "message" in res.data && alert(res.data.message);
      if ("errorMessages" in res.data) {
        setErrorMessages(res.data.errorMessages);
      } else {
        setErrorMessages({});
        setBody({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-details">
        <h1>Contact Us</h1>
        <hr />
        <p>
          To meet or sending quotations besides we thrive when coming up with
          innovative ideas also understand that a smart concept should should be
          supported with measurable results.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="contact-us-form">
        <div className="input-field name">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Your Name"
            value={body.name}
          />
          {handleErrorMessages("name") !== null && (
            <small>{handleErrorMessages("name")}</small>
          )}
        </div>
        <div className="input-field email">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Your Email"
            value={body.email}
          />
          {handleErrorMessages("email") !== null && (
            <small>{handleErrorMessages("email")}</small>
          )}
        </div>
        <div className="input-field message">
          <textarea
            name="message"
            rows="6"
            onChange={handleChange}
            placeholder="Your Message"
            value={body.message}
          ></textarea>
          {handleErrorMessages("message") !== null && (
            <small>{handleErrorMessages("message")}</small>
          )}
        </div>
        <button type="submit" disabled={loading}>
          Send your message
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
