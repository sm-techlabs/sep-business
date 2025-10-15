// src/cards/NewEventRequest.jsx
import { Plus, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import ResourceRequestForm from '../forms/ResourceRequestForm';
import { useModalContext } from '../../utils/ModalContext';

const NewResourceRequest = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Resource Requests" authorizedRoles={['Staff', 'Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={Plus}
          label="New Resource Request"
          onClick={() => openModalWithContent(<ResourceRequestForm />)}
        />
      </div>

    </WorkspaceCard>
  );
};

NewResourceRequest.meta = {
  priority: 1,
};

export default NewResourceRequest;
