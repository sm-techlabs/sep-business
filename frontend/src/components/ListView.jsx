import React, { useState } from "react";
import "./listview.css";

const ListView = ({ data, title, onEdit, onDelete }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  if (!Array.isArray(data)) {
    console.error("ListView expected an array but got:", data);
    return <div className="listview-empty">Invalid data format.</div>;
  }

  if (data.length === 0) {
    return <div className="listview-empty">No records found.</div>;
  }

  const columns = Array.from(
    data.reduce((cols, item) => {
      Object.keys(item).forEach((key) => cols.add(key));
      return cols;
    }, new Set())
  );

  const renderCell = (value) => {
    if (value === null || value === undefined) return "-";

    if (typeof value === "object") {
      return (
        <div className="listview-nested">
          {Object.entries(value).map(([k, v]) => (
            <div key={k}>
              <strong>{k}:</strong> {String(v)}
            </div>
          ))}
        </div>
      );
    }

    return String(value);
  };

  return (
    <div className="listview-container">
      {title && (
        <div className="listview-header">
          <h2>{title}</h2>
        </div>
      )}

      <table className="listview-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onMouseEnter={() => setHoveredRow(idx)}
              onMouseLeave={() => setHoveredRow(null)}
              className="listview-row"
            >
              {columns.map((col) => (
                <td key={col}>{renderCell(row[col])}</td>
              ))}

              {/* Tooltip overlay */}
              {hoveredRow === idx && (onEdit || onDelete) && (
                <div className="listview-tooltip">
                  {onEdit && (
                    <button
                      className="tooltip-btn edit"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="tooltip-btn delete"
                      onClick={() => onDelete(row)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
