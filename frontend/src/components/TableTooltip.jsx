import { useEffect, useState } from "react";
import "./TableTooltip.css";

export default function TableTooltip({ visible, position, content, onClose }) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (visible && position) {
      const tooltipWidth = 200; // approximate width, can adjust
      const tooltipHeight = 40; // approximate height

      let left = position.x;
      let top = position.y;

      // Keep tooltip inside viewport
      const padding = 10;
      if (left + tooltipWidth > window.innerWidth - padding) {
        left = window.innerWidth - tooltipWidth - padding;
      }
      if (top + tooltipHeight > window.innerHeight - padding) {
        top = window.innerHeight - tooltipHeight - padding;
      }

      setStyle({
        left,
        top,
      });
    }
  }, [visible, position]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (visible) onClose?.();
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="table-tooltip  arrow-left" style={style}>
      <div className="tooltip-content">{content}</div>
      <div className="tooltip-arrow" />
    </div>
  );
}
