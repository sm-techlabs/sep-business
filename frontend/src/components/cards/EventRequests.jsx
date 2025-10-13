// src/cards/NewEventRequest.jsx
import { UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import EventRequestForm from '../forms/EventRequestForm';
import { useModalContext } from '../../utils/ModalContext';

const NewEventRequest = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="New Event Requests" authorizedRoles={['Staff', 'Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={UserCheck}
          label="For Registered Clients"
          onClick={() => openModalWithContent(<EventRequestForm />)}
        />
        <ActionButton
          icon={UserPlus}
          label="For New Clients"
          onClick={() => openModalWithContent(<EventRequestForm />)}
        />
      </div>

    </WorkspaceCard>
  );
};

NewEventRequest.meta = {
  priority: 1,
};

export default NewEventRequest;
