// src/cards/NewEventRequest.jsx
import { Eye, MessageCirclePlus, Pen, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import CreateRegisteredEventRequestForm from '../forms/CreateRegisteredEventRequestForm';
import CreateNonRegisteredEventRequestForm from '../forms/CreateNonRegisteredEventRequestForm';
import { useModalContext } from '../../utils/ModalContext';
import EditEventRequestForm from '../forms/EditEventRequestForm';

const NewEventRequestCS = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="New Event Requests" authorizedRoles={['Staff']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={UserCheck}
          label="For Registered Clients"
          onClick={() => openModalWithContent(<CreateRegisteredEventRequestForm />)}
        />
        <ActionButton
          icon={UserPlus}
          label="For New Clients"
          onClick={() => openModalWithContent(<CreateNonRegisteredEventRequestForm />)}
        />
        <ActionButton
          icon={Pen}
          label="Edit Event Request"
          onClick={() => openModalWithContent(<EditEventRequestForm />)}
        />
      </div>

    </WorkspaceCard>
  );
};

NewEventRequestCS.meta = {
  priority: 1,
};

export default NewEventRequestCS;
