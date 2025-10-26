import React, { useState } from "react";
import "./TableView.css";
import TableTooltip from "./TableTooltip";
import { Pen, Trash } from "lucide-react";
import ActionButton from "./ActionButton";

const formatValue = (value) => {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .slice(0, 3)
      .join(", ");
  }
  if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}T/)) {
    return new Date(value).toLocaleString();
  }
  return value.toString();
};

const flattenRecord = (record) => {
  const flat = {};
  for (const [key, val] of Object.entries(record)) {
    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
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
  const [tooltip, setTooltip] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    index: null,
  });

  const flattened = data.map(flattenRecord);
  const columns = flattened.length ? Object.keys(flattened[0]) : [];

  const handleRowClick = (event, index) => {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipPos = {
      x: rect.right + 8,
      y: rect.top + rect.height / 2,
    };

    // Toggle visibility if clicking the same row
    if (tooltip.visible && tooltip.index === index) {
      setTooltip((t) => ({ ...t, visible: false }));
    } else {
      setTooltip({
        visible: true,
        position: tooltipPos,
        index,
      });
    }
  };

  return (
    <div
      className="table-view"
      onClick={() => setTooltip((t) => ({ ...t, visible: false }))}
    >
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
            <tr
              key={index}
              className="table-row"
              onClick={(e) => handleRowClick(e, index)}
            >
              {columns.map((col) => (
                <td key={col}>{formatValue(record[col])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <TableTooltip
        visible={tooltip.visible}
        position={tooltip.position}
        onClose={() => setTooltip((t) => ({ ...t, visible: false }))}
        content={
          tooltip.index !== null && (
            <div className="tooltip-actions">
              <ActionButton
                icon={Pen}
                label="Edit"
                onClick={() => onEdit?.(flattened[tooltip.index]?.id)}
              />
              <ActionButton
                icon={Trash}
                label="Delete"
                onClick={() => onDelete?.(flattened[tooltip.index]?.id)}
              />            
            </div>
          )
        }
      />

    </div>
  );
};

export default TableView;
