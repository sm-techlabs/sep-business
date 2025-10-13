// src/components/WorkspaceCard.jsx
import React from 'react';
import { useAppContext } from '../utils/AppContext';
import './WorkspaceCard.css';

const WorkspaceCard = ({ title, authorizedRoles, children }) => {
  const { user } = useAppContext();

  // 🚫 Hide entire card if not authorized
  if (!authorizedRoles.includes(user?.jobTitle)) return null;

  return (
    <div className="workspace-card">
      <div className="workspace-card-header">
        <h2 className="workspace-card-title">{title}</h2>
      </div>
      <div className="workspace-card-body">
        {children}
      </div>
    </div>
  );
};

export default WorkspaceCard;
