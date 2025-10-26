import React, { useState } from "react";
import "./TableView.css";

const formatValue = (value) => {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") {
    // For nested objects, show summarized info
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .slice(0, 3)
      .join(", ");
  }
  // Format ISO date strings
  if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}T/)) {
    return new Date(value).toLocaleString();
  }
  return value.toString();
};

const flattenRecord = (record) => {
  const flat = {};
  for (const [key, val] of Object.entries(record)) {
    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      // Flatten first-level nested object
      for (const [nestedKey, nestedVal] of Object.entries(val)) {
        flat[`${key}.${nestedKey}`] = nestedVal;
      }
    } else {
      flat[key] = val;
    }
  }
  return flat;
};

const TableView = ({ header, records, onEdit, onDelete }) => {
  const data = records?.data || records || [];
  const [activeRow, setActiveRow] = useState(null);

  const flattened = data.map(flattenRecord);
  const columns = flattened.length ? Object.keys(flattened[0]) : [];

  const handleRowClick = (index) => {
    setActiveRow(activeRow === index ? null : index);
  };

  return (
    <div className="table-view">
      {header && <h2 className="table-header">{header}</h2>}
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flattened.map((record, index) => (
            <React.Fragment key={index}>
              <tr
                className={`table-row ${
                  activeRow === index ? "active" : ""
                }`}
                onClick={() => handleRowClick(index)}
              >
                {columns.map((col) => (
                  <td key={col}>{formatValue(record[col])}</td>
                ))}
              </tr>

              {activeRow === index && (
                <tr className="table-crud-row">
                  <td colSpan={columns.length}>
                    <div className="crud-options">
                      <button
                        className="edit-btn"
                        onClick={() => onEdit && onEdit(data[index])}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete && onDelete(data[index])}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
