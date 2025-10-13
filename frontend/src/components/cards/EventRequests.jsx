// src/cards/NewEventRequest.jsx
import { UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import RegisteredEventRequestForm from '../forms/RegisteredEventRequestForm';
import NonRegisteredEventRequestForm from '../forms/NonRegisteredEventRequestForm';
import { useModalContext } from '../../utils/ModalContext';

const NewEventRequest = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="New Event Requests" authorizedRoles={['Staff', 'Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={UserCheck}
          label="For Registered Clients"
          onClick={() => openModalWithContent(<RegisteredEventRequestForm />)}
        />
        <ActionButton
          icon={UserPlus}
          label="For New Clients"
          onClick={() => openModalWithContent(<NonRegisteredEventRequestForm />)}
        />
      </div>

    </WorkspaceCard>
  );
};

NewEventRequest.meta = {
  priority: 1,
};

export default NewEventRequest;
