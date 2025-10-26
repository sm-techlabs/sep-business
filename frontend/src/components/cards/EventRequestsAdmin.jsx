// src/cards/NewEventRequest.jsx
import { Eye, Pen, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import RegisteredEventRequestForm from '../forms/RegisteredEventRequestForm';
import NonRegisteredEventRequestForm from '../forms/NonRegisteredEventRequestForm';
import { useModalContext } from '../../utils/ModalContext';
import EditEventRequestForm from '../forms/EditEventRequestForm';
import EventRequestList from '../lists/EventRequestList';

const EventRequestAdmin = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="New Event Requests" authorizedRoles={[
      'Senior Customer Service Officer',
      'Manager',
      ]}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={UserCheck}
          label="For Registered Clients"
          onClick={() => openModalWithContent(<RegisteredEventRequestForm />)}
        />
        <ActionButton
          icon={Pen}
          label="Edit Event Request"
          onClick={() => openModalWithContent(<EditEventRequestForm />)}
        />
        <ActionButton
          icon={Eye}
          label="View Event Requests"
          onClick={() => openModalWithContent(<EventRequestList />)}
        />
      </div>

    </WorkspaceCard>
  );
};

EventRequestAdmin.meta = {
  priority: 1,
};

export default EventRequestAdmin;
