// src/cards/EventArchive.jsx
import { Plus, Eye, Edit, Trash, Megaphone } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';

const EventArchive = () => (
  <WorkspaceCard title="Past Events" authorizedRoles={['Manager']}>
    <div className="workspace-card-actions">
      <ActionButton icon={Eye} label="View Past Events" />
      <ActionButton icon={Edit} label="Manage Past Events" />
    </div>
  </WorkspaceCard>
);

EventArchive.meta = {
  priority: 1,
};

export default EventArchive;
