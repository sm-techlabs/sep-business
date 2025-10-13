// src/cards/Teams.jsx
import { Plus, Eye, Edit, Trash, Megaphone } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';

const Teams = () => (
  <WorkspaceCard title="Teams" authorizedRoles={['Manager']}>
    <div className="workspace-card-actions">
      <ActionButton icon={Eye} label="View Teams" />
      <ActionButton icon={Edit} label="Manage Teams" />
    </div>
  </WorkspaceCard>
);

Teams.meta = {
  priority: 1,
};

export default Teams;
