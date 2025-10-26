// src/cards/NewEventRequest.jsx
import { Eye, Pen, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import RegisteredEventRequestForm from '../forms/RegisteredEventRequestForm';
import EditEventRequestForm from '../forms/EditEventRequestForm';
import EventRequestTable from '../lists/EventRequestTable';

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
          onClick={() => openModalWithContent(<EventRequestTable />)}
        />
      </div>

    </WorkspaceCard>
  );
};

EventRequestAdmin.meta = {
  priority: 1,
};

export default EventRequestAdmin;
