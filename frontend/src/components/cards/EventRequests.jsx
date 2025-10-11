// src/cards/NewEventRequest.jsx
import { Plus, Eye, Edit, Trash, FormInput, FormInputIcon, FilePlus2, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';

const NewEventRequest = () => (
  <WorkspaceCard title="New Event Requests" authorizedRoles={['Staff', 'Manager']}>
    <div className="workspace-card-actions">
      <ActionButton icon={UserCheck} label="For Registered Clients" />
      <ActionButton icon={UserPlus} label="For New Clients" />
    </div>    
  </WorkspaceCard>
);

NewEventRequest.meta = {
  priority: 1,
};

export default NewEventRequest;
