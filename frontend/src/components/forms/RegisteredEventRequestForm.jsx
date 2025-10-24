import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./modal-form.css";
import "./datepicker-dark.css";
import formClient from "../../clients/formClient";

const initialFormState = {
  eventType: "",
  startsOn: new Date(),
  endsOn: new Date(),
  estimatedBudget: 0,
  expectedNumberOfAttendees: 0,
  recordNumber: 0,
  preferences: {
    decorations: false,
    parties: false,
    photosOrFilming: false,
    breakfastLunchDinner: false,
    softHotDrinks: false,
  },
};

const PopupNotification = ({ type, message }) => {
  return <div className={`popup-notification ${type}`}>{message}</div>;
};

const RegisteredEventRequestForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [popup, setPopup] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;

    if (Object.prototype.hasOwnProperty.call(formData.preferences, name)) {
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: type === "checkbox" ? checked : parsedValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : parsedValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await formClient.submitEventRequestForRegistered(formData);

      const message =
        response?.data?.message ||
        response?.message ||
        "Event request submitted successfully!";

      setPopup({
        visible: true,
        type: "success",
        message,
      });

      setTimeout(() => {
        setPopup((prev) => ({ ...prev, visible: false }));
        setFormData(initialFormState);
      }, 1500);
    } catch (err) {
      console.error("Submission failed:", err);

      let message = "Something went wrong while submitting.";

      if (err?.response?.data?.error) {
        const errorData = err.response.data.error;

        if (typeof errorData === "string") {
          message = errorData;
        } else if (errorData.details?.issues?.length) {
          const issues = errorData.details.issues.map(
            (issue) => `• ${issue.path}: ${issue.message}`
          );
          message = issues.join("\n");
        } else if (errorData.details?.message) {
          message = errorData.details.message;
        }
      } else if (err?.message) {
        message = err.message;
      }

      setPopup({
        visible: true,
        type: "error",
        message,
      });
    }
  };

  return (
    <div className="modal-form-container">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h1 className="modal-form__title">
          New Event Request - Registered Client
        </h1>

        <div className="modal-form__group">
          <label htmlFor="eventType">Event Type</label>
          <input
            id="eventType"
            className="modal-form__input"
            name="eventType"
            type="text"
            value={formData.eventType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="modal-form__group">
          <label>Starts On</label>
          <DatePicker
            selected={formData.startsOn}
            onChange={(date) => setFormData((prev) => ({ ...prev, startsOn: date }))}
            className="modal-form__input"
            calendarClassName="dark-datepicker"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="modal-form__group">
          <label>Ends On</label>
          <DatePicker
            selected={formData.endsOn}
            onChange={(date) => setFormData((prev) => ({ ...prev, endsOn: date }))}
            className="modal-form__input"
            calendarClassName="dark-datepicker"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="modal-form__group">
          <label htmlFor="estimatedBudget">Estimated Budget</label>
          <input
            id="estimatedBudget"
            className="modal-form__input"
            name="estimatedBudget"
            type="number"
            value={formData.estimatedBudget}
            onChange={handleChange}
            required
          />
        </div>

        <div className="modal-form__group">
          <label htmlFor="expectedNumberOfAttendees">Expected Attendees</label>
          <input
            id="expectedNumberOfAttendees"
            className="modal-form__input"
            name="expectedNumberOfAttendees"
            type="number"
            value={formData.expectedNumberOfAttendees}
            onChange={handleChange}
          />
        </div>

        <div className="modal-form__group">
          <label htmlFor="recordNumber">Client Record Number</label>
          <input
            id="recordNumber"
            className="modal-form__input"
            name="recordNumber"
            type="number"
            value={formData.recordNumber}
            onChange={handleChange}
          />
        </div>

        <fieldset className="modal-form__preferences">
          <legend>Preferences</legend>
          {Object.entries(formData.preferences).map(([key, value]) => (
            <label key={key}>
              <input
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleChange}
              />
              {formatPreferenceLabel(key)}
            </label>
          ))}
        </fieldset>

        <button className="modal-form__button" type="submit">
          Submit
        </button>

        {popup.visible && (
          <PopupNotification type={popup.type} message={popup.message} />
        )}
      </form>
    </div>
  );
};

function formatPreferenceLabel(key) {
  const map = {
    decorations: "Decorations",
    parties: "Parties",
    photosOrFilming: "Photos or Filming",
    breakfastLunchDinner: "Breakfast, Lunch or Dinner",
    softHotDrinks: "Soft or Hot Drinks",
  };
  return map[key] || key;
}

export default RegisteredEventRequestForm;
