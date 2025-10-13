import React, { useState } from "react";

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
    <div>
      <h1>Event Request Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="eventName"
          type="text"
          placeholder="Event name"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EventRequestForm;
