import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DynamicForm.css";
import PopupNotification from "./PopupNotification";
import Dropdown from "./Dropdown";

const DynamicForm = ({ title, onSubmit, fields, initialValues = {} }) => {
  // Build initial state to match Zod expectations
  const initialState = fields.reduce((acc, f) => {
    // Determine base value depending on field type
    let baseValue;

    if (f.type === "checkbox-group") {
      baseValue = f.options.reduce((optAcc, opt) => {
        optAcc[opt.name] = false;
        return optAcc;
      }, {});
    } else if (f.type === "date") {
      baseValue = new Date();
    } else {
      baseValue = "";
    }

    // If initialValues provides a value, override it
    if (initialValues.hasOwnProperty(f.name)) {
      if (f.type === "checkbox-group" && typeof initialValues[f.name] === "object") {
        // Merge provided checkbox values
        acc[f.name] = { ...baseValue, ...initialValues[f.name] };
      } else if (f.type === "date") {
        // Support both Date objects and ISO strings
        const providedValue = initialValues[f.name];
        acc[f.name] =
          providedValue instanceof Date
            ? providedValue
            : new Date(providedValue);
      } else {
        acc[f.name] = initialValues[f.name];
      }
    } else {
      acc[f.name] = baseValue;
    }

    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [notification, setNotification] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  const handleChange = (e, field, optionName) => {
    const { name, value, checked, type } = e.target;

    if (field.type === "checkbox-group") {
      setFormData((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          [optionName]: checked,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        field.type === "dropdown" && !isNaN(value)
          ? Number(value)
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleDateChange = (date, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await onSubmit(formData);
      setNotification({
        visible: true,
        type: "success",
        message: response?.message || "Submission successful!",
      });
      setFormData(initialState);
    } catch (err) {
      debugger
      const error = err?.response?.data?.error;
      const issues = error?.details?.issues;

      const message = Array.isArray(issues)
        ? issues.map((i) => i.message).join("; ")
        : error || "Submission failed.";

      setNotification({
        visible: true,
        type: "error",
        message,
      });
    }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h2 className="modal-form__title">{title}</h2>

      {fields.map((field) => (
        <div className="modal-form__group" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>

          {field.type === "checkbox-group" ? (
            <div className="modal-form__preferences">
              {field.options.map((opt) => (
                <label key={opt.name}>
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={formData[field.name][opt.name]}
                    onChange={(e) => handleChange(e, field, opt.name)}
                  />
                  {opt.description}
                </label>
              ))}
            </div>
          ) : field.type === "date" ? (
            <DatePicker
              id={field.name}
              selected={formData[field.name]}
              onChange={(date) => handleDateChange(date, field.name)}
              dateFormat="yyyy-MM-dd"
              className="modal-form__input"
              calendarClassName="dark-datepicker"
            />
          ) : field.type === "dropdown" ? (
            <Dropdown
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={(e) => handleChange(e, field)}
              options={field.options || []}
              placeholder={field.placeholder || `Select ${field.label}`}
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              value={formData[field.name]}
              onChange={(e) => handleChange(e, field)}
              className="modal-form__input"
              placeholder={field.placeholder || ""}
            />
          )}
        </div>
      ))}

      <PopupNotification
        type={notification.type}
        message={notification.message}
        visible={notification.visible}
        onClose={() =>
          setNotification((prev) => ({ ...prev, visible: false }))
        }
      />

      <button type="submit" className="modal-form__button">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
