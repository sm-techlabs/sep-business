// src/cards/HR.jsx
import { Plus, Eye, Edit, Trash, Megaphone } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';

const HR = () => (
  <WorkspaceCard title="HR" authorizedRoles={['Manager']}>
    <div className="workspace-card-actions">
      <ActionButton icon={Megaphone} label="Create Job Advertisement" />
      <ActionButton icon={Edit} label="Edit Task" />
    </div>
  </WorkspaceCard>
);

HR.meta = {
  priority: 1,
};

export default HR;
