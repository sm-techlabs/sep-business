import React, { useState } from "react";
import "./form.css";

const EventRequestForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="modal-form-container">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h1 className="modal-form__title">Event Request Form</h1>
        <input
          className="modal-form__input"
          name="eventName"
          type="text"
          placeholder="Event name"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
        <input
          className="modal-form__input"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          className="modal-form__input"
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          className="modal-form__textarea"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
        <button className="modal-form__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventRequestForm;
